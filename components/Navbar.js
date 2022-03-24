import Image from 'next/image'
import React from 'react'
import Link from 'next/link'
import { AiOutlineShoppingCart } from 'react-icons/ai';

const Navbar = () => {
  return (
    <div className='flex flex-col md:flex-row md:items-start items-center justify-start py-3'>
      <div className="logo mx-5">
        <Image src={'/logo.png'} height={30} width={160} alt={'logo'} />
      </div>
      <div className="nav">
        <ul className="flex items-center space-x-5 font-bold ">
          <Link href={'/'}><a><li>Tshirts</li></a></Link>
          <Link href={'/'}><a><li>Hoodies</li></a></Link>
          <Link href={'/'}><a><li>Stickers</li></a></Link>
          <Link href={'/'}><a><li>Mugs</li></a></Link>
        </ul>
      </div>
      <div className="cart absolute right-0 mx-5 font">
      <AiOutlineShoppingCart className='text-xl md:text-3xl'/>
      </div>
    </div>
  )
}

export default Navbar