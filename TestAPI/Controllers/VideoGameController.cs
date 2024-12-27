using AutoMapper;
using BLL.DTOs;
using BLL.Services.Interface;
using Microsoft.AspNetCore.Mvc;

namespace TestAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    public class VideoGameController(IVideoGameService videoGameService) : ControllerBase
    {
        private readonly IVideoGameService _videoGameService = videoGameService;

        [Obsolete("This method is deprecated, use GetVideoGamesPaginatedAsync instead.")]
        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(List<VideoGameResponseDTO>))]
        public async Task<ActionResult<List<VideoGameResponseDTO>>> GetVideoGames()
        {
            List<VideoGameResponseDTO> videoGames = await _videoGameService.GetVideoGamesAsync();
            return Ok(videoGames);
        }

        [HttpGet]
        [Route("paginated")]
        public async Task<IActionResult> GetVideoGamesPaginated(int page = 1, int pageSize = 10)
        {
            return Ok(await _videoGameService.GetVideoGamesPaginatedAsync(page, pageSize));
        }

        [HttpGet]
        [Route("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(VideoGameResponseDTO))]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult> GetVideoGameById(int id)
        {
            var game = await _videoGameService.GetVideoGameByIdAsync(id);
            return Ok(game);
        }

        [HttpPost]
        [ProducesResponseType(StatusCodes.Status201Created, Type = typeof(VideoGameResponseDTO))]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult> AddVideoGame(VideoGameRequestDTO newGame)
        {
            if (newGame is null)
                return BadRequest();
            return Created(nameof(newGame),await _videoGameService.AddVideoGameAsync(newGame));
        }

        [HttpPut]
        [Route("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(VideoGameResponseDTO))]
        public async Task<IActionResult> UpdateVideoGame(int id, VideoGameRequestDTO updatedGame)
        {
            var result = await _videoGameService.UpdateVideoGameAsync(id, updatedGame);
            return Ok(result);
        }

        [HttpDelete]
        [Route("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(VideoGameResponseDTO))]
        public async Task<ActionResult> DeleteVideoGame(int id)
        {
            var game = await _videoGameService.DeleteVideoGameAsync(id);
            return Ok(game);
        }

    }
}
