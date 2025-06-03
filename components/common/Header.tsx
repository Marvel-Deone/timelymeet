import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { Button } from '../ui/button'
import { PenBox, User } from 'lucide-react'
import { SignedIn, SignedOut, SignInButton } from '@clerk/nextjs'
import UserMenu from '../UserMenu'
import { checkUser } from '@/lib/checkUser'

const Header = async () => {
  await checkUser();

  return (
    <nav className='py-4 px-4 flex mx-auto justify-between items-center shadow-md border-b-2'>
      <Link href={"/"} className='flex items-center'>
        <Image src={"/logo.png"} alt="logo" width={150} height={60} className='h-16 w-auto' />
      </Link>
      <div className='flex items-center gap-4'>
        <Link href={"/events?create=true"}>
          <Button className='flex gap-2 cursor-pointer'>
            <PenBox size={18} /> Create Event
          </Button>
        </Link>
        <SignedOut>
          <SignInButton forceRedirectUrl="/dashboard">
            <Button variant="outline" className=' cursor-pointer'>Login</Button>
          </SignInButton>
        </SignedOut>
        <SignedIn>
          <UserMenu />
        </SignedIn>
      </div>
    </nav>
  )
}

export default Header
