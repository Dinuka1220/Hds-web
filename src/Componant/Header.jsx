import React from 'react';
import { NavbarMenu } from '../mockData/data';
import { CiSearch } from "react-icons/ci";
import { FaShoppingCart } from "react-icons/fa";
import { FaDumbbell } from "react-icons/fa";
import { IoMdMenu } from "react-icons/io";
import ResponsiveMenu from './ResponsiveMenu.jsx';

const Header = () => {
    const [open, setopen] =React.useState(false);
    return (
        <div className="w-[90%] bg-white bg-opacity-30 shadow-md fixed top-0  mt-5 rounded-[50px] left-1/2 -translate-x-1/2 z-50">
        <div className="flex justify-between items-center py-4 px-6 w-full">

                {/* Logo Section */}
                <div className="text-2xl flex items-center gap-2 font-bold uppercase 2xl:mr-50">
                    {/*<FaDumbbell />*/}
                    <h3 className='text-black ml-5'>HDS</h3>

                </div>

                {/* Menu Section */}
                <div className="hidden md:block 2xl:ml-36">
                    <ul className="flex items-center gap-6 md:gap-2 lg:gap-8 xl:gap-30 2xl:gap-50 text-gray-600 ">
                        {NavbarMenu.map((item) => (
                            <li key={item.id}>
                                <a
                                    href={item.link}
                                    className="inline-block py-1 px-3 hover:text-[#D700E6] font-semibold text-black"
                                >
                                    {item.title}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
                {/*/!* Icon Section *!/*/}
                {/*<div className="flex items-center gap-4">*/}
                {/*    <button className="text-2xl hover:bg-orange-400 hover:text-white rounded-full p-2 duration-200 border-0">*/}
                {/*        <CiSearch />*/}
                {/*    </button>*/}

                {/*    <button className="text-2xl hover:bg-orange-400 hover:text-white rounded-full p-2 duration-200">*/}
                {/*        <FaShoppingCart />*/}
                {/*    </button>*/}

                {/*    <button className="hidden md:block hover:bg-orange-400 text-orange-400 font-semibold hover:text-white rounded-md border-2 border-orange-400 px-6 py-2 duration-200">*/}
                {/*        Login*/}
                {/*    </button>*/}
                {/*</div>*/}

                {/* Mobile hamburger Menu section */}
                <div className='md:hidden' onClick={() => setopen(!open)}>
                    <IoMdMenu className='text-4xl'/>
                </div>


                {/*  mobile sidebar section */}
                <div><ResponsiveMenu open={open} /></div>
            </div>
        </div>
    );
};

export default Header;