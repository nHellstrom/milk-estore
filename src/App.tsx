import React, { createContext, useContext, useEffect, useState } from 'react'
import './App.css'
import ProductSection from './components/ProductSection/ProductSection';
import ItemPage from './components/ItemPage/ItemPage';
import { MerchandiseContextProvider } from './MerchandiseContext';
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { IMilk, IProduct } from './interfaces';


function App() {
  const [merchandise, setMerchandise] = useState<IMilk[]>([]);

  const fetchMerchandiseFromAPI = async () => {
    try {
        const apiAddress = "http://localhost:5134/api/Product";
        const response = await fetch(apiAddress);
        const data = await response.json();
        console.log(data);
        setMerchandise(data);
    }
    catch(e) {
        console.error("Could not resolve API fetch ☹️ ", e)
    }
  }

  useEffect(() => {
    (async () => {
          fetchMerchandiseFromAPI();
      })();
  }, [])
  
  return (
    <div className="App">
      <BrowserRouter>
        <MerchandiseContextProvider value={merchandise}>

        <header className="App__header">
          <Link className="App__headertitle" to={"/"}>
            <h1 >The Milk Store</h1>
          </Link>
        </header>

        <main className='App__main'>
          <Routes>
            <Route path="/product/:productid" element={<ItemPage/>}/>
            <Route path="/" element={<ProductSection/>}/>
            <Route path="*" element={<ProductSection/>}/>
          </Routes>
         
        </main>

        </MerchandiseContextProvider>
      </BrowserRouter>
    </div>
  )
}

export default App
