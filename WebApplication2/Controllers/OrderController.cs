using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebApplication2.DataBase;

namespace WebApplication2.Controllers
{
    [Route("api/")]
    [ApiController]
    public class OrderController : ControllerBase
    {
        private readonly DataBaseContext _db;

        public OrderController(DataBaseContext db)
        {
            _db = db;
        }

        [HttpGet("getall")]
        public async Task<IActionResult> Get()
        {
            var notes = await _db.Order.ToListAsync();

            return new JsonResult(notes);
        }

        [HttpGet("getbyid/{id}")]
        public async Task<IActionResult> Get(Guid id)
        {
            var note = await _db.Order.FirstOrDefaultAsync(n => n.Id == id);
            if (note == null) return new JsonResult(null);

            return new JsonResult(note);
        }

        [HttpPost("post")] //http://localhost:5000/api/post?senderCity=asd&senderAdress=daas&destinationCity=asd&destinationAdress=asd&weight=2&pickUpDate=2019-12-01
        public async Task<IActionResult> Post([FromHeader]string senderCity, [FromHeader] string senderAdress, [FromHeader] string destinationCity, [FromHeader] string destinationAdress, [FromHeader] float weight, [FromHeader] DateTime pickUpDate)
        {
            var Order = new OrderModel(senderCity, senderAdress, destinationCity, destinationAdress, weight, pickUpDate);
            _db.Order.Add(Order);
            await _db.SaveChangesAsync();

            return new JsonResult(Order.Id);
        }

        [HttpDelete("delete/{id}")]
        public async Task<IActionResult> Delete(Guid id)
        {
            var note = await _db.Order.FirstOrDefaultAsync(n => n.Id == id);
            if (note == null) return new JsonResult(null);
            _db.Remove(note);
            var success = (await _db.SaveChangesAsync()) > 0;

            return new JsonResult(success);
        }
    }
}
