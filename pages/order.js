import { useRouter } from 'next/router'
import React from 'react'
import Order from "../models/Order";
import mongoose from "mongoose";

const Order1 = ({order}) => {
  console.log(order)
  const products = order.products
  console.log(products)
  return (
    <div>
      <section className="text-gray-600 body-font overflow-hidden">
  <div className="container px-5 py-10 mx-auto">
    <div className="lg:w-4/5 mx-auto flex flex-wrap">
      <div className="lg:w-1/2 w-full lg:pr-10 lg:py-6 mb-6 lg:mb-0">
        <h2 className="text-sm title-font text-gray-500 tracking-widest">CodeStore.com</h2>
        <h1 className="text-gray-900 text-3xl title-font font-medium mb-4">Order Id - {order.orderId}</h1>
        <p className="leading-relaxed mb-4">Yayy! Your order has been successfully placed.</p>
        <p > Your Payment status is : <strong>{order.status}</strong></p>
        <div className="flex my-4">
          <a className="flex-grow text-center border-b-2 border-gray-300 py-2 text-lg px-1">Description</a>
          <a className="flex-grow text-center border-b-2 border-gray-300 py-2 text-lg px-1">Quantity</a>
          <a className="flex-grow text-center border-b-2 border-gray-300 py-2 text-lg px-1">Price</a>
        </div>

       {Object.keys(products).map((key) => {
         return <div key={key} className="flex border-t border-gray-200 py-2">
         <span className="text-gray-500">{products[key].name} ({products[key].size}/{products[key].variant})</span>
         <span className="ml-auto text-gray-900">{products[key].qty}</span>
         <span className="ml-auto text-gray-900">₹{products[key].price}</span>
       </div>
       }) }

        <div className="flex my-8">
          <span className="tite-font font-medium text-2xl text-gray-900">SubTotal : ₹{order.amount}</span> 
        </div>
       <div className="my-6">
       <button className="flex text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded">Track Order</button></div>
      </div>
      <img alt="ecommerce" className=" w-full lg:w-1/3  lg:h-auto h-full object-cover object-center rounded" src="/demo.jpeg"/>
    </div>
  </div>
</section>
    </div>
  )
}

export async function getServerSideProps(context) {
  if (!mongoose.connections[0].readyState) {
    await mongoose.connect(process.env.MONGO_URI);
  }

  let order = await Order.findById(context.query.id);

  return {
    props: { order: JSON.parse(JSON.stringify(order)) }, // will be passed to the page component as props
  };
}

export default Order1