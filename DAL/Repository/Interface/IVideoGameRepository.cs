using DAL.Entites;

namespace DAL.Repository.Interface
{
    public interface IVideoGameRepository
    {
        Task<List<VideoGameEntity>> GetVideoGames();
        Task<VideoGameEntity?> GetVideoGameById(int id);
        Task<VideoGameEntity> AddVideoGame(VideoGameEntity newGame);
        Task<VideoGameEntity?> UpdateVideoGame(int id, VideoGameEntity newGame);
        Task<VideoGameEntity?> DeleteVideoGame(int id);
    }
}
