using BLL.Models;

namespace BLL.Services.Interface
{
    public interface IVideoGameService
    {
        Task<List<VideoGame>> GetVideoGamesAsync();
        Task<VideoGame?> GetVideoGameByIdAsync(int id);
        Task<VideoGame> AddVideoGameAsync(VideoGame newGame);
        Task<VideoGame?> UpdateVideoGameAsync(int id, VideoGame newGame);
        Task<VideoGame?> DeleteVideoGameAsync(int id);
    }
}
