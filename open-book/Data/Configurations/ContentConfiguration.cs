using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

using quiz_app.Data.Entities;

namespace quiz_app.Data.Configurations
{
    public class ContentConfiguration : IEntityTypeConfiguration<Content>
    {
        public void Configure(EntityTypeBuilder<Content> builder)
        {
            builder.Property(c => c.Raw).HasMaxLength(255);
        }
    }
}
