import React, { useEffect, useState } from 'react';
import { getAllOrders } from '../modules/firebaseCalls'; 
import './OrdersPage.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSquareCheck , faXmark} from '@fortawesome/free-solid-svg-icons'
import { setOrderStatus } from '../modules/firebaseCalls'; 

export default function OrdersPage(){
    const [ orders , setOrders ] = useState([])
    const [ refresh , setRefresh ] = useState(true)

    const rejectBtn = (e) => {
        console.log(e.target.id);
    }

    const setOrderStatus_Btn = async (e) => {
        let orderId = e.currentTarget.id.split(',')[0]
        let orderStatus = e.currentTarget.id.split(',')[1]
               
        setOrderStatus({ orderId , orderStatus })   
        getAllOrders({ setOrders })
    }
    

    useEffect(() => {
        getAllOrders({ setOrders })
       
    }, []);

    function getQty([field, searchParam ]){return orders.map(order => order[1]).filter(order => order[searchParam] === field).length }
    function getTotal([field, searchParam ]){return orders.map(order => order[1]).filter(order => order[searchParam] === field).reduce((total, value) => total+= Number(value.cartTotal),0 ).toFixed(2) }
    function dontGetQty([field, searchParam ]){return orders.map(order => order[1]).filter(order => order[searchParam] !== field).length }
    function dontGetTotal([field, searchParam ]){return orders.map(order => order[1]).filter(order => order[searchParam] !== field).reduce((total, value) => total+= Number(value.cartTotal),0 ).toFixed(2) }


    return (
        <div className='orders'>
        
        {orders?.map(([ id , order ],key )=> 
// ----------------------------------------------- uses ternary to display order status -----------------------------------------------            
            order.orderType == 'online' ? 
                order.orderStatus === 'pending'? 
    //-----------------------------------------------------  pending action online order               
                    <div key={key} className='order-card online-card pending'>
                        <div className='order-card-header' >
                            <div className='card-header-left'>{order.name}  {order.timeOfOrder.split(':').slice(0,2).join(':')}</div>  
                            <div className="card-header-middle">{order.orderType}</div>
                            <div className="card-header-right">
                                <span  className='order-card-btn' > <FontAwesomeIcon  onClick={setOrderStatus_Btn} id={[id ,'accepted']}  icon={faSquareCheck} size="xl" /></span>
                                <span  className='order-card-btn' > <FontAwesomeIcon  onClick={setOrderStatus_Btn} id={[id ,'rejected']} icon={faXmark} size="xl"/> </span> 
                                {order.timeTillPickUp}
                            </div>
                        </div>
                        {order.order.map((item , k) => 
                            <div key={k}><span className='item-qty'>{item.quantity}</span><span>{item.name}</span> </div>
                        )}  
                    </div> 
                : 
    //----------------------------------------------------- rejected online order 
                order.orderStatus === 'rejected'?
                    <div key={key} className='order-card rejected-order'>
                        <div className='order-card-header' >
                            <div className='card-header-left'>{order.name}  {order.timeOfOrder.split(':').slice(0,2).join(':')}</div> 
                            <div className="card-header-middle">{order.orderStatus === 'rejected'? 'Rejected Order' : order.orderType}</div>
                            <div className="card-header-right">{order.timeTillPickUp}</div>
                        </div>
                        {order.order.map((item , k) => 
                            <div key={k}><span className='item-qty'>{item.quantity}</span><span>{item.name}</span> </div>
                        )}  
                    </div>
                :
    //----------------------------------------------------- accepted online order 
                    <div key={key} className='order-card online-card'>
                        <div className='order-card-header' >
                            <div className='card-header-left'>{order.name}  {order.timeOfOrder.split(':').slice(0,2).join(':')}</div> 
                            <div className="card-header-middle">{order.orderStatus === 'rejected'? 'Rejected Order' : order.orderType}</div>
                            <div className="card-header-right">{order.timeTillPickUp}</div>
                        </div>
                        {order.order.map((item , k) => 
                            <div key={k}><span className='item-qty'>{item.quantity}</span><span>{item.name}</span> </div>
                        )}  
                    </div>
            : 

    //----------------------------------------------------- instore order 
            <div key={key} className='order-card'>
                <div className='order-card-header' >
                    <div className='card-header-left'>{order.name}  {order.timeOfOrder.split(':').slice(0,2).join(':')}</div>   
                    <div className="card-header-middle">{order.orderType}</div> 
                    <div className="card-header-right"></div>
                </div>
                {order.order.map((item , k) => 
                    <div key={k}><span className='item-qty'>{item.quantity}</span><span>{item.name}</span></div>
                )}
            </div>
            
// -------------------------------------------------------------- Daily summary -------------------------------------------
        
        )}
        {orders?
            <div className='order-totals-container'>
                Daily Summary
            <section className='order-totals-left'>
              <table>
                <tbody>
                                         
                        <tr >
                            <td>{getQty(['rejected' ,'orderStatus', '==='])} Rejected Orders :</td>
                            <td>${getTotal(['rejected','orderStatus', '==='])}</td>
                        </tr>
                        
                        <tr >
                            <td>{getQty(['accepted' ,'orderStatus'])} Online Orders :</td>
                            <td>${getTotal(['accepted','orderStatus'])}</td>
                        </tr>
                        
                        
                        <tr >
                            <td>{getQty(['instore' ,'orderStatus'])} Instore Orders :</td>
                            <td>${getTotal(['instore','orderStatus'])}</td>
                        </tr>
                        <tr >
                        <td>{dontGetQty(['rejected' ,'orderStatus', '==='])} Total Sales :</td>
                            <td>${dontGetTotal(['rejected','orderStatus', '==='])}</td>
                        </tr>


                    
                </tbody>
              </table>
            </section>
            <section className='order-totals-right'></section>
            </div>:""}

                
        </div>
    );
}

 
