'use client'

import React from 'react'

import Image from 'next/image'

import Link from 'next/link'
import { SignedIn, SignedOut } from '@clerk/nextjs'
import { Button } from '@/components/ui/button'
import { sidebarLinks } from '@/constants'
import { usePathname } from 'next/navigation'

const LeftSidebarContent = () => {
    const pathname = usePathname()

    return (
        <section className='flex flex-1 flex-col gap-6'>
            {sidebarLinks.map((item) => {
                const isActive = (pathname.includes(item.route) && item.route.length > 1) || pathname === item.route

                return ( 
                    <div key={item.route}> 
                        <Link
                            href={item.route}
                            className={`${isActive ? 'primary-gradient rounded-lg text-light-900' : 'text-dark300_light900'} 
                            flex items-center justify-start gap-4 p-4 bg-transparent`}
                        >
                            <Image 
                                src={item.imgURL}
                                alt={item.label}
                                width={20}
                                height={20}
                                className={`${isActive ? '' : 'invert-colors'}`}
                            />
                            <p
                                className={`${isActive ? 'base-bold' : 'base-medium'} block md:hidden lg:block`}
                            >{item.label}</p>
                        </Link>
                    </div> 
                )
            })}
        </section>
    )
}


const LeftSidebar = () => {


    
  return (
    <section className='background-light900_dark200 light-border h-screen flex flex-col sticky left-0 top-0 justify-between overflow-y-auto border-r p-6 pt-36 shadow-light-300 dark:shadow-none max-sm:hidden lg:w-[266px] custom-scrollbar'>
        <LeftSidebarContent />

        <SignedOut>
            <div className='flex flex-col gap-3'>
                <Link href="/sign-in">
                    <Button className='small-medium btn-secondary min-h-[41px] w-full rounded-lg px-4 py-3 shadow-none'>
                        <span className='primary-text-gradient lg:block md:hidden'>Log In</span>
                        <Image 
                            src="/assets/icons/user.svg" 
                            alt="Log In"
                            width={20}
                            height={20}
                            className='lg:hidden block'
                        />
                    </Button>
                </Link>

                <Link href="/sign-up">
                    <Button className='small-medium light-border-2 btn-tertiary min-h-[41px] w-full rounded-lg px-4 py-3 shadow-none text-dark400_light900'>
                        <span className='lg:block md:hidden'>Sign Up</span>
                        <Image 
                            src="/assets/icons/sign-up.svg" 
                            alt="Sign Up"
                            width={20}
                            height={20}
                            className='lg:hidden block'
                        />
                    </Button>
                </Link>
            </div>
        </SignedOut>
    </section>
  )
}

export default LeftSidebar