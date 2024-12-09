using DAL.Data;
using Microsoft.EntityFrameworkCore;
using DAL.Repository.Interface;
using DAL.Entites;

namespace DAL.Repository
{
    public class VideoGameRepository(VideoGameDbContext context) : IVideoGameRepository
    {
        private readonly VideoGameDbContext _context = context;
        private readonly DbSet<VideoGameEntity> _dbSet = context.VideoGames;

        public async Task<List<VideoGameEntity>> GetVideoGames()
        {
            return await _dbSet.ToListAsync();
        }
        public async Task<VideoGameEntity?> GetVideoGameById(int id)
        {
            return await _dbSet.FindAsync(id);
        }
        public async Task<VideoGameEntity> AddVideoGame(VideoGameEntity newGame)
        {
            _dbSet.Add(newGame);
            await _context.SaveChangesAsync();
            return newGame;
        }
        public async Task<VideoGameEntity?> UpdateVideoGame(int id, VideoGameEntity newGame)
        {
            var game = _dbSet.FirstOrDefault(x => x.Id == id);
            if (game == null)
            {
                return null;
            }
            game.Title = newGame.Title;
            game.Publisher = newGame.Publisher;
            game.Developer = newGame.Developer;
            game.Platform = newGame.Platform;
            await _context.SaveChangesAsync();
            return game;
        }
        public async Task<VideoGameEntity?> DeleteVideoGame(int id)
        {
            VideoGameEntity? toDeleteGame = _dbSet.Find(id);
            if (toDeleteGame == null)
            {
                return null;
            }
            _dbSet.Remove(toDeleteGame);
            await _context.SaveChangesAsync();
            return toDeleteGame;
        }
    }
}
