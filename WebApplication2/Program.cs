
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Hosting;
using System;
using System.Net;
using WebApplication2.DataBase;

namespace WebApplication2
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);


            builder.Services.AddControllers();
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();
            builder.Services.AddDbContext<DataBaseContext>(options => options.UseSqlServer(builder.Configuration.GetConnectionString("DataBaseContext")));
            builder.Services.AddCors(options => options.AddPolicy("CorsPolicy",
                builder =>
                {
                    builder.WithOrigins("http://localhost:3000");
                }));


            var app = builder.Build();

            using(IServiceScope scope=app.Services.GetRequiredService<IServiceScopeFactory>().CreateScope())
                scope.ServiceProvider.GetService<DataBaseContext>().Database.Migrate();

            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            app.UseHttpsRedirection();

            app.UseCors("CorsPolicy");

            app.UseAuthorization();


            app.MapControllers();

            app.Run();
        }
    }
}