import Image from 'next/image'
import React from 'react'
import Link from 'next/link'
import { AiOutlineShoppingCart } from 'react-icons/ai';

const Navbar = () => {
  return (
    <div className='flex flex-col md:flex-row md:items-start items-center justify-start py-3 mb-10 shadow-md'>
      <div className="logo mx-5">
        <Link href={'/'}><a><Image src={'/logo.png'} height={30} width={160} alt={'logo'} /></a></Link>
      </div>
      <div className="nav">
        <ul className="flex items-center text-md space-x-5 font-bold ">
          <Link href={'/tshirt'}><a><li>Tshirts</li></a></Link>
          <Link href={'/hoodies'}><a><li>Hoodies</li></a></Link>
          <Link href={'/stickers'}><a><li>Stickers</li></a></Link>
          <Link href={'/mugs'}><a><li>Mugs</li></a></Link>
        </ul>
      </div>
      <div className="cart absolute right-0 mx-5 font">
      <AiOutlineShoppingCart className='text-xl md:text-3xl'/>
      </div>
    </div>
  )
}

export default Navbar