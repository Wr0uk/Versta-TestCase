
using Backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Backend.Database;

public sealed class Context : DbContext
{
    public Context(DbContextOptions options) : base(options)
    {
        Database.EnsureCreated();
    }
    public DbSet<Order> Order { get; set; }
}