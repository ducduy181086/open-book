using System.IO;
using System.Threading;
using System.Threading.Tasks;

namespace quiz_app.Handlers
{
    public abstract class UploadFileHandlerBase : IUploadFileHandler
    {
        public abstract object GetModel();
        public abstract Task SaveFileAsync(string fileName, Stream stream, CancellationToken ct);
        public abstract Task SaveFormDataAsync(object model, CancellationToken ct);
    }

    public abstract class UploadFileHandlerBase<TData> : UploadFileHandlerBase
    {
        public override object GetModel()
        {
            return GetFormData();
        }

        public override Task SaveFormDataAsync(object model, CancellationToken ct)
        {
            return SaveFormDataAsync((TData)model, ct);
        }

        protected abstract TData GetFormData();

        protected abstract Task SaveFormDataAsync(TData model, CancellationToken ct);
    }
}
