import React from "react";
import Head from "next/head";
import Script from "next/script";
import {
  AiFillPlusCircle,
  AiFillMinusCircle,
  AiFillCloseCircle,
} from "react-icons/ai";
import { BsFillBagCheckFill } from "react-icons/bs";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";

const Checkout = ({ cart, clearCart, subTotal, addToCart, removeFromCart }) => {

    const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [address, setAddress] = useState('')
  const [pincode, setPincode] = useState('')
  const [city, setCity] = useState('')
  const [state, setState] = useState('')
  const [disabled, setDisabled] = useState(true)
  const [user, setUser] = useState({value: null})

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('myuser'))
    if(user && user.token){
      setUser(user)
      setEmail(user.email)
    }
  }, [])
  

const handleChange = async(e) => {
  if(e.target.name == 'name'){
    setName(e.target.value)
  }
  else if(e.target.name == 'email'){
    setEmail(e.target.value)
  }
  else if(e.target.name == 'phone'){
    setPhone(e.target.value)
  }
  else if(e.target.name == 'address'){
    setAddress(e.target.value)
  }
  else if(e.target.name == 'Pincode'){
    setPincode(e.target.value)
    if(e.target.value.length == 6){
      let pins = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/pincode`)
      let pinJson = await pins.json()
      if(Object.keys(pinJson).includes(e.target.value)){
        setCity(pinJson[e.target.value][0])
        setState(pinJson[e.target.value][1])
      }
      else{
        setCity('')
        setState('')
      }
    }
    else{
      setCity('')
      setState('')
    }
  }
 
}

  useEffect(() => {
    if(name.length>3 && email.length>3 && phone.length>3 && address.length>3 && pincode.length>3){
      setDisabled(false)
    }
    else{
      setDisabled(true)
    }
  }, [name, email, phone, address, pincode])
  


  const initiatePayment = async () => {
    // let txnToken;
    let oid = Math.floor(Math.random() * Date.now())

    //Get a Transaction token
    const data = { cart, subTotal, oid, email: email, phone, address, name, pincode};
    let a = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/pretransaction`, {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
    let txnRes = await a.json()
    if(txnRes.success){
    let txnToken = txnRes.txnToken

    var config = {
      root: "",
      flow: "DEFAULT",
      data: {
        orderId: oid /* update order id */,
        token: txnToken /* update token value */,
        tokenType: "TXN_TOKEN",
        amount: subTotal /* update amount */,
      },
      handler: {
        notifyMerchant: function (eventName, data) {
          console.log("notifyMerchant handler function called");
          console.log("eventName => ", eventName);
          console.log("data => ", data);
        },
      },
    };

    // initialze configuration using init method
    window.Paytm.CheckoutJS.init(config)
      .then(function onSuccess() {
        // after successfully updating configuration, invoke JS Checkout
        window.Paytm.CheckoutJS.invoke();
      })
      .catch(function onError(error) {
        console.log("error => ", error);
      });
    }
    else{
       console.log(txnRes.error)
       if(txnRes.cartClear){
         clearCart()
       }
       toast.error(txnRes.error, {
        position: "top-center",
        autoClose: 1800,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        });
    }
  };
  return (
    <div className="container px-2 sm:m-auto">
      <ToastContainer
position="top-center"
autoClose={2000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
/>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, height=device-height, initial-scale=1.0, maximum-scale=1.0"
        />
      </Head>
      <Script
        type="application/javascript"
        crossorigin="anonymous"
        src={`${process.env.NEXT_PUBLIC_PAYTM_HOST}/merchantpgpui/checkoutjs/merchants/${process.env.NEXT_PUBLIC_PAYTM_MID}.js`}
      />
      <h1 className="font-bold text-3xl my-8 text-center">Checkout</h1>
       <h2 className="font-semibold text-xl">1. Delivery Details</h2>
       <div className="mx-auto flex my-2">
         <div className="px-2 w-1/2">
           <div className="mb-4">
             <label htmlFor="name" className="leading-7 text-sm text-gray-600">
               Name
             </label>
             <input
            onChange={handleChange}
            value={name}
              type="text"
              id="name"
              name="name"
              className="w-full bg-white rounded border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>
        </div>
        <div className="px-2 w-1/2">
          <div className="mb-4">
            <label htmlFor="email" className="leading-7 text-sm text-gray-600">
              Email
            </label>
            {user && user.token?<input
            value={email}
              type="email"
              id="email"
              name="email"
              className="w-full bg-white rounded border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              readOnly
            /> : <input
            onChange={handleChange}
            value={email}
              type="email"
              id="email"
              name="email"
              className="w-full bg-white rounded border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />}
          </div>
        </div>
      </div>
      <div>
        <div className="px-2 w-full">
          <div className="mb-4">
            <label htmlFor="name" className="leading-7 text-sm text-gray-600">
              Address
            </label>
            <textarea
            onChange={handleChange}
            value={address}
              className="w-full bg-white rounded border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              name="address"
              id="address"
              cols="30"
              rows="2"
            ></textarea>
          </div>
        </div>
      </div>
      <div className="mx-auto flex my-2">
        <div className="px-2 w-1/2">
          <div className="mb-4">
            <label htmlFor="phone" className="leading-7 text-sm text-gray-600">
              Phone
            </label>
            <input
            onChange={handleChange}
            placeholder="Enter your 10 digit phone number"
            value={phone}
              type="phone"
              id="phone"
              name="phone"
              className="w-full bg-white rounded border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>
        </div>
        <div className="px-2 w-1/2">
          <div className="mb-4">
          <label
              htmlFor="Pincode"
              className="leading-7 text-sm text-gray-600"
            >
              Pincode
            </label>
            <input
            onChange={handleChange}
            value={pincode}
              type="text"
              id="Pincode"
              name="Pincode"
              className="w-full bg-white rounded border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>
        </div>
      </div>
      <div className="mx-auto flex my-2">
        <div className="px-2 w-1/2">
          <div className="mb-4">
            <label htmlFor="state" className="leading-7 text-sm text-gray-600">
              State
            </label>
            <input
              onChange={handleChange} 
              value={state}
              type="text"
              id="state"
              name="state"
              className="w-full bg-white rounded border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              readOnly
            />
          </div>
        </div>
        <div className="px-2 w-1/2">
          <div className="mb-4">
          <label htmlFor="city" className="leading-7 text-sm text-gray-600">
              District
            </label>
            <input
              onChange={handleChange} 
            value={city}
              type="text"
              id="city"
              name="city"
              className="w-full bg-white rounded border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              readOnly
            />
           
          </div>
        </div>
      </div>
      <h2 className="font-semibold text-xl">2. Review Your Cart</h2>
      <div className="sidebar  bg-blue-200  p-5 m-3 ">
        <span className="crossb absolute top-3 right-3 cursor-pointer text-2xl text-blue-500">
          <AiFillCloseCircle />
        </span>
        <ol className="list-decimal font-semibold">
          {Object.keys(cart).length == 0 && (
            <div className="my-4">Your Cart is Empty!</div>
          )}
          {Object.keys(cart).map((k) => {
            return (
              <li key={k}>
                <div className="item flex py-4 ">
                  <div className="">
                    {cart[k].name} ({cart[k].size}/{cart[k].variant})
                  </div>
                  <div className="flex items-center justify-center w-1/3  font-semibold text-lg ">
                    <AiFillPlusCircle
                      onClick={() => {
                        addToCart(
                          k,
                          1,
                          cart[k].price,
                          cart[k].name,
                          cart[k].size,
                          cart[k].variant
                        );
                      }}
                      className="text-blue-500 cursor-pointer"
                    />
                    <span className="text-sm mx-2">{cart[k].qty}</span>
                    <AiFillMinusCircle
                      onClick={() => {
                        removeFromCart(
                          k,
                          1,
                          cart[k].price,
                          cart[k].name,
                          cart[k].size,
                          cart[k].variant
                        );
                      }}
                      className="text-blue-500 cursor-pointer"
                    />
                  </div>
                </div>
              </li>
            );
          })}
        </ol>
        <span className="font-bold">Subtotal : ₹{subTotal}</span>
      </div>
      <div className="mx-4">
        <button
          disabled={disabled}
          onClick={initiatePayment}
          className="disabled:bg-blue-300 flex text-white bg-blue-600 border-0 py-2 px-2 focus:outline-none hover:bg-blue-800 rounded text-sm"
        >
          <BsFillBagCheckFill className="mt-0.5" />
          Pay ₹{subTotal}
        </button>
      </div>
    </div>
  );
};

export default Checkout;




// FOR "RAZOR PAY"
// import React from "react";
// import {
//   AiFillPlusCircle,
//   AiFillMinusCircle,
//   AiFillCloseCircle,
// } from "react-icons/ai";
// import { BsFillBagCheckFill } from "react-icons/bs";
// import { useState } from "react";

// const Checkout = ({ cart, subTotal, addToCart, removeFromCart }) => {
//   const [name, setName] = useState('')
//   const [email, setEmail] = useState('')
//   const [phone, setPhone] = useState('')
//   const [address, setAddress] = useState('')
//   const [pincode, setPincode] = useState('')
//   const [city, setCity] = useState('')
//   const [state, setState] = useState('')
//   const [disabled, setDisabled] = useState(true)

// const handleChange = async(e) => {
//   if(e.target.name == 'name'){
//     setName(e.target.value)
//   }
//   else if(e.target.name == 'email'){
//     setEmail(e.target.value)
//   }
//   else if(e.target.name == 'phone'){
//     setPhone(e.target.value)
//   }
//   else if(e.target.name == 'address'){
//     setAddress(e.target.value)
//   }
//   else if(e.target.name == 'Pincode'){
//     setPincode(e.target.value)
//     if(e.target.value.length == 6){
//       let pins = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/pincode`)
//       let pinJson = await pins.json()
//       if(Object.keys(pinJson).includes(e.target.value)){
//         setCity(pinJson[e.target.value][0])
//         setState(pinJson[e.target.value][1])
//       }
//       else{
//         setCity('')
//         setState('')
//       }
//     }
//     else{
//       setCity('')
//       setState('')
//     }
//   }

// setTimeout(() => {
//   if(name.length>3 && email.length>3 && phone.length>3 && address.length>3 && pincode.length>3){
//     setDisabled(false)
//   }
//   else{
//     setDisabled(true)
//   }
// }, 100);

  
// }

//   const initializeRazorpay = () => {
//     return new Promise((resolve) => {
//       const script = document.createElement("script");
//       script.src = "https://checkout.razorpay.com/v1/checkout.js";

//       script.onload = () => {
//         resolve(true);
//       };
//       script.onerror = () => {
//         resolve(false);
//       };

//       document.body.appendChild(script);
//     });
//   };

//   const makePayment = async () => {
//     const res = await initializeRazorpay();

//     if (!res) {
//       alert("Razorpay SDK Failed to load");
//       return;
//     }

//     // Make API call to the serverless API
//     const data = await fetch("/api/razorpay", { method: "POST", subTotal }).then((t) =>
//       t.json()
//     );
//     console.log(data);
//     var options = {
//       key: process.env.RAZORPAY_KEY, // Enter the Key ID generated from the Dashboard
//       name: "Devesh Pvt Ltd",
//       currency: data.currency,
//       amount: subTotal,
//       order_id: data.id,
//       description: "Thankyou Sir for your test donation",
//       image: "/fl.png",
//       handler: function (response) {
//         // Validate payment at server - using webhooks is a better idea.
//         console.log(response.razorpay_payment_id);
//         console.log(response.razorpay_order_id);
//         console.log(response.razorpay_signature);
//       },
//       prefill: {
//         name: "Devesh Purohit",
//         email: "purohitdev@gmail.com",
//         contact: "9876549999",
//       },
//     };

//     const paymentObject = new window.Razorpay(options);
//     paymentObject.open();

//   };
//   return (
//     <div className="container px-2 sm:m-auto">
    
//       <h1 className="font-bold text-3xl my-8 text-center">Checkout</h1>
//       <h2 className="font-semibold text-xl">1. Delivery Details</h2>
//       <div className="mx-auto flex my-2">
//         <div className="px-2 w-1/2">
//           <div className="mb-4">
//             <label htmlFor="name" className="leading-7 text-sm text-gray-600">
//               Name
//             </label>
//             <input
//             onChange={handleChange}
//             value={name}
//               type="text"
//               id="name"
//               name="name"
//               className="w-full bg-white rounded border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
//             />
//           </div>
//         </div>
//         <div className="px-2 w-1/2">
//           <div className="mb-4">
//             <label htmlFor="email" className="leading-7 text-sm text-gray-600">
//               Email
//             </label>
//             <input
//             onChange={handleChange}
//             value={email}
//               type="email"
//               id="email"
//               name="email"
//               className="w-full bg-white rounded border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
//             />
//           </div>
//         </div>
//       </div>
//       <div>
//         <div className="px-2 w-full">
//           <div className="mb-4">
//             <label htmlFor="name" className="leading-7 text-sm text-gray-600">
//               Address
//             </label>
//             <textarea
//             onChange={handleChange}
//             value={address}
//               className="w-full bg-white rounded border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
//               name="address"
//               id="address"
//               cols="30"
//               rows="2"
//             ></textarea>
//           </div>
//         </div>
//       </div>
//       <div className="mx-auto flex my-2">
//         <div className="px-2 w-1/2">
//           <div className="mb-4">
//             <label htmlFor="phone" className="leading-7 text-sm text-gray-600">
//               Phone
//             </label>
//             <input
//             onChange={handleChange}
//             value={phone}
//               type="phone"
//               id="phone"
//               name="phone"
//               className="w-full bg-white rounded border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
//             />
//           </div>
//         </div>
//         <div className="px-2 w-1/2">
//           <div className="mb-4">
//           <label
//               htmlFor="Pincode"
//               className="leading-7 text-sm text-gray-600"
//             >
//               Pincode
//             </label>
//             <input
//             onChange={handleChange}
//             value={pincode}
//               type="text"
//               id="Pincode"
//               name="Pincode"
//               className="w-full bg-white rounded border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
//             />
//           </div>
//         </div>
//       </div>
//       <div className="mx-auto flex my-2">
//         <div className="px-2 w-1/2">
//           <div className="mb-4">
//             <label htmlFor="state" className="leading-7 text-sm text-gray-600">
//               State
//             </label>
//             <input
//               onChange={handleChange} 
//               value={state}
//               type="text"
//               id="state"
//               name="state"
//               className="w-full bg-white rounded border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
//               readOnly
//             />
//           </div>
//         </div>
//         <div className="px-2 w-1/2">
//           <div className="mb-4">
//           <label htmlFor="city" className="leading-7 text-sm text-gray-600">
//               City
//             </label>
//             <input
//               onChange={handleChange} 
//             value={city}
//               type="text"
//               id="city"
//               name="city"
//               className="w-full bg-white rounded border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
//               readOnly
//             />
           
//           </div>
//         </div>
//       </div>
//       <h2 className="font-semibold text-xl">2. Review Your Cart</h2>
//       <div className="sidebar  bg-blue-200  p-5 m-3 ">
//         <span className="crossb absolute top-3 right-3 cursor-pointer text-2xl text-blue-500">
//           <AiFillCloseCircle />
//         </span>
//         <ol className="list-decimal font-semibold">
//           {Object.keys(cart).length == 0 && (
//             <div className="my-4">Your Cart is Empty!</div>
//           )}
//           {Object.keys(cart).map((k) => {
//             return (
//               <li key={k}>
//                 <div className="item flex py-4 ">
//                   <div className="">
//                     {cart[k].name} ({cart[k].size}/{cart[k].variant})
//                   </div>
//                   <div className="flex items-center justify-center w-1/3  font-semibold text-lg ">
//                     <AiFillPlusCircle
//                       onClick={() => {
//                         addToCart(
//                           k,
//                           1,
//                           cart[k].price,
//                           cart[k].name,
//                           cart[k].size,
//                           cart[k].variant
//                         );
//                       }}
//                       className="text-blue-500 cursor-pointer"
//                     />
//                     <span className="text-sm mx-2">{cart[k].qty}</span>
//                     <AiFillMinusCircle
//                       onClick={() => {
//                         removeFromCart(
//                           k,
//                           1,
//                           cart[k].price,
//                           cart[k].name,
//                           cart[k].size,
//                           cart[k].variant
//                         );
//                       }}
//                       className="text-blue-500 cursor-pointer"
//                     />
//                   </div>
//                 </div>
//               </li>
//             );
//           })}
//         </ol>
//         <span className="font-bold">Subtotal : ₹{subTotal}</span>
//       </div>
//       <div className="mx-4">
//         <button
//           disabled={disabled}
//           onClick={makePayment}
//           className="disabled:bg-blue-300 flex text-white bg-blue-500 border-0 py-2 px-2 focus:outline-none hover:bg-blue-600 rounded text-sm"
//         >
//           <BsFillBagCheckFill className="mt-0.5" />
//           Pay ₹{subTotal}
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Checkout;
