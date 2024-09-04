import React, { Component } from "react";
import { useParams } from "react-router-dom";
import Navigation from "./Navigation";
import css from "./Order.css";

class Order extends Component{
    constructor(props) {
        super(props)

        this.state={
            id : Text,
            senderCity: Text,
            senderAdress: Text,
            destinationCity: Text,
            destinationAdress: Text,
            weight: Number,
            pickUpDate: Date,
            avaliable: false
        }
    }

    async componentDidMount(){
        const {id} = this.props.params
        const response = await fetch(`http://localhost/api/Order/${id}`);
        const data = await response.json();
        this.setState({
            id: id,
            senderCity : data.senderCity,
            senderAddress : data.senderAddress,
            recipientCity : data.recipientCity,
            recipientAddress : data.recipientAddress,
            weight : data.weight,
            pickUpDate : data.pickUpDate,
            avaliable : true
        })
    }

    static renderData(state){
        return(
            <div>
                <form>
                    <label>
                        Id:
                        <input type={"text"} value={state.id} readOnly={true}/>
                    </label>
                    <label>
                        Город отправителя:
                        <input type={"text"} value={state.senderCity} readOnly={true}/>
                    </label>
                    <label>
                        Адрес отправителя:
                        <input type={"text"} value={state.senderAddress} readOnly={true}/>
                    </label>
                    <label>
                        Город получателя:
                        <input type={"text"} value={state.recipientCity} readOnly={true}/>
                    </label>
                    <label>
                        Адрес получателя:
                        <input type={"text"} value={state.recipientAddress} readOnly={true}/>
                    </label>
                    <label>
                        Вес груза:
                        <input type={"text"} value={state.weight} readOnly={true}/>
                    </label>
                    <label>
                        Дата забора груза:
                        <input type={"text"} value={state.pickUpDate} readOnly={true}/>
                    </label>
                </form>
            </div>
        )
    }

    render(){
        let contents = !this.state.avaliable
            ? <p><em>Loading...</em></p>
            : Order.renderData(this.state);

        return(
            <div>
                <Navigation />
                {contents}
            </div>
        )
    }
}
export default (props) =>  (
    <Order
        {...props}
        params={useParams()}/>
)