using System.IO;
using System.Threading;
using System.Threading.Tasks;

using quiz_app.Data;
using quiz_app.Data.Entities;
using quiz_app.StorageProviders;

namespace quiz_app.Handlers
{
    public class BookItemUploadFileHandler : UploadFileHandlerBase<BookItem>
    {
        private readonly IStorageProvider storageProvider;
        private readonly ApplicationDbContext applicationDbContext;

        public BookItemUploadFileHandler(
            IFileStorageProvider fileStorageProvider,
            ApplicationDbContext applicationDbContext)
        {
            storageProvider = fileStorageProvider;
            this.applicationDbContext = applicationDbContext;
        }

        public override Task SaveFileAsync(string fileName, Stream stream, CancellationToken ct)
        {
            return storageProvider.SaveAsync(fileName, stream, ct);
        }

        protected override BookItem GetFormData()
        {
            return new BookItem();
        }

        protected override async Task SaveFormDataAsync(BookItem model, CancellationToken ct)
        {
            if (model.Id > 0)
            {
                var current = await applicationDbContext.BookItems.FindAsync(new object[] { model.Id }, ct);
                current.County = model.County;
                current.Country = model.Country;
                current.Town = model.Town;
                current.Postcode = model.Postcode;
                current.Description = model.Description;
                current.DisplayableAddress = model.DisplayableAddress;
                current.NumberOfBedrooms = model.NumberOfBedrooms;
                current.NumberOfBathrooms = model.NumberOfBathrooms;
                current.Price = model.Price;
                current.PropertyType = model.PropertyType;
                current.ForWhat = model.ForWhat;
            }
            else
            {
                var current = new BookItem();
                current.County = model.County;
                current.Country = model.Country;
                current.Town = model.Town;
                current.Postcode = model.Postcode;
                current.Description = model.Description;
                current.DisplayableAddress = model.DisplayableAddress;
                current.NumberOfBedrooms = model.NumberOfBedrooms;
                current.NumberOfBathrooms = model.NumberOfBathrooms;
                current.Price = model.Price;
                current.PropertyType = model.PropertyType;
                current.ForWhat = model.ForWhat;
                current.ImportType = Enums.ImportTypeEnum.User;
                applicationDbContext.BookItems.Add(current);
            }

            await applicationDbContext.SaveChangesAsync(ct);
        }
    }
}
