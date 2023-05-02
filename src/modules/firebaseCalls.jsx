import { db } from "../firebase";
import {
    setDoc,
    doc,
    addDoc,
    query,
    collection,
    orderBy,
    onSnapshot,
    limit,
    serverTimestamp,
    where,
    updateDoc
  } from "firebase/firestore";


// -----------------------  record in-store sale in Firebase db ----------------------------
// used on TallySection 51
export async function placeOrder ({ userName , cart , orderType ,totalAmount}){
  let orderStatus = orderType === 'online'? 'pending' : 'instore' 
   
  await addDoc(collection(db, "online_orders"),
            {
            name: userName,
            order: cart,
            timeOfOrder : new Date().toLocaleTimeString().split(':').slice(0,2).join(':'),
            timeTillPickUp: 'asap', // hard coded -------------------
            date: new Date().toLocaleDateString(),
            orderType: orderType,
            orderStatus: orderStatus,
            cartTotal : totalAmount
  });
}

// ------------------------- gets online orders that are pending action for notiforcations --
// used on TallySection 71
export async function getOnlineOrders({ setOnlineOrder }){

    const q = query(
        collection(db, "online_orders"),
               
        where ("orderStatus", "==", "pending" ),
        where ("date", "==", new Date().toLocaleDateString() ),
        where ("orderType", "==", "online"),
        orderBy("timeOfOrder"),
         
      );
      
      
      const unsubscribe = onSnapshot(q, (QuerySnapshot) => { //onSnapshot listen to changes in online_orders 
        let orders = [];
        
        QuerySnapshot.forEach((doc) => {
          orders.push(doc.data() );
        });
        setOnlineOrder(orders.reverse())
      });
      return () => unsubscribe;
}

// -------------------------------- gets all orders for current day -------------------------
// used OrdersPage 23 , 28

export async function getAllOrders({ setOrders }){

    const q = query(
        collection(db, "online_orders"),
               
         where ("date", "==", new Date().toLocaleDateString() ),
         orderBy("timeOfOrder"),
         
      );
      
      let orders = [];
      const unsubscribe = onSnapshot(q, (QuerySnapshot) => { //onSnapshot listen to changes in online_orders 
        
        
        QuerySnapshot.forEach((doc) => {
          orders.push([doc.id , doc.data() ]);
        });
        setOrders(orders.reverse())
      });
      return orders
}


// ------------------------------- update online order status -----------------------
// used OrdersPage 22

export async function setOrderStatus({ orderId , orderStatus }){
 
  const DocRef = doc(db, "online_orders", orderId);
        await updateDoc(DocRef, {
            orderStatus : orderStatus
        });
}