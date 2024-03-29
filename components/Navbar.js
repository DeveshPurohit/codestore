import Image from "next/image";
import React from "react";
import Link from "next/link";
import { useState } from "react";
import {
  AiOutlineShoppingCart,
  AiFillPlusCircle,
  AiFillMinusCircle,
  AiFillCloseCircle,
} from "react-icons/ai";
import { BsFillBagCheckFill } from "react-icons/bs";
import { MdAccountCircle } from "react-icons/md";
import { useRef } from "react";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { route } from "next/dist/server/router";

const Navbar = ({
  logout,
  cart,
  addToCart,
  user,
  removeFromCart,
  clearCart,
  subTotal,
}) => {
  // console.log(cart , addToCart , removeFromCart , clearCart , subTotal)
  const [dropdown, setDropdown] = useState(false);
  const [sidebar, setSidebar] = useState(false)
  const router = useRouter()

  useEffect(() => {
    Object.keys(cart).length !== 0 && setSidebar(true)
    const exempted = ['/order', '/orders', '/checkout', '/']
    if(exempted.includes(router.pathname)){
      setSidebar(false)
    }
  }, [])
  

  const toggleCart = () => {
    setSidebar(!sidebar)
  };
  const ref = useRef();
  return (
    <>
    {!sidebar && <span onMouseOver={()=>{setDropdown(true)}}
          onMouseLeave={()=>{setDropdown(false)}} className="fixed z-30 top-3 right-12  cursor-pointer">
          {dropdown && 
            <div className="bg-blue-200 z-30 absolute py-4 px-5 text-sm  top-6 right-4  w-32 rounded-md">
              <ul>
                <Link href={'/myAccount'}><a><li className="py-1 hover:text-blue-700 font-bold">My Account</li></a></Link>
                <Link href={'/orders'}><a><li className="py-1 hover:text-blue-700 font-bold">Orders</li></a></Link>
                <li  onClick={logout}  className="py-1 hover:text-blue-700 font-bold">Logout</li>
              </ul>
            </div>
          }
           
        {user.value && (
          <MdAccountCircle
            className=" text-xl md:text-2xl mx-2"
          />
        )}
        </span>}
    <div className={`flex flex-col md:flex-row md:items-start z-10 bg-white items-center justify-start py-3 mb-10 shadow-md sticky top-0 ${!sidebar && 'overflow-hidden'}`}>
      <div className="logo md:mx-5 mx-8 mr-auto">
        <Link href={"/"}>
          <a>
            <Image src={"/fl.png"} height={30} width={165} alt={"logo"} />
          </a>
        </Link>
      </div>
      <div className="nav">
        <ul className="flex items-center text-lg space-x-6 font-semibold ">
          <Link href={"/tshirt"}>
            <a>
              <li className="hover:text-blue-500">Tshirts</li>
            </a>
          </Link>
          <Link href={"/hoodies"}>
            <a>
              <li className="hover:text-blue-500">Hoodies</li>
            </a>
          </Link>
          <Link href={"/stickers"}>
            <a>
              <li className="hover:text-blue-500">Stickers</li>
            </a>
          </Link>
          <Link href={"/mugs"}>
            <a>
              <li className="hover:text-blue-500">Mugs</li>
            </a>
          </Link>
        </ul>
      </div>
      <div className="flex space-x-2 items-center cursor-pointer cart absolute right-0 mx-5">
        
        {!user.value && (
          <Link href={"/login"}>
            <a className="bg-blue-500 rounded-md text-sm py-1 px-2 mx-2  text-white">
              Login
            </a>
          </Link>
        )}
        <AiOutlineShoppingCart
          onClick={toggleCart}
          className="text-xl md:text-2xl"
        />
      </div>
      <div
        ref={ref}
        className={`sidebar w-64 h-[100vh] overflow-y-scroll absolute top-0  bg-blue-200  px-8 py-10 transition-all ${
          sidebar ? "right-0" : "-right-64"
        }`}
      >
        <span
          onClick={toggleCart}
          className="crossb absolute top-3 right-3 cursor-pointer text-2xl text-blue-500"
        >
          <AiFillCloseCircle />
        </span>
        <h2 className="font-bold text-xl">Shopping Cart</h2>
        <ol className="list-decimal font-semibold">
          {Object.keys(cart).length == 0 && (
            <div className="my-4">Your Cart is Empty!</div>
          )}
          {Object.keys(cart).map((k) => {
            return (
              <li key={k}>
                <div className="item flex py-4 ">
                  <div className="w-2/3 ">
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
        <div className="font-bold my-2">Subtotal : ₹{subTotal}</div>
        <div className="flex">
          <Link href={"/checkout"}>
            <button disabled={Object.keys(cart).length == 0} className="disabled:bg-blue-300 flex text-white bg-blue-500 border-0 py-2 px-2 focus:outline-none hover:bg-blue-600 rounded text-sm">
              <BsFillBagCheckFill className="mt-0.5" />
              Checkout
            </button>
          </Link>
          <button
            disabled={Object.keys(cart).length == 0}
            onClick={clearCart}
            className="disabled:bg-blue-300 flex mx-3 text-white bg-blue-500 border-0 py-2 px-2 focus:outline-none hover:bg-blue-600 rounded text-sm"
          >
            ClearCart
          </button>
        </div>
      </div>
    </div>
    </>
  );
};

export default Navbar;
