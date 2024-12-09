using DAL.Entites;
using Microsoft.EntityFrameworkCore;

namespace DAL.Data
{
    public class VideoGameDbContext(DbContextOptions<VideoGameDbContext> options) : DbContext(options)
    {
        public DbSet<VideoGameEntity> VideoGames => Set<VideoGameEntity>();

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            modelBuilder.Entity<VideoGameEntity>().HasData(
                new VideoGameEntity
                {
                    Id = 1,
                    Title = "The Legend of Zelda: Breath of the Wild",
                    Platform = "Nintendo Switch",
                    Developer = "Nintendo",
                    Publisher = "Nintendo",
                    Created = new DateTime(2024, 12, 6),
                    Updated = new DateTime(2024, 12, 6)
                },
                new VideoGameEntity
                {
                    Id = 2,
                    Title = "God of War (2018)",
                    Platform = "PlayStation 4",
                    Developer = "Santa Monica Studio",
                    Publisher = "Sony Interactive Entertainment",
                    Created = new DateTime(2024, 12, 6),
                    Updated = new DateTime(2024, 12, 6)
                },
                new VideoGameEntity
                {
                    Id = 3,
                    Title = "Halo Infinite",
                    Platform = "Xbox Series X|S, PC",
                    Developer = "343 Industries",
                    Publisher = "Xbox Game Studios",
                    Created = new DateTime(2024, 12, 6),
                    Updated = new DateTime(2024, 12, 6)
                },
                new VideoGameEntity
                {
                    Id = 4,
                    Title = "Cyberpunk 2077",
                    Platform = "PlayStation 4, Xbox One, PC",
                    Developer = "CD Projekt Red",
                    Publisher = "CD Projekt",
                    Created = new DateTime(2024, 12, 6),
                    Updated = new DateTime(2024, 12, 6)
                }
            );
        }
    };
}
