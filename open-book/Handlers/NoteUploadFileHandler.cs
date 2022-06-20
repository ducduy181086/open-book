using System.IO;
using System.Threading;
using System.Threading.Tasks;

using quiz_app.StorageProviders;

namespace quiz_app.Handlers
{
    /// <summary>
    /// Register handler at Startup and FileController
    /// </summary>
    public class NoteUploadFileHandler : UploadFileHandlerBase<FormData>
    {
        private readonly IStorageProvider storageProvider;

        public NoteUploadFileHandler(IFileStorageProvider fileStorageProvider)
        {
            storageProvider = fileStorageProvider;
        }

        public override Task SaveFileAsync(string fileName, Stream stream, CancellationToken ct)
        {
            return storageProvider.SaveAsync(fileName, stream, ct);
        }

        protected override FormData GetFormData()
        {
            return new FormData();
        }

        protected override Task SaveFormDataAsync(FormData model, CancellationToken ct)
        {
            return Task.CompletedTask;
        }
    }

    public class FormData
    {
        public string Note { get; set; }
    }
}
