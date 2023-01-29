import React, { Component } from "react";
import { useParams } from "react-router-dom";
import Navigation from "./Navigation";

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
        const response = await fetch(`/api/getbyid/${id}`);
        const data = await response.json();
        this.setState({
            id: id,
            senderCity : data.senderCity,
            senderAdress : data.senderAdress,
            destinationCity : data.destinationCity,
            destinationAdress : data.destinationAdress,
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
                        Id: {state.id}
                    </label>
                    <br />
                    <label>
                        Город отправителя: {state.senderCity}
                    </label>
                    <br />
                    <label>
                        Адрес отправителя: {state.senderAdress}
                    </label>
                    <br />
                    <label>
                        Город получателя: {state.destinationCity}
                    </label>
                    <br />
                    <label>
                        Адрес получателя: {state.destinationAdress}
                    </label>
                    <br />
                    <label>
                        Вес груза: {state.weight}
                    </label>
                    <br />
                    <label>
                        Дата забора груза: {state.pickUpDate}
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