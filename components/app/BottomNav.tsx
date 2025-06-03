import { nav_items } from '@/lib/consts/navigation'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

const BottomNav = () => {
    const pathname = usePathname();

    return (
        <nav className='md:hidden fixed bottom-0 left-0 right-0 bg-white shadow-md'>
            <ul className='flex justify-around'>
                {nav_items.map((item) => (
                    <li key={item.href}>
                        <Link href={item.href} className={`flex flex-col items-center pu-2 px-4 ${pathname === item.href ? "text-blue-600" : "text-gray-600"}`}>
                            <item.icon className='w-5 h-5' />
                            {item.label}
                        </Link>
                    </li>
                ))}
            </ul>
        </nav>
    )
}

export default BottomNav
