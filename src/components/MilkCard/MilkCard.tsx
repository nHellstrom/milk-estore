import React from "react";
import { IProduct, IMilk } from "../../interfaces.js";
import defaultImage from "../../assets/milk.png";
import "./MilkCard.css"

const MilkCard = (product : IProduct) => {
    return <article className="MilkCard">
        <div className="MilkCard__imagediv">
            <img className="MilkCard__image" src={defaultImage} alt="Image of milk product"/>
        </div>
        <div className="MilkCard__info">
            <h3 className="MilkCard__title">{product.product.name}</h3>
            <span className="MilkCard__type"><i>Type: </i><br/>{product.product.type}</span>
            <span className="MilkCard__quantity"><i>Stock: </i><br/>{product.product.storage} liters</span>
        </div>
    </article>
}

export default MilkCard