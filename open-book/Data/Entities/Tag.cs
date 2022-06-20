namespace quiz_app.Data.Entities
{
    public class Tag : EntityBase
    {
        public virtual bool IsPublic { get; set; }

        public virtual string Name { get; set; }

        public virtual string Description { get; set; }

        public virtual long ContentId { get; set; }

        public virtual Content Content { get; set; }
    }
}
