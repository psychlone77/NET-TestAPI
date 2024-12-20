using System.ComponentModel.DataAnnotations;

namespace BLL.DTOs
{
    public class VideoGameRequestDTO
    {
        [Required]
        public string? Title { get; set; }
        [Required]
        public string? Platform { get; set; }
        [Required]
        public string? Developer { get; set; }
        [Required]
        public string? Publisher { get; set; }
    }
}
