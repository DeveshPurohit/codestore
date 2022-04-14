import React from "react";

const Checkout = () => {
  return (
    <div className="container m-auto">
      <h1 className="font-bold text-3xl my-8 text-center">Checkout</h1>
      <h2 className="font-semibold text-xl">1. Delivery Details</h2>
      <div className="mx-auto flex my-4">
        <div className="px-2 w-1/2">
        <div className="mb-4">
            <label htmlFor="name" className="leading-7 text-sm text-gray-600">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>
        </div>
        <div className="px-2 w-1/2">
        <div className="mb-4">
            <label htmlFor="email" className="leading-7 text-sm text-gray-600">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>
        </div>
      </div>
      <div>
      <div className="px-2 w-full">
        <div className="mb-4">
            <label htmlFor="name" className="leading-7 text-sm text-gray-600">
              Address
            </label>
            <textarea className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" name="address" id="" cols="30" rows="2"></textarea>
          </div>
        </div>
      </div>
      <div className="mx-auto flex my-4">
        <div className="px-2 w-1/2">
        <div className="mb-4">
            <label htmlFor="phone" className="leading-7 text-sm text-gray-600">
              Phone
            </label>
            <input
              type="phone"
              id="phone"
              name="phone"
              className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>
        </div>
        <div className="px-2 w-1/2">
        <div className="mb-4">
            <label htmlFor="city" className="leading-7 text-sm text-gray-600">
              City
            </label>
            <input
              type="text"
              id="city"
              name="city"
              className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>
        </div>
      </div>
      <div className="mx-auto flex my-4">
        <div className="px-2 w-1/2">
        <div className="mb-4">
            <label htmlFor="state" className="leading-7 text-sm text-gray-600">
              State
            </label>
            <input
              type="text"
              id="state"
              name="state"
              className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>
        </div>
        <div className="px-2 w-1/2">
        <div className="mb-4">
            <label htmlFor="Pincode" className="leading-7 text-sm text-gray-600">
              Pincode
            </label>
            <input
              type="text"
              id="Pincode"
              name="Pincode"
              className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
