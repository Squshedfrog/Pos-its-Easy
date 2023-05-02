import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar.jsx'
import Aside from '../components/aside.jsx';
import ItemScreen from '../components/ItemScreen.jsx';
import './HomePage.css'
import TallySection from '../components/TallySection.jsx';
import axios from 'axios';


export default function HomePage({ user }){
    const [selectMenu, setSelectMenu ] = useState('Coffee');
    const [cart , setCart] = useState([])
    const [products, setProducts] = useState([]);
    const [ onlineOrders , setOnlineOrders ] = useState([]);  

    // --------------------------- get product list on loading the page
    const fetchProducts = async () => {
        const getProducts = await axios.get('/products')
        setProducts(await getProducts.data)
    }

    const fetchOnlineOrders = async () => {
        const getOnlineOrders = await axios.get('/online-orders')
         setOnlineOrders(await getOnlineOrders.data)
        }
    
        

    
    
    
    useEffect(() =>{ 
        fetchProducts() 
        //fetchOnlineOrders()
    }, [])


    
    



    return (
        <div>
            
            <div className="home-page">
            

                <Aside 
                    setSelectMenu={setSelectMenu} 
                    selectMenu={selectMenu}
                    setProducts={setProducts}
                    products = {products}
                />
                <ItemScreen 
                    selectMenu={selectMenu}
                    cart={cart}
                    setCart={setCart}
                    products={products}
                    
                />
                <TallySection 
                    cart={cart}
                    setCart={setCart}
                    products={products}
                    user={user}
                />
               

            </div>
        </div>
    );
}

 