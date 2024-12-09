using AutoMapper;
using BLL.Models;
using BLL.Services.Interface;
using Microsoft.AspNetCore.Mvc;
using TestAPI.DTOs;

namespace TestAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    public class VideoGameController(IVideoGameService videoGameService, IMapper mapper) : ControllerBase
    {
        private readonly IVideoGameService _videoGameService = videoGameService;
        private readonly IMapper _mapper = mapper;

        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(List<VideoGameResponseDTO>))]
        public async Task<ActionResult<List<VideoGameResponseDTO>>> GetVideoGames()
        {
            List<VideoGame> videoGames = await _videoGameService.GetVideoGamesAsync();
            return Ok(_mapper.Map<List<VideoGameResponseDTO>>(videoGames));
        }

        [HttpGet]
        [Route("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(VideoGameResponseDTO))]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult> GetVideoGameById(int id)
        {
            var game = await _videoGameService.GetVideoGameByIdAsync(id);
            if (game == null)
                return NotFound();
            return Ok(_mapper.Map<VideoGameResponseDTO>(game));
        }

        [HttpPost]
        [ProducesResponseType(StatusCodes.Status201Created, Type = typeof(VideoGameResponseDTO))]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult> AddVideoGame(VideoGameRequestDTO newGame)
        {
            if (newGame is null)
                return BadRequest();
            var game = _mapper.Map<VideoGame>(newGame);
            return Created(nameof(game),await _videoGameService.AddVideoGameAsync(game));
        }

        [HttpPut]
        [Route("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(VideoGameResponseDTO))]
        public async Task<IActionResult> UpdateVideoGame(int id, VideoGameRequestDTO newGame)
        {
            VideoGame game = _mapper.Map<VideoGame>(newGame);
            var result = await _videoGameService.UpdateVideoGameAsync(id, game);
            if (result is null)
            {
                return BadRequest();
            }
            return Ok(result);
        }

        [HttpDelete]
        [Route("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(VideoGameResponseDTO))]
        public async Task<ActionResult> DeleteVideoGame(int id)
        {
            var game = await _videoGameService.DeleteVideoGameAsync(id);
            if (game is null)
            {
                return NotFound();
            }
            return Ok(game);
        }

    }
}
