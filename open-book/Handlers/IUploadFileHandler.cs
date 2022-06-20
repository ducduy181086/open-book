using System.IO;
using System.Threading;
using System.Threading.Tasks;

namespace quiz_app.Handlers
{
    public interface IUploadFileHandler
    {
        Task SaveFileAsync(string fileName, Stream stream, CancellationToken ct);

        object GetModel();

        Task SaveFormDataAsync(object model, CancellationToken ct);
    }
}
