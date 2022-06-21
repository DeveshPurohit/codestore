import React, { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

function Forgot() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [cpassword, setCpassword] = useState('')
  
  useEffect(() => {
    if(localStorage.getItem('token')){
      router.push('/')
    }
  }, [router])

  const handleChange = async(e) => {
    if(e.target.name == 'password'){
      setPassword(e.target.value)
    }
    else if(e.target.name == 'cpassword'){
      setCpassword(e.target.value)
    }
    else if(e.target.name == 'email'){
      setEmail(e.target.value)
    }
   
  }
  

  const sendResetEmail = async() =>{
    let data = {
      email,
      sendMail: true
    }
    let a = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/forgot`, {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
    let res = await a.json()
    if(res.success){
      console.log("reset email sent")
    }
    else{
      console.log("error")
    }
  }

  const setNewPassword = async() =>{
    if(password == cpassword){
      let data = {
      password,
      sendMail: false
    }
    let a = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/forgot`, {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
    let res = await a.json()
    if(res.success){
      console.log("password changed")
    }
    else{
      console.log("error")
    }}
  }

  return (
    <div>
      <div className="min-h-screen flex items-start justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div>
            <img
              className="mx-auto h-10 w-auto"
              src={"/fl.png"}
              alt="Workflow"
            />
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              Forgot Password
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              Or
              <Link href={"/login"}>
                <a
                  href="#"
                  className="font-medium text-blue-600 hover:text-blue-500"
                >
                  {" "}
                  Login{" "}
                </a>
              </Link>
            </p>
          </div>
          {router.query.token && <form className="mt-8 space-y-6" action="#" method="POST">
            <input type="hidden" name="remember" value="true" />
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <label htmlFor="email-address" className="sr-only">
                  New Password
                </label>
                <input
                onChange={handleChange}
                value={password}
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="password"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                  placeholder="New Password"
                />
              </div>
              <div>
                <label htmlFor="email-address" className="sr-only">
                  Confirm Password
                </label>
                <input
                onChange={handleChange}
                value={cpassword}
                  id="cpassword"
                  name="cpassword"
                  type="password"
                  autoComplete="cpassword"
                  required
                  className="mt-4 appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                  placeholder="Confirm Password"
                />
              </div>
              
            </div>

            <div className="flex items-center justify-between">
              

             
            </div>

            <div>
              <button
              onClick={setNewPassword}
              disabled={password !== cpassword}
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
                disabled:bg-blue-400"
              >
                <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                  <svg
                    className="h-5 w-5 text-blue-500 group-hover:text-blue-400"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </span>
                Set New Password
              </button>
            </div>
            {password !== cpassword && "Password does not match!"}
            {password && password === cpassword && "Password match!"}
          </form>}
          {!router.query.token && 
          <form className="mt-8 space-y-6" action="#" method="POST">
            <input type="hidden" name="remember" value="true" />
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <label htmlFor="email-address" className="sr-only">
                  Email address
                </label>
                <input
                onChange={handleChange}
                  id="email"
                  value={email}
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                  placeholder="Email address"
                />
              </div>
              
            </div>

            <div className="flex items-center justify-between">
              

             
            </div>

            <div>
              <button
                onClick={sendResetEmail}
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                  <svg
                    className="h-5 w-5 text-blue-500 group-hover:text-blue-400"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </span>
                Send Reset Email
              </button>
            </div>
          </form>}
        </div>
      </div>
    </div>
  )
}

export default Forgot