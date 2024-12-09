using DAL.Repository.Interface;
using BLL.Services.Interface;
using BLL.Models;
using AutoMapper;
using DAL.Entites;

namespace BLL.Services
{
    public class VideoGameService(IVideoGameRepository repository, IMapper mapper) : IVideoGameService
    {
        private readonly IVideoGameRepository _repository = repository;
        private readonly IMapper _mapper = mapper;

        public async Task<List<VideoGame>> GetVideoGamesAsync()
        {
            List<VideoGameEntity> videoGameEntities = await _repository.GetVideoGames();
            return _mapper.Map<List<VideoGame>>(videoGameEntities);
        }
        public async Task<VideoGame?> GetVideoGameByIdAsync(int id)
        {
            ArgumentOutOfRangeException.ThrowIfNegative(id);
            VideoGameEntity? videoGameEntity = await _repository.GetVideoGameById(id);
            return _mapper.Map<VideoGame?>(videoGameEntity);
        }
        public async Task<VideoGame> AddVideoGameAsync(VideoGame newGame)
        {
            ValidateVideoGame(newGame);
            VideoGameEntity newGameEntity = _mapper.Map<VideoGameEntity>(newGame);
            VideoGameEntity result = await _repository.AddVideoGame(newGameEntity);
            return _mapper.Map<VideoGame>(result);

        }
        public async Task<VideoGame?> DeleteVideoGameAsync(int id)
        {
            ArgumentOutOfRangeException.ThrowIfNegative(id);
            VideoGameEntity? videoGameEntity = await _repository.DeleteVideoGame(id);
            return _mapper.Map<VideoGame?>(videoGameEntity);
        }
        public async Task<VideoGame?> UpdateVideoGameAsync(int id, VideoGame newGame)
        {
            ArgumentOutOfRangeException.ThrowIfNegative(id);
            ValidateVideoGame(newGame);
            VideoGameEntity newGameEntity = _mapper.Map<VideoGameEntity>(newGame);
            VideoGameEntity? result = await _repository.UpdateVideoGame(id, newGameEntity);
            return _mapper.Map<VideoGame>(result);
        }
        private static void ValidateVideoGame(VideoGame game)
        {
            if (string.IsNullOrWhiteSpace(game.Title))
            {
                throw new ArgumentException("Title is required.");
            }
            if (string.IsNullOrWhiteSpace(game.Developer))
            {
                throw new ArgumentException("Developer is required.");
            }
            if (string.IsNullOrWhiteSpace(game.Platform))
            {
                throw new ArgumentException("Platform is required.");
            }
            if (string.IsNullOrWhiteSpace(game.Publisher))
            {
                throw new ArgumentException("Publisher is required.");
            }
        }
    }
}
