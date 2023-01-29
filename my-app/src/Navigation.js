import React from "react";
import { NavLink } from "react-router-dom";

const Navigation = () =>(
    <nav>
        <ul>
          <li><NavLink to='/'>Все заказы</NavLink></li>
          <li><NavLink to='/addOrder'>Добавить заказ</NavLink></li>
        </ul>
    </nav>
)

export default Navigation