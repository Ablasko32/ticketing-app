using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using ticketing.Data;
using ticketing.Models;
using ticketing.Repositories;
using ticketing.Services;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Init Db Connection
builder.Services.AddDbContext<ApplicationContext>(options =>
{
    options.UseSqlite(builder.Configuration.GetConnectionString("sqlite"));
});

// Configure identity
builder.Services.AddIdentity<AppUser, IdentityRole>(options =>
{
    options.Password.RequiredLength = 6;
}).AddEntityFrameworkStores<ApplicationContext>().AddDefaultTokenProviders();

//Configure cookies
builder.Services.ConfigureApplicationCookie(options => {

    options.Events.OnRedirectToLogin = context =>
    {
        context.Response.StatusCode = StatusCodes.Status401Unauthorized;
        return Task.CompletedTask;
    };


    options.Events.OnRedirectToAccessDenied = context =>
    {
        context.Response.StatusCode = StatusCodes.Status403Forbidden;
        return Task.CompletedTask;
    };

});


builder.Services.AddAuthentication();

//Make request injectable
builder.Services.AddHttpContextAccessor();

//Map Repository/Service layer
builder.MapRepositories();
builder.MapServices();

// Building

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

// Check and execute pending migrations and seed roles
await app.MigrateDbAsync();
await app.SeedRolesAsync();

app.Run();