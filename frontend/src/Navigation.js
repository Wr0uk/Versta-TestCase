import React from "react";
import { NavLink } from "react-router-dom";
import css from './Navigation.css';

const Navigation = () =>(
    <nav>
        <ul>
            <NavLink to='/'>Все заказы</NavLink>
            <NavLink to='/addOrder'>Добавить заказ</NavLink>
        </ul>
    </nav>
)

export default Navigation