using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

using quiz_app.Data.Entities;

namespace quiz_app.Data.Configurations
{
    public class TagConfiguration : IEntityTypeConfiguration<Tag>
    {
        public void Configure(EntityTypeBuilder<Tag> builder)
        {
            builder.HasIndex(c => c.Name);
            builder.HasIndex(c => c.Description);

            builder.Property(c => c.Name).HasMaxLength(50);
            builder.Property(c => c.Description).HasMaxLength(255);

            //builder.HasOne(c => c.Content).WithMany(c => c.).HasForeignKey(c => c.ContentId);
        }
    }
}
