import React, { Component } from "react";
import { Link } from "react-router-dom";
import Navigation from "./Navigation";

class Home extends Component{
    constructor(props) {
        super(props)

        this.state={
            allOrders:[],
        }
    }

    async componentDidMount(){
        const response = await fetch('/api/getall');
        const data = await response.json();
        this.setState({ allOrders: data })
    }
    
    static renderTable(orders){
        return(
            <div>
                <table className="table table-striped" aria-labelledby="tableLabel">
                    <thead>
                        <tr>
                            <th>id</th>
                            <th>Дата забора груза</th>
                            <th>Город отправителя</th>
                         </tr>
                    </thead>
                    <tbody>
                        {orders.map(order => {
                            return(
                                <tr key={order.id}>
                                    <th scope="order">
                                        {order.id
                                        ? <Link to={`/order/${order.id}`}>{order.id}</Link>
                                        :order.id}
                                    </th>
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
        ? <p><em>Loading...</em></p>
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