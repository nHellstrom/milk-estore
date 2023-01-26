import React, { useState, useContext, useEffect } from "react";
import MilkCard from "../MilkCard/MilkCard";
import { IMilk } from "../../interfaces.js";
import { MerchandiseContext } from "../../MerchandiseContext";
import "./ProductSection.css";
import TypeFilter from "../TypeFilter/TypeFilter";
import Searchbar from "../Searchbar/Searchbar";
import { Link } from "react-router-dom";

const ProductSection = () => {
    const [shownTypes, setShownTypes] = useState<string[] | undefined>(undefined);
    const [searchterm, setSearchterm] = useState<string | undefined>(undefined);
    const [shownProducts, setShownProducts] = useState<IMilk[]>([]);
    const allProducts = useContext<IMilk[]>(MerchandiseContext);
    const allTypes : string[] = [];

    if (allProducts.length > 0) {
        for (const prod of allProducts) {
            if (!allTypes.includes(prod.type)) {
                allTypes.push(prod.type);
            }
        }
        // for (let i = 0; i < allProducts!.length; i++) {
        //     if (!allTypes.includes(allProducts![i].type)) {
        //         allTypes.push(allProducts![i].type);
        //     }
        // }
        if (shownTypes == undefined ) {
            setShownTypes(allTypes);
            console.log("Initial types shown: ", allTypes);
        }
    } else {
        console.error("Error in ProductSection: Could not read any product types: ", allProducts)
    }

    // const fetchMerchandiseFromAPI = async () => {
    //     try {
    //         const apiAddress = "http://localhost:5134/api/Product";
    //         const response = await fetch(apiAddress);
    //         const data = await response.json();
    //         console.log(data)
    //     }
    //     catch(e) {
    //         // setConnectionWorking(false);
    //         console.error("Could not resolve API fetch ☹️ ", e)
    //     }
    // }

    const resetShownTypes = () => {
        setShownTypes(allTypes);
    }

    const renderSelection = () => {
        let result : IMilk[] = [];
        
        if (searchterm && searchterm !== "") {
            result = allProducts!.filter(prod => prod.name.toLowerCase()
            .includes(searchterm.toLowerCase()))
            .filter(prod => shownTypes?.includes(prod.type));
        } 
        else {
            result = allProducts!.filter(prod => shownTypes?.includes(prod.type));
        }
        setShownProducts(result);

    }

    

    useEffect(() => {
        renderSelection();
    }, [shownProducts])

    return <section>
        <TypeFilter types={allTypes} shownTypes={shownTypes} setShownTypes={setShownTypes}/>
        <Searchbar setSearchterm={setSearchterm} resetShownTypes={resetShownTypes}/>
        <div className="ProductSection__Merchandise">
            {
                allProducts && shownProducts?.map(prod => 
                    <Link to={`Product/${prod.id}`} className="ProductSection__link"><MilkCard product={prod} /></Link>)
            }
        </div>
    </section>
}

export default ProductSection