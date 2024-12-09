using AutoMapper;
using DAL.Entites;

namespace BLL.Models.MappingProfile
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            // DAL -> BLL
            CreateMap<VideoGameEntity, VideoGame>();
            // BLL -> DAL
            CreateMap<VideoGame, VideoGameEntity>();
        }
    }
}
