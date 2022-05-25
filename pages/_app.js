import '../styles/globals.css'
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { useState , useEffect } from 'react';
import { useRouter } from 'next/router'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoadingBar from 'react-top-loading-bar'

function MyApp({ Component, pageProps }) {
  const [progress, setProgress] = useState(0)
  const [cart, setCart] = useState({})
  const [subTotal, setSubTotal] = useState(0)
  const [user, setUser] = useState({value: null})
  const [key, setKey] = useState( 0)
  const router = useRouter()

  const logout = () => {
    localStorage.removeItem('token')
    setUser({value: null})
    setKey(Math.random())
    router.push('/')
    toast.success('Your Account has been Logged Out!', {
      position: "top-center",
      autoClose: 500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      });
    }

  useEffect(() => {
    router.events.on('routeChangeStart', () => {
      setProgress(45)
    })
    router.events.on('routeChangeComplete', () => {
      setProgress(100)
    })
    try {
      if(localStorage.getItem("cart")){
        setCart(JSON.parse(localStorage.getItem("cart")))
        saveCart(JSON.parse(localStorage.getItem("cart")))
      }
    } catch (error) {
      localStorage.clear()
    }
    const token = localStorage.getItem('token')
    if(token){
      setUser({value: token})
    }
    setKey(Math.random())
  }, [router.query])
  

  const  saveCart = (myCart) =>{
    localStorage.setItem("cart" , JSON.stringify(myCart))
    let subt=0;
    let keys = Object.keys(myCart)
    for (let i = 0; i<keys.length; i++) {
      subt += myCart[keys[i]].price * myCart[keys[i]].qty;
    }
    setSubTotal(subt)
  }

  const addToCart = (itemCode , qty , price , name , size , variant) =>{
    let newCart = cart;
    if(itemCode in cart){
      newCart[itemCode].qty = cart[itemCode].qty + qty
    }
    else{
      newCart[itemCode] =  { qty: 1 , price , name , size , variant}
    }
    setCart(newCart)
    saveCart(newCart)
  }

  const buyNow = (itemCode , qty , price , name , size , variant) =>{
    saveCart({})
    let newCart = {}
    newCart[itemCode] = { qty: 1 , price , name , size , variant}
    setCart(newCart)
    saveCart(newCart)
    router.push('/checkout')
  }

  const clearCart = () =>{
    setCart({})
    saveCart({})
  }

  const removeFromCart = (itemCode , qty , price , name , size , variant) =>{
    let newCart = cart;
    if(itemCode in cart){
      newCart[itemCode].qty = cart[itemCode].qty - qty
    }
    if(newCart[itemCode].qty<=0){
      delete newCart[itemCode]
    }
    setCart(newCart)
    saveCart(newCart)
  }

  return <>
    <ToastContainer
position="top-center"
autoClose={1000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
/>
<LoadingBar
        color='#3482F6'
        progress={progress}
        waitingTime={300}
        onLoaderFinished={() => setProgress(0)}
      />
    {key && <Navbar logout={logout} user={user} key={key} cart={cart} addToCart={addToCart} removeFromCart={removeFromCart} clearCart={clearCart} subTotal={subTotal} />}
    <Component buyNow={buyNow} cart={cart} addToCart={addToCart} removeFromCart={removeFromCart} clearCart={clearCart} subTotal={subTotal}  {...pageProps} />
    <Footer/>
  </>
}

export default MyApp
