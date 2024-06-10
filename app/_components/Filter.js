"use client"
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import React from 'react';

function Filter() {
    const searchParams = useSearchParams();
    const activeFilter = searchParams.get("maxCapacity");
    const router = useRouter();
    const pathName = usePathname();

    function handleFilter(filter) {
        const params = new URLSearchParams(searchParams);
        params.set("maxCapacity", filter);
        router.replace(`${pathName}?${params.toString()}`);
    }

    return (
        <div className='border border-primary-800 flex'>
            <Button filter={'all'} handleFilter={handleFilter} activeFilter={activeFilter} className='px-5 py-2 hover:bg-primary-700'>
                All cabins
            </Button>
            <Button filter={'small'} handleFilter={handleFilter} activeFilter={activeFilter} className='px-5 py-2 hover:bg-primary-700'>
                Small
            </Button>
            <Button filter={'medium'} handleFilter={handleFilter} activeFilter={activeFilter} className='px-5 py-2 hover:bg-primary-700'>
                Medium
            </Button>
            <Button filter={'large'} handleFilter={handleFilter} activeFilter={activeFilter} className='px-5 py-2 hover:bg-primary-700'>
                Large
            </Button>
        </div>
    );
}

function Button({ activeFilter, filter, handleFilter, children }) {
    return (
        <button
            className={`px-5 py-2 hover:bg-primary-700 ${filter === activeFilter ? "text-primary-50 bg-primary-700" : ""}`}
            onClick={() => handleFilter(filter)}
        >
            {children}
        </button>
    );
}

export default Filter;
