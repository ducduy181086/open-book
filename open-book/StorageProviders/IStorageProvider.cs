using System.IO;
using System.Threading;
using System.Threading.Tasks;

namespace quiz_app.StorageProviders
{
    public interface IStorageProvider
    {
        Task<Stream> GetStreamAsync(string fileName, CancellationToken ct);

        Task SaveAsync(string fileName, Stream stream, CancellationToken ct);
    }
}
