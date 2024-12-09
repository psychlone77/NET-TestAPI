using AutoMapper;
using BLL.Models;
namespace TestAPI.DTOs.MappingProfile
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            // BLL -> DTO
            CreateMap<VideoGame, VideoGameResponseDTO>();
            CreateMap<VideoGame, VideoGameRequestDTO>();
            // DTO -> BLL
            CreateMap<VideoGameRequestDTO, VideoGame>();
            CreateMap<VideoGameResponseDTO, VideoGame>();
        }
    }
}
