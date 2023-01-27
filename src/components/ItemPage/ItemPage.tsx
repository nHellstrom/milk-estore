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
    const [qty, setQty] = useState<number>(0);
    const [ordered, setOrdered] = useState<boolean>(false);

    const fetchProductFromAPI = async () => {
        try {
            console.log(params);
            const apiAddress = `http://localhost:5134/api/Product/${params.productid}`;
            const response = await fetch(apiAddress);
            const data = await response.json();
            setProduct(data);
        }
        catch(e) {
            console.error("Could not resolve API fetch ☹️ ", e)
        }
    }

    const updateQtyOnAPI = async () => {
        try {
            const apiAddress = `http://localhost:5134/api/Product/Order/${params.productid}`;
            console.log(apiAddress);
            const response = await fetch(apiAddress, 
                {
                method: "PATCH",
                headers: {
                    'Content-Type': 'application/json; charset=utf-8 '
                  },
                body: JSON.stringify(qty),
            });
            const data = await response.json();
            console.log(data);
            fetchProductFromAPI();
        }
        catch(e) {
            console.error("Could not update API  ☹️ ", e)
        }
    }

    const productAdded = () => {
        updateQtyOnAPI();
        setOrdered(true);
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
            <div className="ItemPage__orderinfo" id={"ItemPage__orderinfoId"}>
                <h3>{product?.name}</h3>
                <i>{product?.type}</i>
                <i>{product?.storage} liters left</i>
                <input type="range" id="qty" name="qty" min="1" max={product?.storage} value={qty} onChange={(e) => !ordered && setQty(parseInt(e.target.value))}/>
                <span>{qty} liters selected</span>
                <button onClick={() => !ordered && productAdded()}>Order</button>
            </div>
        </div>
            {ordered && <div className={"ItemPage__productadded"}>
                <h3>Product added to cart!</h3>
                <p>{qty} liters of {product?.name} has been added to the cart!</p>
            </div>}
    </article>
}

export default ItemPage;