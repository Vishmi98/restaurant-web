"use client"

import React, { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { CgClose } from 'react-icons/cg'

import { MobileNavProps } from '@/constants/types'
import { NAV_ITEMS } from '@/constants/data'


const MobileNav = ({ closeNav, showNav }: MobileNavProps) => {
  const navOpen = showNav ? "translate-x-0" : "translate-x-[-100%]"

  return (
    <div>
      {/* Overlay */}
      <div onClick={closeNav} className={`fixed ${navOpen} inset-0 transform transition-all duration-500 z-[1006] bg-black opacity-70 w-full h-screen`}>
      </div>

      {/* NavLinks */}
      <div className={`${navOpen} fixed justify-center flex flex-col h-full transform transition-all duration-500 delay-300 w-[80%] sm:w-[60%] bg-primary space-y-6 z-[1050]`}>
        {NAV_ITEMS.map((link) => {
          return (
            <Link key={link.label} href={link.href} onClick={closeNav}>
              <p className="relative text-secondary text-base font-medium lg:text-xl ml-12 capitalize w-fit block after:block after:content-[''] after:absolute after:h-[2px] after:bg-[#B4975E] after:w-full after:scale-x-0 hover:after:scale-x-100 after:transition after:duration-300 after:origin-right after:bottom-[-2] after:left-0">
                {link.label}
              </p>
            </Link>
          )
        })}

        <div className="ml-12">
          <Link
            href="/menu"
            onClick={closeNav}
            className={`uppercase px-5 py-2 text-sm font-medium border-2 transition-all duration-300 cursor-pointer border-white hover:bg-white hover:text-black `}
          >
            Order Online
          </Link>
        </div>
        {/* Close Icon */}
        <CgClose onClick={closeNav} className='absolute top-[0.7rem] right-[1.4rem] w-6 h-6' />
      </div>
    </div>
  )
}

export default MobileNav