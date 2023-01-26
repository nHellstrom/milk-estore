import React, { useEffect, useState } from "react";
import { IProduct } from "../../interfaces";
import defaultImage from "../../assets/milk.png";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { IMilk } from "../../interfaces";
import "./ItemPage.css";

const ItemPage = () => {
    const params = useParams();
    const [product, setProduct] = useState<IMilk | undefined>(undefined);
    const [qty, setQty] = useState<number>(1);

    const fetchProductFromAPI = async () => {
        try {
            console.log(params);
            const apiAddress = `http://localhost:5134/api/Product/${params.productid}`;
            const response = await fetch(apiAddress);
            const data = await response.json();
            console.log(data)
            setProduct(data);
            // setSearchResults(data)
        }
        catch(e) {
            // setConnectionWorking(false);
            console.error("Could not resolve API fetch ☹️ ", e)
        }
    }

    useEffect(() => {
        (async () => {
            fetchProductFromAPI();
        })();
    }, [])

    return <article className="ItemPage">
        <Link to={"/"}><button className="ItemPage__backbutton">🔙 Back</button></Link>
        
        <div className="ItemPage__product">
            <img className="ItemPage__image" src={defaultImage} alt="Image of milk product"/>
            <div className="ItemPage__orderinfo">
                <h3>{product?.name}</h3>
                <i>{product?.type}</i>
                <i>{product?.storage} liters left</i>
                <input type="range" id="qty" name="qty" min="1" max={product?.storage} value={qty} onChange={(e) => setQty(parseInt(e.target.value))}/>
                <span>{qty} liters selected</span>
                <button>Order</button>
            </div>
        </div>
    </article>
}

export default ItemPage;