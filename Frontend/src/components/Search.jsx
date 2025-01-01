import React, { useEffect, useState } from 'react';
import { IoSearch } from "react-icons/io5";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { TypeAnimation } from 'react-type-animation';
import { FaArrowLeft } from "react-icons/fa6";
import useMobile from '../hooks/useMobile';

const Search = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [isSearchPage, setIsSearchPage] = useState(false);
    const [isMobile] = useMobile();
    const params = useLocation();
    
    const searchText = params.search.slice(3);

    const redirectToSearchPage = () => {
        navigate('/search');
    }

    useEffect(() => {
        const isSearch = location.pathname === "/search";
        setIsSearchPage(isSearch);
    }, [location])

    function handleChange(e){
        const value = e.target.value;
        const url = `/search?q=${value}`
        navigate(url);
    }

  return (
    <div className='w-full min-w-[300px] lg:min-w-[400px] h:11 lg:h-12 border overflow-hidden rounded flex items-center text-neutral-700 bg-slate-50 group focus-within:border-primary-200'>
        <div>
            {
                !(isSearchPage && isMobile) ?
                (<button className='flex justify-center items-center h-full p-3 group-focus-within:text-primary-200 '>
                    <IoSearch size={22}/>
                </button>) :
                (<Link to={'/'} className='flex justify-center items-center h-full p-3 group-focus-within:text-primary-200 bg-white'>
                    <FaArrowLeft size={22}/>
                </Link>)
}
        </div>

        <div className='w-full h-full'>
            {
                !isSearchPage ? (
                    <div onClick={redirectToSearchPage} className='w-full h-full flex items-center'>
                        <TypeAnimation
                            sequence={[
                                // Same substring at the start will only be typed out once, initially
                                'Search "milk"',
                                1000, // wait 1s before replacing "Mice" with "Hamsters"
                                'Search "bread"',
                                1000,
                                'Search "rice"',
                                1000,
                                'Search "egg"',
                                1000,
                                'Search "butter"',
                                1000,
                                'Search "Cheese"',,
                                1000,
                                'Search "oil"',
                                1000,
                            ]}
                            wrapper="span"
                            speed={50}
                            repeat={Infinity}
                        />
                    </div>
                ) : (
                    <div className='w-full h-full'>
                        <input 
                            type="text"
                            placeholder='Search for atta dal and sabji'
                            defaultValue={searchText} 
                            autoFocus
                            className='w-full h-full outline-none'
                            onChange={handleChange} 
                        />
                    </div>
                )
            }
        </div>

        
    </div>
  )
}

export default Search