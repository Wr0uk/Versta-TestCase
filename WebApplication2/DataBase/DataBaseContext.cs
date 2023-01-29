using Microsoft.EntityFrameworkCore;

namespace WebApplication2.DataBase
{
    public class DataBaseContext : DbContext
    {
        public DataBaseContext(DbContextOptions options) : base(options)
        {
        }

        public DbSet<OrderModel> Order { get; set; }
    }
}
