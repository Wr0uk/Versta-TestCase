import React, { Component } from "react";
import axios from 'axios'
import Navigation from "./Navigation";

class AddOrder extends Component{
    constructor(){
        super();
        this.state={
            SenderCity:Text,
            SenderAddress:Text,
            RecipientCity:Text,
            RecipientAddress: Text,
            weight: Number,
            pickUpDate: Date,
        };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.formPreventDefault=this.formPreventDefault.bind(this);
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }
    async formPreventDefault(e) {
        e.preventDefault();
        let result = '';
        await axios.post('http://localhost/api/Order',this.state,{
            headers: {
                'Content-Type': 'multipart/form-data'
            }})
            .then(function (response) {
                result= response.data;
            })
            .catch(function (error) {
                console.log(error);
            });
        alert("Заказ успешно добавлен.\nID заказа: "+ result)
        window.location.reload();
    }


    render(){
        var enabled=
            this.state.SenderCity.length>0 &&
            this.state.SenderAddress.length>0 &&
            this.state.RecipientCity.length>0 &&
            this.state.RecipientAddress.length>0 &&
            this.state.weight > 0 &&
            new Date(this.state.pickUpDate).getTime() > new Date().getTime();
        return(
            <div>
                <Navigation />
                <form onSubmit={this.formPreventDefault}>
                    <label>
                        Город отправителя:
                        <input
                            name='SenderCity'
                            type="text"
                            value={this.state.SenderCity}
                            onChange={this.handleInputChange}/>
                    </label>
                    <br />
                    <label>
                        Адресс отправителя:
                        <input
                            name='SenderAddress'
                            type="text"
                            value={this.state.SenderAddress}
                            onChange={this.handleInputChange}/>
                    </label>
                    <br />
                    <label>
                        Город получателя:
                        <input
                            name='RecipientCity'
                            type="text"
                            value={this.state.RecipientCity}
                            onChange={this.handleInputChange}/>
                    </label>
                    <br />
                    <label>
                        Адрес получателя:
                        <input
                            name='RecipientAddress'
                            type="text"
                            value={this.state.RecipientAddress}
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