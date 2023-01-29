using System.Data.SqlTypes;

namespace WebApplication2.DataBase
{
    public class OrderModel
    {
        public OrderModel(string senderCity, string senderAdress, string destinationCity, string destinationAdress, float weight, DateTime pickUpDate)
        {
            Id = Guid.NewGuid();
            SenderCity = senderCity;
            SenderAdress = senderAdress;
            DestinationCity = destinationCity;
            DestinationAdress = destinationAdress;
            Weight = weight;
            PickUpDate = pickUpDate;
        }

        public Guid Id { get; set; }
        public string SenderCity { get; set; }
        public string SenderAdress { get; set;}
        public string DestinationCity { get; set; }
        public string DestinationAdress { get; set;}
        public float Weight { get; set;}
        public DateTime PickUpDate { get; set; }
    }
}
