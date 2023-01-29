import React from "react";
import Order from "./Order";
import { useParams } from "react-router-dom";


function Redirect(){
    const { id } = useParams();
    return(<Order id={id} />)
}

export default Redirect