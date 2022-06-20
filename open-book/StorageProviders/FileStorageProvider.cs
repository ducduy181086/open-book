using System.IO;
using System.Threading;
using System.Threading.Tasks;

using Microsoft.AspNetCore.Hosting;

namespace quiz_app.StorageProviders
{
    public class FileStorageProvider : IFileStorageProvider
    {
        private static object syncObject = new object();

        private readonly IWebHostEnvironment hostingEnvironment;

        public FileStorageProvider(IWebHostEnvironment hostingEnvironment)
        {
            this.hostingEnvironment = hostingEnvironment;
        }

        public Task<Stream> GetStreamAsync(string fileName, CancellationToken ct)
        {
            string path = EnsureDirectory();

            string pathFile = Path.Combine(path, fileName);
            if (!File.Exists(pathFile)) throw new FileNotFoundException("Cannot find!", fileName);
            Stream stream = File.OpenRead(fileName);
            return Task.FromResult(stream);
        }

        public async Task SaveAsync(string fileName, Stream stream, CancellationToken ct)
        {
            string path = EnsureDirectory();

            string pathFile = Path.Combine(path, fileName);
            if (File.Exists(pathFile)) File.Delete(pathFile);
            using Stream fileStream = File.OpenWrite(pathFile);
            await stream.CopyToAsync(fileStream, ct);
        }

        private string EnsureDirectory()
        {
            string path = Path.Combine(hostingEnvironment.ContentRootPath, "upload-files");
            if (!Directory.Exists(path))
            {
                lock (syncObject)
                {
                    if (!Directory.Exists(path)) Directory.CreateDirectory(path);
                }
            }

            return path;
        }
    }

    public interface IFileStorageProvider : IStorageProvider { }
}
