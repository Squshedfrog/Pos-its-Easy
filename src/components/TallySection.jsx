import React, { useEffect, useState } from "react";
import { RemoveItem , addItemToCart } from "../modules/cart";
import { auth, db } from "../firebase";
import useSound from 'use-sound';
import { toast } from 'react-toastify';
import { placeOrder , getOnlineOrders } from '../modules/firebaseCalls'
import newOrderSfx from '../sounds/new-order.mp3'
import './TallySection.css'
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash , faSquareMinus } from '@fortawesome/free-solid-svg-icons'
 


export default function TallySection({ cart , setCart , products , user }){
    const [totalAmount, setTotalAmount] = useState(0);
    const [onlineOrder , setOnlineOrder ] = useState()

    let userName = user.displayName.split(' ')
    userName[1] = userName[1][0]
    userName = userName.join(' ')
    
    
    
    // ----------------------------------------- watches cart changes - updates set cartTotal
    useEffect(() => {
        let newCartTotal = 0
        cart.forEach(item => {
          newCartTotal = newCartTotal + Number(item.totalAmount)
        })
        setTotalAmount(newCartTotal.toFixed(2));
      },[cart])
      

    // --------------------------------------------------------- BTN Functions
    
    const addToCartBtn = async(e) =>{
        const product = products.filter( product => product.id == e.target.id )[0]
        setCart(await addItemToCart({product , cart}))
    }
    
    const emptyCartBtn = () => { setCart([]) }

    const removeItemBtn = async (e) => {
        const product = products.filter( product => product.id == e.currentTarget.id )[0]
        setCart(RemoveItem({ product , cart }))
    }

    const sendOrderBtn = async (e) => {
        let orderType = e.target.value;
        placeOrder({ userName , cart , orderType ,totalAmount })
        setCart([])
    }

    //------------------------------------------------------- notiforcations on online orders

    const [play] = useSound(newOrderSfx)
    
   useEffect(() =>{
        let findNewOrder = onlineOrder?.find( order =>{
            return order.timeOfOrder == new Date().toLocaleTimeString().split(':').slice(0,2).join(':')
          });
        if (findNewOrder){
            toast.success(<Link to={'/orders'}>new online order from {findNewOrder.name} requested pickup {findNewOrder.timeTillPickUp}</Link>, {className: 'toast-message'})
            play()
        }
    }, [onlineOrder]);


    useEffect(() => {
        getOnlineOrders({ setOnlineOrder })
    }, []);
    

    //-----------------------------------------------------------


    return (
        <section className="tally-section">
            { cart.length !== 0 ?
            <>
                <div className="tally-table">
                    <table >
                    <thead className="tally-header">
                        <tr>
                            <td className="tally-header-left">Item</td>
                            <td>Price</td>
                            <td>Qty</td>
                            <td>Total</td>
                            <td><button className="cart-btn" onClick={emptyCartBtn}><FontAwesomeIcon icon={faTrash} size="lg" /></button></td>
                        </tr>
                    </thead>
                    <tbody>
                
                        {cart?.map((product , key ) => 
                        <tr key={key}>
                            <td  className="tally-header-left" onClick={addToCartBtn} id={product.id}>{product.name}</td>
                            <td>{Number(product.price).toFixed(2)}</td>
                            <td>{product.quantity}</td>
                            <td>{Number(product.totalAmount).toFixed(2)}</td>
                            <td><button className="cart-btn" onClick={removeItemBtn} id={product.id}><FontAwesomeIcon icon={faSquareMinus} size="lg"/></button></td>
                        </tr>
                                       
                        )
                        
                    }
                    </tbody>
                    </table>
                </div>
                <div className="tally-footer">
                    <div className="tally-footer-left">
                        <button onClick={sendOrderBtn}  value='online' className="send-order-btn">Send Online Order</button>
                        <button onClick={sendOrderBtn} value='inStore' className="send-order-btn">Pay Now</button>
                    </div>

                    <div className="tally-footer-right">
                        <p>Total: ${totalAmount}</p>
                    </div>
                </div>
            </>
            :'' }
        </section>
    )
}