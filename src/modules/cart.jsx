

export async function addItemToCart({product , cart}) {
    
// ---------------------------- finds item in cart 
let findItemInCart = await cart.find(item=>{
    return item.id === product.id
  });
  
  if(findItemInCart){
    let newCart = [];
    let newItem;

    cart.forEach(cartItem => {
      if(cartItem.id === product.id){
        newItem = {
          ...cartItem,
          quantity: cartItem.quantity + 1,
          totalAmount: cartItem.price * (cartItem.quantity + 1)
        }
        newCart.push(newItem);
      }else{
        newCart.push(cartItem);
      }
    });

    return newCart
 

  }else{
    let addingProduct = {
      ...product,
      'quantity': 1,
      'totalAmount': product.price,
    }
    return [...cart, addingProduct]
 
  }
}

export function RemoveItem({ product , cart }){
    const newCart =cart.filter(cartItem => cartItem.id !== product.id);
        const editItem = cart.filter(cartItem => cartItem.id === product.id)
        
        if (editItem[0].quantity <= 1){
            return(newCart)
        } else {
            editItem[0].totalAmount = (editItem[0].quantity - 1) * editItem[0].price
            editItem[0].quantity = editItem[0].quantity - 1 
            newCart.push(editItem[0])
            return(newCart);
        }
}

