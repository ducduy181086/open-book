using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

using quiz_app.Data.Entities;
using quiz_app.Enums;

namespace quiz_app.Data.Configurations
{
    public class BookItemConfiguration : IEntityTypeConfiguration<BookItem>
    {
        public void Configure(EntityTypeBuilder<BookItem> builder)
        {
            builder.Property(c => c.County).HasMaxLength(50);
            builder.Property(c => c.Country).HasMaxLength(50);
            builder.Property(c => c.Town).HasMaxLength(50);
            builder.Property(c => c.Postcode).HasMaxLength(10);
            builder.Property(c => c.Description).HasMaxLength(255);
            builder.Property(c => c.DisplayableAddress).HasMaxLength(255);
            builder.Property(c => c.Image).HasMaxLength(255);
            builder.Property(c => c.Latitude).HasMaxLength(50);
            builder.Property(c => c.Longitude).HasMaxLength(50);
            builder.Property(c => c.Price).HasColumnType("decimal(18,2)");
            builder.Property(c => c.PropertyType).HasMaxLength(50);
            builder.Property(c => c.ForWhat).HasConversion(m => (byte)m, m => (ForWhatEnum)m);
            builder.Property(c => c.ImportType).HasConversion(m => (byte)m, m => (ImportTypeEnum)m);
        }
    }
}
