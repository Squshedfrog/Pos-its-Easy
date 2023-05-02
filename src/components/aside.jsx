import axios from "axios";
import React, { useEffect, useState } from "react";
import './aside.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMugSaucer, faPencil, faSquarePlus, faTrash, faUtensils } from "@fortawesome/free-solid-svg-icons";


export default function Aside({ setSelectMenu , selectMenu , setProducts , products}){

    const [menus, setMenus] = useState([]);
    const [addMenu , setAddMenu ] = useState(false)
    const [menuName , setMenuName ] = useState()

    const [addItem , setAddItem ] = useState(false)
    const [newItem , setNewItem] = useState()
    const [price , setPrice ] = useState()


    const fetchMenu = async () => {
        const getMenu = await axios.get('/menus')
        setMenus(await getMenu.data.map(menu => menu.menu))
    }
    const handleMenuSelect = (e) => setSelectMenu(e.target.id)

       

    useEffect(() =>{ fetchMenu()}, [])
    // useEffect(() =>{ console.log(menus);}, [menus]) //------------- test recieved data

// -------------------------------------- menu & product add functions ----------------------------------------------
    const createMenuBtn = (e) => {
        e.preventDefault();
        let menuId = Number(menus.length + 1) * 100
        if (menuName){ 
        let menu = {id: menuId, menu : menuName}
        axios.post('/menus', menu )
        .then((res) => {
           setMenus([...menus,res.data.menu])
        })

        setMenuName('')
        setAddMenu((prev => !prev))
        }
    };
    
    
    const addItem_btn = (e) => {
        e.preventDefault();
        let itemId
        products.filter(product => product.menu === selectMenu).length > 0 ? itemId = (products.filter(product => product.menu === selectMenu).sort().reverse()[0].id) + 1 : itemId = (menus.indexOf(selectMenu) + 1) * 100 + 1
          
        
        
        let item = {
        id: itemId,
        menu : selectMenu,
        name : newItem,
        price : price
        }

    axios.post('/products', item )
    .then((res) => setProducts(prev => [...prev,res.data]))

    setPrice()
    setNewItem()
    setAddItem((prev => !prev))

    }
  


  

return (
// ------------------------------------------------------ Add menu buttons -----------------------------------
    <div className="Aside">
        <div className="edit-menu">
            <div className="edit-menu-left">
                <FontAwesomeIcon onClick={()=> setAddMenu(prev => !prev)} icon={faSquarePlus} size="xl" />
            </div>
            <div className="edit-menu-right" onClick={()=> setAddItem(prev => !prev)}>
                
                <FontAwesomeIcon icon={faMugSaucer} size="xl" />
                <FontAwesomeIcon icon={faUtensils} size="xl" />
            </div>
        </div>
        {addMenu ? 
        // -------------------------------------------------------- hidden add Menu section ----------------------
        <section className="add-menu menu-tag" onSubmit={createMenuBtn}>
            <form >
                <input type="text" value={menuName} onChange={(e) => setMenuName(e.target.value)}/>
                <button>
                    <FontAwesomeIcon onClick={()=> setAddMenu(prev => !prev)} icon={faTrash} size="lg" />
                </button>
                <button type='submit' >
                    <FontAwesomeIcon icon={faSquarePlus} size="lg" />
                </button>
            </form>        
        </section>
        :''}
        {addItem?
        // -------------------------------------------------------- hidden add Item section ---------------------- 
        <section className="add-item menu-tag" onSubmit={addItem_btn}>
            <form >
                <div className="add-item-buttons">
                    <button>
                    <FontAwesomeIcon onClick={()=> setAddMenu(prev => !prev)} icon={faTrash} size="lg" />
                    </button>
                    <button type='submit' >
                    <FontAwesomeIcon icon={faSquarePlus} size="lg" />
                    </button>
                </div>
                <p><label htmlFor="">Item Name</label></p>
                <input type="text" value={newItem} onChange={(e) => setNewItem(e.target.value)}/>
                <p><label htmlFor="">Item Price</label></p>
                <input type="text" value={price} onChange={(e) => setPrice(e.target.value)} pattern="[0-9.]+"/>


            </form>        
        </section>
        :""
        
        }
        {/* ------------------------------------------------------ creates menu select buttons ----------------------------------------- */}
        <div className="menu-container">

        {menus?.map((menu, idx) => 
            idx % 2 === 0 ?    
                <div onClick={handleMenuSelect} className="menu-tag alternate-menu-tag" id={menu} key={idx}>{menu}</div> 
                :
                <div onClick={handleMenuSelect} className="menu-tag" id={menu} key={idx}>{menu}</div>
        )}
        
        </div>
        
    </div>

)

}