using BLL.DTOs;

namespace BLL.Services.Interface
{
    public interface IVideoGameService
    {
        [Obsolete("This method is deprecated, use GetVideoGamesPaginatedAsync instead.")]
        Task<List<VideoGameResponseDTO>> GetVideoGamesAsync();
        Task<PaginatedResponseDTO<VideoGameResponseDTO>> GetVideoGamesPaginatedAsync(int page, int pageSize);
        Task<VideoGameResponseDTO> GetVideoGameByIdAsync(int id);
        Task<VideoGameResponseDTO> AddVideoGameAsync(VideoGameRequestDTO newGame);
        Task<VideoGameResponseDTO> UpdateVideoGameAsync(int id, VideoGameRequestDTO newGame);
        Task<VideoGameResponseDTO> DeleteVideoGameAsync(int id);
    }
}
