'use client'

import { Button } from '@/components/ui/button'
import { HomePageFilters } from '@/constants/filters'
import { formUrlQuery } from '@/lib/utils'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'

const HomeFilters = () => {
    const searchParams = useSearchParams();
    const router = useRouter();

    const [active, setActive] = useState('')

    const handleTypeClick = (item: string) => {
        if(active === item) {
            setActive("")
            const newUrl = formUrlQuery({
                params: searchParams.toString(),
                key: 'filter',
                value: null
            });

            router.push(newUrl, { scroll: false });
        } else {
            setActive(item)
            const newUrl = formUrlQuery({
                params: searchParams.toString(),
                key: 'filter',
                value: item.toLowerCase()
            });
            router.push(newUrl, { scroll: false });
        } 
    }



    return (
        <div className='mt-10 flex-wrap gap-3 md:flex hidden'>
            {HomePageFilters.map((item) => (
                <Button 
                    key={item.value} 
                    onClick={() => handleTypeClick(item.value)}
                    className={`body-medium rounded-lg px-6 py-3 capitalize shadow-none ${active === item.value ? 'bg-primary-100 text-primary-500 hover:bg-primary-100 dark:bg-dark-400 dark:text-primary-500 dark:hover:bg-dark-400' : 'bg-light-800 text-light-500 hover:bg-light-800 dark:bg-dark-300 dark:text-light-500 dark:hover:bg-dark-300'}`}>
                    {item.name}
                </Button>
            ))}
        </div>
    )
}

export default HomeFilters