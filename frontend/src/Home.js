import React, { Component } from "react";
import { Link } from "react-router-dom";
import Navigation from "./Navigation";
import css from "./Home.css";

class Home extends Component{
    constructor(props) {
        super(props)

        this.state={
            allOrders:[],
        }
    }

    async componentDidMount(){
        const response = await fetch('http://localhost/api/Order');
        console.log(response)
        const data = await response.json();
        this.setState({ allOrders: data })
    }

    static renderTable(orders){
        return(
            <div>
                <table className="table table-striped" aria-labelledby="tableLabel">
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>Дата забора груза</th>
                        <th>Город отправителя</th>
                    </tr>
                    </thead>
                    <tbody>
                    {orders.map(order => {
                        return(
                            <tr key={order.id}>
                                <td scope="order">
                                    {order.id
                                        ? <Link to={`/order/${order.id}`}>{order.id}</Link>
                                        :order.id}
                                </td>
                                <td>{order.pickUpDate}</td>
                                <td>{order.senderCity}</td>
                            </tr>
                        )
                    })}
                    </tbody>
                </table>
            </div>
        )
    }

    render(){
        let contents = this.state.allOrders.length===0
            ? <p><em>No data</em></p>
            : Home.renderTable(this.state.allOrders);

        return(
            <div>
                <Navigation />
                {contents}
            </div>
        )
    }
}

export default Home