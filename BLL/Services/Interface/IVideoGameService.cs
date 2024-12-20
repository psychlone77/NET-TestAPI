using BLL.DTOs;

namespace BLL.Services.Interface
{
    public interface IVideoGameService
    {
        Task<List<VideoGameResponseDTO>> GetVideoGamesAsync();
        Task<VideoGameResponseDTO> GetVideoGameByIdAsync(int id);
        Task<VideoGameResponseDTO> AddVideoGameAsync(VideoGameRequestDTO newGame);
        Task<VideoGameResponseDTO> UpdateVideoGameAsync(int id, VideoGameRequestDTO newGame);
        Task<VideoGameResponseDTO> DeleteVideoGameAsync(int id);
    }
}
