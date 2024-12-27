using DAL.Repository.Interface;
using BLL.Services.Interface;
using BLL.DTOs;
using AutoMapper;
using DAL.Entites;

namespace BLL.Services
{
    public class VideoGameService(IVideoGameRepository repository, IMapper mapper) : IVideoGameService
    {
        private readonly IVideoGameRepository _repository = repository;
        private readonly IMapper _mapper = mapper;

        public async Task<List<VideoGameResponseDTO>> GetVideoGamesAsync()
        {
            List<VideoGameEntity> videoGameEntities = await _repository.GetVideoGames();
            return _mapper.Map<List<VideoGameResponseDTO>>(videoGameEntities);
        }
        public async Task<PaginatedResponseDTO<VideoGameResponseDTO>> GetVideoGamesPaginatedAsync(int page, int pageSize)
        {
            ArgumentOutOfRangeException.ThrowIfNegativeOrZero(page);
            ArgumentOutOfRangeException.ThrowIfNegative(pageSize);
            var numberOfVideoGames = await _repository.GetVideoGamesCount();
            if ((page - 1) * pageSize > numberOfVideoGames)
                throw new ArgumentOutOfRangeException($"Page {page} with page size {pageSize} is out of bounds");
            List<VideoGameEntity> videoGameEntities = await _repository.GetVideoGames(page, pageSize);
            return new PaginatedResponseDTO<VideoGameResponseDTO>{
                TotalCount = numberOfVideoGames,
                Page = page,
                PageSize = pageSize,
                VideoGames = _mapper.Map<List<VideoGameResponseDTO>>(videoGameEntities)
            };
        }
        public async Task<VideoGameResponseDTO> GetVideoGameByIdAsync(int id)
        {
            ArgumentOutOfRangeException.ThrowIfNegative(id);
            VideoGameEntity? videoGameEntity = await _repository.GetVideoGameById(id);
            if (videoGameEntity is null)
                throw new KeyNotFoundException($"No video game found with id {id}");
            return _mapper.Map<VideoGameResponseDTO>(videoGameEntity);
        }
        public async Task<VideoGameResponseDTO> AddVideoGameAsync(VideoGameRequestDTO newGame)
        {
            VideoGameEntity newGameEntity = _mapper.Map<VideoGameEntity>(newGame);
            VideoGameEntity result = await _repository.AddVideoGame(newGameEntity);
            return _mapper.Map<VideoGameResponseDTO>(result);

        }
        public async Task<VideoGameResponseDTO> DeleteVideoGameAsync(int id)
        {
            ArgumentOutOfRangeException.ThrowIfNegative(id);
            VideoGameEntity? videoGameEntity = await _repository.DeleteVideoGame(id);
            if (videoGameEntity is null)
                throw new KeyNotFoundException($"No video game found with id {id}");
            return _mapper.Map<VideoGameResponseDTO>(videoGameEntity);
        }
        public async Task<VideoGameResponseDTO> UpdateVideoGameAsync(int id, VideoGameRequestDTO newGame)
        {
            ArgumentOutOfRangeException.ThrowIfNegative(id);
            VideoGameEntity newGameEntity = _mapper.Map<VideoGameEntity>(newGame);
            VideoGameEntity? result = await _repository.UpdateVideoGame(id, newGameEntity);
            if (result is null)
                throw new KeyNotFoundException($"No video game found with id {id}");
            return _mapper.Map<VideoGameResponseDTO>(result);
        }
    }
}
