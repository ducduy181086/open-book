using quiz_app.Enums;

namespace quiz_app.Data.Entities
{
    public class BookItem : EntityBase
    {
        public string County { get; set; }

        public string Country { get; set; }

        public string Town { get; set; }

        public string Postcode { get; set; }

        public string Description { get; set; }

        public string DisplayableAddress { get; set; }

        public string Image { get; set; }

        public string Latitude { get; set; }

        public string Longitude { get; set; }

        public byte NumberOfBedrooms { get; set; }

        public byte NumberOfBathrooms { get; set; }

        public decimal Price { get; set; }

        public string PropertyType { get; set; }

        public ForWhatEnum ForWhat { get; set; }

        public ImportTypeEnum ImportType { get; set; }
    }
}
