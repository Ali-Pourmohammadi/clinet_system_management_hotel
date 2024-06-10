import Navigation from '@/starter/components/Navigation'
import React from 'react'
import Logo from './Logo'

function Header() {
  return (
    <header className='border-b border-primary-900 px-8 py-5' >
        <div className='flex justify-between items-center    mx-auto w-full'>
        <Logo/>
        <Navigation/>
        </div>

    </header>    
  )
}

export default Header
