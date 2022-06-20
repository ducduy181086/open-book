using System;
using System.Globalization;
using System.IO;
using System.Net;
using System.Text;
using System.Threading.Tasks;

using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.Features;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ModelBinding;
using Microsoft.AspNetCore.StaticFiles;
using Microsoft.AspNetCore.WebUtilities;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Net.Http.Headers;

using quiz_app.Attributes;
using quiz_app.Handlers;
using quiz_app.StorageProviders;

namespace quiz_app.Controllers
{
    //[Authorize]
    [ApiController]
    [Route("[controller]/[action]")]
    public class FilesController : ControllerBase
    {
        private readonly IStorageProvider storageProvider;

        public FilesController(IFileStorageProvider fileStorageProvider)
        {
            storageProvider = fileStorageProvider;
        }

        [HttpPost("{type?}")]
        [DisableFormValueModelBinding]
        public async Task<IActionResult> Upload(string type = "")
        {
            IUploadFileHandler handler = GetHandler(type);
            if (handler == null)
            {
                return BadRequest(new { ErrorCode = 4 });
            }

            if (!MultipartRequestHelper.IsMultipartContentType(Request.ContentType))
            {
                return BadRequest(new { ErrorCode = 1 });
            }

            // Accumulate the form data key-value pairs in the request (formAccumulator).
            KeyValueAccumulator formAccumulator = new();
            string trustedFileNameForDisplay = string.Empty;
            FormOptions defaultFormOptions = (HttpContext as DefaultHttpContext)?.FormOptions ?? new();
            string boundary = MultipartRequestHelper.GetBoundary(MediaTypeHeaderValue.Parse(Request.ContentType), defaultFormOptions.MultipartBoundaryLengthLimit);
            MultipartReader reader = new(boundary, HttpContext.Request.Body);

            MultipartSection section = await reader.ReadNextSectionAsync();
            while (section != null)
            {
                var hasContentDispositionHeader = ContentDispositionHeaderValue.TryParse(section.ContentDisposition, out var contentDisposition);
                if (hasContentDispositionHeader)
                {
                    if (contentDisposition.HasFileContentDisposition())
                    {
                        string untrustedFileNameForStorage = contentDisposition.FileName.Value;

                        // Don't trust the file name sent by the client. To display
                        // the file name, HTML-encode the value.
                        trustedFileNameForDisplay = WebUtility.HtmlEncode(untrustedFileNameForStorage);

                        await handler.SaveFileAsync(trustedFileNameForDisplay, section.Body, HttpContext.RequestAborted);
                    }
                    else if (contentDisposition.HasFormDataContentDisposition())
                    {
                        // Don't limit the key name length because the 
                        // multipart headers length limit is already in effect.
                        string key = HeaderUtilities.RemoveQuotes(contentDisposition.Name).Value;
                        Encoding encoding = section.GetEncoding();

                        if (encoding == null)
                        {
                            return BadRequest(new { ErrorCode = 2 });
                        }

                        using StreamReader streamReader = new(section.Body,
                            encoding,
                            detectEncodingFromByteOrderMarks: true,
                            bufferSize: 1024,
                            leaveOpen: true);

                        // The value length limit is enforced by 
                        // MultipartBodyLengthLimit
                        string value = await streamReader.ReadToEndAsync();

                        if (string.Equals(value, "undefined", StringComparison.OrdinalIgnoreCase))
                        {
                            value = string.Empty;
                        }

                        formAccumulator.Append(key, value);

                        if (formAccumulator.ValueCount > defaultFormOptions.ValueCountLimit)
                        {
                            return BadRequest(new { ErrorCode = 3 });
                        }
                    }
                }

                // Drain any remaining section body that hasn't been consumed and
                // read the headers for the next section.
                section = await reader.ReadNextSectionAsync();
            }

            // Bind form data to the model
            object formData = handler.GetModel();
            var formValueProvider = new FormValueProvider(
                BindingSource.Form,
                new FormCollection(formAccumulator.GetResults()),
                CultureInfo.CurrentCulture);
            var bindingSuccessful = await TryUpdateModelAsync(formData, formData.GetType(), prefix: "", valueProvider: formValueProvider, c => true);
            if (!bindingSuccessful)
            {
                return BadRequest(new { ErrorCode = 5 });
            }

            await handler.SaveFormDataAsync(formData, HttpContext.RequestAborted);

            //Send OK Response to Client.
            return Ok(new { FileName = trustedFileNameForDisplay });
        }

        [HttpGet("{fileName?}")]
        public async Task<IActionResult> Image(string fileName = "")
        {
            if (string.IsNullOrEmpty(fileName)) return NoContent();
            Stream stream = await storageProvider.GetStreamAsync(fileName, HttpContext.RequestAborted);
            return File(stream, GetMimeTypeForFileExtension(fileName));
        }

        private IUploadFileHandler GetHandler(string type)
        {
            switch (type.ToLower())
            {
                case "note":
                    return HttpContext.RequestServices.GetService<NoteUploadFileHandler>();
                case "bookitem":
                    return HttpContext.RequestServices.GetService<BookItemUploadFileHandler>();
            }

            return null;
        }

        private static string GetMimeTypeForFileExtension(string filePath)
        {
            const string DefaultContentType = "application/octet-stream";

            var provider = new FileExtensionContentTypeProvider();

            if (!provider.TryGetContentType(filePath, out string contentType))
            {
                contentType = DefaultContentType;
            }

            return contentType;
        }
    }
}
