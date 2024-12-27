using DAL.Entites;

namespace DAL.Repository.Interface
{
    public interface IVideoGameRepository
    {
        Task<int> GetVideoGamesCount();

        [Obsolete("This method is deprecated, use GetVideoGames(int page, int pageSize) instead.")]
        Task<List<VideoGameEntity>> GetVideoGames();
        Task<List<VideoGameEntity>> GetVideoGames(int page, int pageSize);
        Task<VideoGameEntity?> GetVideoGameById(int id);
        Task<VideoGameEntity> AddVideoGame(VideoGameEntity newGame);
        Task<VideoGameEntity?> UpdateVideoGame(int id, VideoGameEntity newGame);
        Task<VideoGameEntity?> DeleteVideoGame(int id);
    }
}
