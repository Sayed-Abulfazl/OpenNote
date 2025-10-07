"use client"

import { MdArrowForward, MdInfoOutline, MdMenu, MdOutlineNoteAlt, MdOutlineSettings, MdReadMore } from 'react-icons/md'
import Menu from './Menu'
import { useState } from 'react'
import Link from 'next/link';
import About from './About';

import { motion } from 'framer-motion';
import { useTheme } from '../context/useTheme';


export default function Header() {

    const parentVarient = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
                delayChildren: 0,
            }
        }
    }

    const childVariants = {
        hidden: { opacity: 0, y: -30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.1 } }
    }

    const [showMenu, setShowMenu] = useState<boolean>(false);

    const [showAbout, setShowAbout] = useState<boolean>(false);

    const toogleAbout = () => {
        setShowMenu(false)
        setShowAbout(showAbout ? false : true);
    }

    const toggleMenu = () => {
        setShowMenu(showMenu ? false : true);
    }

    const { noteV1Lang } = useTheme();

    if (noteV1Lang === 'eng') {
        return (
            <div className={`flex justify-between lg:justify-around px-3 items-center py-4 bg-amber-200 border-b-2 lg:border-b-4 border-amber-700`}>
                <div className='flex justify-center items-center gap-1 italic text-amber-700'>
                    <Link href={'/'}>
                        <h1 className="text-3xl sm:text-2xl md:text-3xl lg:text-4xl TD300 font-semibold">
                            OpenNote
                        </h1>
                    </Link>
                    <MdOutlineNoteAlt
                        className='text-2xl'
                    />
                </div>
                <div
                    className={`sm:hidden text-4xl cursor-pointer ${showMenu ? 'hidden' : ''}`}
                    onClick={toggleMenu}
                >
                    <MdMenu />
                </div>
                <div className='hidden sm:block'>
                    <div className='sm:flex hidden TD300 justify-center items-center gap-6 md:gap-8 lg:gap-10'>

                        <div className='FCC gap-6 text-lg md:text-xl md:gap-9 lg:font-semibold xl:gap-10'>
                            <motion.div variants={childVariants}>
                                <Link href={'/routes/Setting'} className='FCC gap-1 hover:text-amber-700 active:text-amber-700 lg:border-2 lg:border-amber-700 lg:px-6 lg-py-1 lg:rounded-2xl lg:hover:bg-amber-700 lg:hover:text-white lg:active:bg-amber-700 lg:active:text-white TD300 '>
                                    <span>
                                        Setting
                                    </span>
                                    <MdOutlineSettings />
                                </Link>
                            </motion.div>

                            {/* <motion.div variants={childVariants}>
                                <Link href={'/routes/Help'} className='FCC gap-1 hover:text-amber-700 active:text-amber-700 lg:border-2 lg:border-amber-700 lg:px-6 lg-py-1 lg:rounded-2xl lg:hover:bg-amber-700 lg:hover:text-white lg:active:bg-amber-700 lg:active:text-white TD300 '>
                                    <span>
                                        Help
                                    </span>
                                    <MdHelpOutline />
                                </Link>
                            </motion.div> */}

                            <motion.div variants={childVariants}>
                                <div onClick={toogleAbout} className='FCC cursor-pointer gap-1 hover:text-amber-700 active:text-amber-700 lg:border-2 lg:border-amber-700 lg:px-6 lg-py-1 lg:rounded-2xl lg:hover:bg-amber-700 lg:hover:text-white lg:active:bg-amber-700 lg:active:text-white TD300 '>
                                    <span>
                                        About
                                    </span>
                                    <MdInfoOutline />
                                </div>
                            </motion.div>

                            <motion.div variants={childVariants}>
                                <Link href={'/routes/Others'} className='FCC gap-1 hover:text-amber-700 active:text-amber-700 lg:border-2 lg:border-amber-700 lg:px-6 lg-py-1 lg:rounded-2xl lg:hover:bg-amber-700 lg:hover:text-white lg:active:bg-amber-700 lg:active:text-white TD300 '>
                                    <span>
                                        Other Products
                                    </span>
                                    <MdReadMore />
                                </Link>
                            </motion.div>

                        </div>

                        <motion.div variants={childVariants}>
                            <Link href={'/routes/Add-Note'}>
                                <div className='text-lg sm:font-semibold md:text-xl lg:text-2xl flex items-center justify-center px-4 py-1 rounded-sm bg-amber-700 text-white shadow-[-7px_7px_0px_#000000] hover:bg-amber-200 hover:text-black TD300 '>
                                    <p className=''>
                                        Get Started
                                    </p>
                                    <MdArrowForward />
                                </div>
                            </Link>
                        </motion.div>

                    </div>
                </div>
                <div className={`sm:hidden absolute`}>
                    {
                        showMenu && <Menu toggleMenu={toggleMenu} toogleAbout={toogleAbout} />
                    }
                </div>
                {showAbout && <About toogleAbout={toogleAbout} />}

            </div>
        )
    }
    else {
        return (
            <div dir='rtl' className={`flex justify-between lg:justify-around px-3 items-center py-4 bg-amber-200 border-b-2 lg:border-b-4 border-amber-700`}>
                <div className='flex justify-center items-center gap-1 italic text-amber-700'>
                    <Link href={'/'}>
                        <h1 className="text-3xl sm:text-2xl md:text-3xl lg:text-4xl TD300 font-semibold">
                            یادداشت باز
                        </h1>
                    </Link>
                    <MdOutlineNoteAlt
                        className='text-2xl'
                    />
                </div>
                <div
                    className={`sm:hidden text-4xl cursor-pointer ${showMenu ? 'hidden' : ''}`}
                    onClick={toggleMenu}
                >
                    <MdMenu />
                </div>
                <div className='hidden sm:block'>
                    <div className='sm:flex hidden TD300 justify-center items-center gap-6 md:gap-8 lg:gap-10'>

                        <div className='FCC gap-3 md:gap-6 text-lg md:text-xl lg:font-semibold'>
                            <motion.div variants={childVariants}>
                                <Link href={'/routes/Setting'} className='FCC gap-1 hover:text-amber-700 active:text-amber-700 lg:border-2 lg:border-amber-700 lg:px-6 lg-py-1 lg:rounded-2xl lg:hover:bg-amber-700 lg:hover:text-white lg:active:bg-amber-700 lg:active:text-white TD300 '>
                                    <span>
                                        تنظیمات
                                    </span>
                                    <MdOutlineSettings />
                                </Link>
                            </motion.div>

                            {/* <motion.div variants={childVariants}>
                                <Link href={'/routes/Help'} className='FCC gap-1 hover:text-amber-700 active:text-amber-700 lg:border-2 lg:border-amber-700 lg:px-6 lg-py-1 lg:rounded-2xl lg:hover:bg-amber-700 lg:hover:text-white lg:active:bg-amber-700 lg:active:text-white TD300 '>
                                    <span>
                                        راهنما
                                    </span>
                                    <MdHelpOutline />
                                </Link>
                            </motion.div> */}

                            <motion.div variants={childVariants}>
                                <div onClick={toogleAbout} className='FCC cursor-pointer gap-1 hover:text-amber-700 active:text-amber-700 lg:border-2 lg:border-amber-700 lg:px-6 lg-py-1 lg:rounded-2xl lg:hover:bg-amber-700 lg:hover:text-white lg:active:bg-amber-700 lg:active:text-white TD300 '>
                                    <span>
                                        درباره
                                    </span>
                                    <MdInfoOutline />
                                </div>
                            </motion.div>

                            <motion.div variants={childVariants}>
                                <Link href={'/routes/Others'} className='FCC gap-1 hover:text-amber-700 active:text-amber-700 lg:border-2 lg:border-amber-700 lg:px-6 lg-py-1 lg:rounded-2xl lg:hover:bg-amber-700 lg:hover:text-white lg:active:bg-amber-700 lg:active:text-white TD300 '>
                                    <span>
                                        دیگر محصولات ما
                                    </span>
                                    <MdReadMore className='rotate-180' />
                                </Link>
                            </motion.div>

                        </div>

                        <motion.div variants={childVariants}>
                            <Link href={'/routes/Add-Note'}>
                                <div className='text-lg md:font-semibold md:text-xl lg:text-2xl xl:px-8 flex items-center justify-center px-4 py-1 rounded-sm bg-amber-700 text-white shadow-[-7px_7px_0px_#000000] hover:bg-amber-200 hover:text-black TD300 '>
                                    <p className=''>
                                        شروع کنید
                                    </p>
                                    <MdArrowForward className='rotate-180' />
                                </div>
                            </Link>
                        </motion.div>

                    </div>
                </div>

                <div className={`sm:hidden absolute`}>
                    {
                        showMenu && <Menu toggleMenu={toggleMenu} toogleAbout={toogleAbout} />
                    }
                </div>
                {showAbout && <About toogleAbout={toogleAbout} />}

            </div>
        )
    }

}