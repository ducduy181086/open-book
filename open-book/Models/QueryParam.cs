namespace quiz_app.Models
{
    public class QueryParam
    {
        public int PageIndex { get; set; } = 0;

        public int Take { get; set; } = 25;

        public string Search { get; set; } = string.Empty;

        public string Sort { get; set; } = string.Empty;

        public string SortDirection { get; set; } = "asc"; // default is ascending

        public bool IsAscending => SortDirection == "asc";
    }
}
