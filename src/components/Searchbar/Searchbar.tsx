import React, { useState } from "react";
import "./Searchbar.css"

interface ISearchbar {
    setSearchterm : any;
    resetShownTypes : any;
}

const Searchbar = ({setSearchterm, resetShownTypes} : ISearchbar) => {
    const [searchtermState, setSearchtermState] = useState<string>("");
    const input = document.getElementById("searchInput")

    const searchAction = () => {
        // resetShownTypes();
        setSearchterm(searchtermState);
    }

    input?.addEventListener("keypress", function(e) {
        if (e.key === "Enter") {
            searchAction();
        }
      });

    return <aside className="Searchbar">
        <label className="Searchbar__label">
            Search a product by name:<br/>
            <input 
            className="Searchbar__input"
            id="searchInput" 
            type="text" placeholder={"🥛"} 
            value={searchtermState} 
            onChange={(e) => setSearchtermState(e.target.value)}/>
        </label>
        <button id="searchButton" 
        className="Searchbar__button"
        onClick={() => searchAction()}>Go!</button>
    </aside>
}

export default Searchbar