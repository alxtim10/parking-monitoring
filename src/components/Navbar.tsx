import { User } from 'lucide-react'
import React from 'react'

const Navbar = () => {
    return (
        <nav>
            <div className='flex items-center gap-2'>
                <User className='w-10 h-10 bg-mainColor text-white rounded-full p-2' />
                <div className='flex flex-col'>
                    <h1 className='text-md font-bold'>Hi, Adib Jawir</h1>
                    <h1 className='text-sm'>Where you wanna park today?</h1>
                </div>
            </div>
        </nav>
    )
}

export default Navbar