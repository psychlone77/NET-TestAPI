using BLL.Services;
using BLL.Services.Interface;
using DAL.Data;
using DAL.Repository;
using DAL.Repository.Interface;
using Microsoft.EntityFrameworkCore;
using TestAPI.Controllers;

var builder = WebApplication.CreateBuilder(args);

// Add Exception Filters to the controllers
builder.Services.AddControllers(options =>
{
    options.Filters.Add<ExceptionFilter>();
});
builder.Services.AddResponseCaching();
//Add Swagger Documentation
builder.Services.AddSwaggerGen();

//Dependency Injections
builder.Services.AddScoped<IVideoGameService, VideoGameService>();
builder.Services.AddScoped<IVideoGameRepository, VideoGameRepository>();

builder.Services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());

//Add Database context
builder.Services.AddDbContext<VideoGameDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

//CORS configuration for web app
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowSpecificOrigin",
        builder => builder.WithOrigins("http://localhost:5173")
                          .AllowAnyHeader()
                          .AllowAnyMethod());
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

// Use CORS policy
app.UseCors("AllowSpecificOrigin");
app.UseResponseCaching();
app.UseAuthorization();

app.MapControllers();

app.Run();
