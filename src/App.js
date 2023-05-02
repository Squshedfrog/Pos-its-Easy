import './App.css';
import { Routes , Route , Link } from 'react-router-dom';
import HomePage from './pages/HomePage';
import Navbar from './components/Navbar';
import { auth } from './firebase';
import { useAuthState } from "react-firebase-hooks/auth";
import OrdersPage from './pages/OrdersPage';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import WelcomePage from './pages/WelcomePage';


function App() {
  const [user] = useAuthState(auth)
 
  
    
  return (
    
    <>
      <Navbar user={user}/>  
      <ToastContainer 
            // toastStyle={{ 
            //   backgroundColor: "#f1ba91" 
              
            // }}
            className='toast-message'
            position="top-center"
            autoClose={false}
            newestOnTop
            closeOnClick
            onClick={() => console.log('test')}
            rtl={false}
            pauseOnFocusLoss
            draggable={false}
         
            
            
         />
        <Routes>
          <Route path="/" element={user ? <HomePage user={user}/> : <WelcomePage />  }/>
          <Route path="/orders" element={ user ? <OrdersPage user={user}/> : <WelcomePage />   }/>
        </Routes> 
 
    
    
    </>
  );
}

export default App;
