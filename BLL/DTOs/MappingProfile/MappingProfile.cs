using AutoMapper;
using DAL.Entites;
using BLL.DTOs;

namespace BLL.DTOs.MappingProfile
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            // DAL -> BLL
            CreateMap<VideoGameEntity, VideoGameRequestDTO>();
            CreateMap<VideoGameEntity, VideoGameResponseDTO>();
            // BLL -> DAL
            CreateMap<VideoGameRequestDTO, VideoGameEntity>();
            CreateMap<VideoGameResponseDTO, VideoGameEntity>();
        }
    }
}
