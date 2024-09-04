using Backend.Database;
using Backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Backend.Controllers;

[ApiController]
[Route("api/[controller]")]
public class OrderController (Context db) : ControllerBase
{
    [HttpGet]
    public async Task<IActionResult> Read()
    {
       var orderList = await db.Order.ToListAsync();
       return new JsonResult(orderList);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> ReadById(Guid id)
    {
        var order = await db.Order.FirstOrDefaultAsync(item => item.Id == id);
        return order is null ? 
            new StatusCodeResult(StatusCodes.Status400BadRequest) : new JsonResult(order);
    }

    [HttpPost]
    public async Task<IActionResult> Create([FromForm] Order item)
    {
        item.Id = Guid.NewGuid();
        await db.Order.AddAsync(item);
        return await db.SaveChangesAsync() > 0 ? 
            new JsonResult(item.Id) : new StatusCodeResult(StatusCodes.Status500InternalServerError);
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(Guid id)
    {
        var order = await db.Order.FirstOrDefaultAsync(item => item.Id == id);
        if (order is null) 
            return new StatusCodeResult(StatusCodes.Status400BadRequest);
        db.Remove(order);
        return await db.SaveChangesAsync() > 0 ? 
            new JsonResult(true) : new StatusCodeResult(StatusCodes.Status400BadRequest);
    }
}