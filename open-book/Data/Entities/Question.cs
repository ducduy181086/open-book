using System.ComponentModel.DataAnnotations;

namespace quiz_app.Data.Entities
{
    public class Question : EntityBase
    {
        public bool IsPublic { get; set; }

        [MaxLength(255)]
        public string Description { get; set; }
    }
}
