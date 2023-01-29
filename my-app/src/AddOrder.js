import React, { Component } from "react";
import Navigation from "./Navigation";

class AddOrder extends Component{
    constructor(){
    super();
    this.state={
      senderCity:Text,
      senderAdress:Text,
      destinationCity:Text,
      destinationAdress: Text,
      weight: Number,
      pickUpDate: Date,
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit=this.handleSubmit.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  async handleSubmit(event){
    let res= await fetch("api/post",
    {
      method: 'POST',
      headers:{
        'accept' : '*/*',
        'senderCity' : this.state.senderCity,
        'senderAdress' : this.state.senderAdress,
        'destinationAdress' : this.state.destinationAdress,
        'destinationCity' : this.state.destinationCity,
        'weight' : this.state.weight,
        'pickUpDate' : this.state.pickUpDate,
      }
    })
    let resJson= await res.json()
  }


  render(){
    var enabled=
      this.state.senderCity.length>0 &&
      this.state.senderAdress.length>0 &&
      this.state.destinationCity.length>0 &&
      this.state.destinationAdress.length>0 &&
      this.state.weight > 0 &&
      new Date(this.state.pickUpDate).getTime() > new Date().getTime();
    return(
      <div>
        <Navigation />
        <form onSubmit={this.handleSubmit}>
          <label>
            Город отправителя:
            <input
            name='senderCity'
            type="text"
            value={this.state.senderCity}
            onChange={this.handleInputChange}/>
          </label>
          <br />
          <label>
            Адресс отправителя:
            <input
            name='senderAdress'
            type="text"
            value={this.state.senderAdress}
            onChange={this.handleInputChange}/>
          </label>
          <br />
          <label>
            Город получателя:
            <input
            name='destinationCity'
            type="text"
            value={this.state.destinationCity}
            onChange={this.handleInputChange}/>
          </label>
          <br />
          <label>
            Адрес получателя:
            <input
            name='destinationAdress'
            type="text"
            value={this.state.destinationAdress}
            onChange={this.handleInputChange}/>
          </label>
          <br />
          <label>
            Вес груза:
            <input
            name='weight'
            type="number"
            value={this.state.weight}
            onChange={this.handleInputChange}/>
          </label>
          <br />
          <label>
            Дата забора груза:
            <input
            name='pickUpDate'
            type="date"
            value={this.state.pickUpDate}
            onChange={this.handleInputChange}/>
          </label>
          <input type="submit" disabled={!enabled}
          value= "Отправить"/>
        </form>
      </div>
    );
  }
}
export default AddOrder