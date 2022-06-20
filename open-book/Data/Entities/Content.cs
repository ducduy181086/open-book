using System.Collections.Generic;

namespace quiz_app.Data.Entities
{
    public class Content : EntityBase
    {
        public virtual byte Type { get; set; }

        public virtual string Raw { get; set; }

        public virtual ICollection<Tag> Tags { get; set; }
    }
}
