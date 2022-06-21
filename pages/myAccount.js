import { data } from 'autoprefixer';
import { useRouter } from 'next/router'
import React from 'react'
import { useEffect, useState } from 'react'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const MyAccount = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [address, setAddress] = useState('')
  const [pincode, setPincode] = useState('')
  const [city, setCity] = useState('')
  const [state, setState] = useState('')
  const [disabled, setDisabled] = useState(true)
  const [user, setUser] = useState({value: null})
  const [password, setPassword] = useState('')
  const [cpassword, setCPassword] = useState('')
  const [npassword, setNPassword] = useState('')
  
  const router = useRouter()
  useEffect(() => {
    const myuser = JSON.parse(localStorage.getItem('myuser'))
    if(myuser && myuser.token){
      setUser(myuser)
      setEmail(myuser.email)
      fetchUser(myuser.token)
    }
    if(!user){
      router.push('/')
    }
  }, [router])

  const handleChange = async(e) => {
    if(e.target.name == 'name'){
      setName(e.target.value)
    }
    else if(e.target.name == 'password'){
      setPassword(e.target.value)
    }
    else if(e.target.name == 'cpassword'){
      setCPassword(e.target.value)
    }
    else if(e.target.name == 'npassword'){
      setNPassword(e.target.value)
    }
    else if(e.target.name == 'phone'){
      setPhone(e.target.value)
    }
    else if(e.target.name == 'address'){
      setAddress(e.target.value)
    }
    else if(e.target.name == 'Pincode'){
      setPincode(e.target.value)
    }
   
  }

  const fetchUser = async(token) => {
    let data = {token: token}
    let a = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/getuser`, {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
    let res = await a.json()
    console.log(res)
    setName(res.name)
    setAddress(res.address)
    setPhone(res.phone)
    setPincode(res.pincode)
  }
  const handleUserSubmit = async() => {
    let data = {token: user.token, name, pincode, address, phone}
    let a = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/updateuser`, {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
    let res = await a.json()
    console.log(res)
    toast.success('Successfully Updated!', {
      position: "top-center",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      });
  }
  const handlePasswordSubmit = async() => {
    let res;
    if(npassword == cpassword){
      let data = {token: user.token, password, npassword, cpassword}
    let a = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/updatepassword`, {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
   res = await a.json()
    }
    else{
      res = {success: false}
    }
    if(res.success){
      toast.success('Successfully Updated Password!', {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        });
    }
    else{
      toast.error('Error in Updating Password!', {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        });
    }
    setCPassword('')
    setNPassword('')
    setPassword('')
    
  }

  return (
    <div className='min-h-screen container mx-auto'>
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
      <h1 className="text-3xl text-center font-bold">Update Your Account</h1>
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
              Email (cannot be changed)
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
      <div className="mx-2 mb-8">
        <button
          onClick={handleUserSubmit}
          className="flex text-white bg-blue-600 border-0 py-2 px-2 focus:outline-none hover:bg-blue-800 rounded text-sm"
        >
          Submit
        </button>
      </div>
      <h2 className="font-semibold text-xl">2. Change Password</h2>
       <div className="mx-auto flex my-2">
         <div className="px-2 w-1/2">
           <div className="mb-4">
             <label htmlFor="password" className="leading-7 text-sm text-gray-600">
               Password
             </label>
             <input
            onChange={handleChange}
            value={password}
              type="password"
              id="password"
              name="password"
              className="w-full bg-white rounded border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>
        </div>
        
        <div className="px-2 w-1/2">
          <div className="mb-4">
            <label htmlFor="npassword" className="leading-7 text-sm text-gray-600">
            New Password
            </label>
            <input
            onChange={handleChange}
            value={npassword}
              type="password"
              id="npassword"
              name="npassword"
              className="w-full bg-white rounded border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>
        </div>
        <div className="px-2 w-1/2">
          <div className="mb-4">
            <label htmlFor="cpassword" className="leading-7 text-sm text-gray-600">
            Confirm New Password
            </label>
            <input
            onChange={handleChange}
            value={cpassword}
              type="password"
              id="cpassword"
              name="cpassword"
              className="w-full bg-white rounded border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>
        </div>
      </div>
      <div className="m-2">
        <button
        onClick={handlePasswordSubmit}
          className="flex text-white bg-blue-600 border-0 py-2 px-2 focus:outline-none hover:bg-blue-800 rounded text-sm"
        >
          Submit
        </button>
      </div>
    </div>
  )
}

export default MyAccount