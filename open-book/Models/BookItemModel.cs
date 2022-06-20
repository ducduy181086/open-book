using System.IO;

using quiz_app.Data.Entities;

namespace quiz_app.Models
{
    public class BookItemModel
    {
        public BookItemModel()
        {
        }

        public BookItemModel(BookItem entity) : base()
        {
            Id = entity.Id;
            County = entity.County;
            Country = entity.Country;
            Town = entity.Town;
            Postcode = entity.Postcode;
            Description = entity.Description;
            DisplayableAddress = entity.DisplayableAddress;
            string fileName = Path.GetFileNameWithoutExtension(entity.Image);
            string ext = Path.GetExtension(entity.Image);
            ImageUrl = entity.Image;
            ThumbImageUrl = $"{fileName}-thumb{ext}";
            Latitude = entity.Latitude;
            Longitude = entity.Longitude;
            NumberOfBedrooms = entity.NumberOfBedrooms;
            NumberOfBathrooms = entity.NumberOfBathrooms;
            Price = entity.Price;
            PropertyType = entity.PropertyType;
            ForWhat = (byte)entity.ForWhat;
        }

        public long Id { get; set; }

        public string County { get; set; }

        public string Country { get; set; }

        public string Town { get; set; }

        public string Postcode { get; set; }

        public string Description { get; set; }

        public string DisplayableAddress { get; set; }

        public string ImageUrl { get; set; }

        public string ThumbImageUrl { get; set; }

        public string Latitude { get; set; }

        public string Longitude { get; set; }

        public byte NumberOfBedrooms { get; set; }

        public byte NumberOfBathrooms { get; set; }

        public decimal Price { get; set; }

        public string PropertyType { get; set; }

        public byte ForWhat { get; set; }
    }
}
