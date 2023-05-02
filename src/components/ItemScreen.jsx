
import React, { useEffect, useState } from "react";
import './ItemScreen.css'
import { addItemToCart } from "../modules/cart";

export default function ItemScreen({ selectMenu , cart , setCart , products }){
    
    const addToCart = async(product) =>{
        setCart(await addItemToCart({product , cart}))
    }

    
    const addProduct = e => {
        const productDetails = products.filter( product => product.id == e.target.id )
        addToCart(productDetails[0])
    }
//useEffect(() =>{ console.log(products?.filter(product => product.menu === selectMenu).map(product => console.log(product.name)))}, [products]) // -------- for testing 
    
    
    
    return (
    
        <div className="item-screen">
        {products?.filter((product ) => product.menu === selectMenu).map(( product, key  ) =>
// alternates class's to change colour on product buttons - a different colour on each row ----------------------------------------------

            key < 5 ? 
            <div className="product-btn product-first" onClick={addProduct} id={product.id} key={key}>{product.name}</div> 
            : 
            key < 10 ?
            <div className="product-btn product-second" onClick={addProduct} id={product.id} key={key}>{product.name}</div>
            :
            <div className="product-btn product-third" onClick={addProduct} id={product.id} key={key}>{product.name}</div>

            

            )}
        </div>
    
    )
    
    }

