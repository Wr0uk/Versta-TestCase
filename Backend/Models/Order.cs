using System.ComponentModel.DataAnnotations;

namespace Backend.Models;

public class Order
{
    [Key]
    public Guid? Id { get; set; }
    public string SenderCity { get; set; }
    public string SenderAddress { get; set;}
    public string RecipientCity { get; set; }
    public string RecipientAddress { get; set;}
    public float Weight { get; set;}
    public DateTime PickUpDate { get; set; }
}