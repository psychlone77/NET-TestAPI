namespace DAL.Entites
{
    public class VideoGameEntity
    {
        public int Id { get; set; }
        public string? Title { get; set; }
        public string? Platform { get; set; }
        public string? Developer { get; set; }
        public string? Publisher { get; set; }
        public DateTime Created { get; set; }
        public DateTime Updated { get; set; }
    }
}
