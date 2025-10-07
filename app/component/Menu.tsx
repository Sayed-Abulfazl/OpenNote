"use client"

import { MdArrowForward, MdClose, MdInfoOutline, MdOutlineSettings, MdReadMore } from 'react-icons/md'
import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'

import { motion } from 'framer-motion'
import { useTheme } from '../context/useTheme'


export default function Menu({ toggleMenu, toogleAbout }) {
    const [out, setOut] = useState<boolean>(false);

    const outMenu = () => {
        setOut(true)
        setTimeout(() => {
            toggleMenu();
        }, 350)
    }

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

    const { noteV1Mode, noteV1Lang } = useTheme();

    if (noteV1Lang === 'eng') {
        return (
            <motion.div initial={'hidden'} animate={'visible'} variants={parentVarient} className={`${noteV1Mode === 'light' ? 'bg-[rgba(0,0,0,0.5)]' : 'bg-[rgba(255,255,255,0.1)]'} z-20 fixed sm:static sm:bg-transparent inset-0 flex items-start justify-end`} onClick={outMenu} >

                <div className={`${noteV1Mode === 'light' ? 'bg-white' : 'bg-black'} ${!out ? 'openMenu' : "outMenu"} sm:hidden relative rounded-bl-full pb-24`} onClick={(e) => e.stopPropagation()}>
                    <motion.div variants={childVariants}>
                        <MdClose
                            className={`cursor-pointer ${noteV1Mode === 'light' ? 'text-black hover:text-white hover:bg-black active:text-white active:bg-black' : 'text-white hover:text-black hover:bg-white active:text-black active:bg-white'} TD300 rounded-full p-1 absolute top-2 left-1 font-semibold text-4xl`}
                            onClick={outMenu}
                        />
                    </motion.div>
                    <motion.div variants={childVariants}>
                        <Image
                            src={'/picNote.jpg'}
                            alt='note'
                            width={1000}
                            height={1000}
                            className='max-w-[300px] mx-6 mt-[-10px] rounded-full'
                        />
                    </motion.div>

                    <Link href={'/routes/Add-Note'}>
                        <motion.div variants={childVariants} className='text-xl font-semibold FCC mx-auto px-6 py-1 rounded-b-full my-3 w-[90%] hover:bg-amber-100 TD300 hover:text-black active:bg-amber-100 active:text-black bg-amber-900 text-white shadow-[0px_0px_5px_#000000] '>
                            <span className=''>
                                Get Started
                            </span>
                            <MdArrowForward />
                        </motion.div>
                    </Link>

                    <div className='flex justify-center flex-col gap-5 tracking-wide font-serif text-lg uppercase items-start  mt-6'>
                        <motion.div variants={childVariants}>
                            <Link href={'/routes/Others'} className='FCC gap-1 bg-amber-100 px-5 py-1 hover:bg-amber-900 hover:text-amber-100 active:bg-amber-900 active:text-amber-100 rounded-xl TD300 ml-12'>
                                <span>
                                    Other Products
                                </span>
                                <MdReadMore className='hover:animate-bounce' />
                            </Link>
                        </motion.div>

                        <motion.div variants={childVariants}>
                            <Link href={'/routes/Setting'} className='FCC gap-1 bg-amber-100 px-5 py-1 hover:bg-amber-900 hover:text-amber-100 active:bg-amber-900 active:text-amber-100 rounded-xl TD300 ml-24'>
                                <span>
                                    Setting
                                </span>
                                <MdOutlineSettings className='hover:animate-spin ' />
                            </Link>
                        </motion.div>

                        <motion.div variants={childVariants}>
                            <div onClick={toogleAbout} className='FCC cursor-pointer gap-1 bg-amber-100 px-5 py-1 hover:bg-amber-900 hover:text-amber-100 active:bg-amber-900 active:text-amber-100 rounded-xl TD300 ml-36'>
                                <span>
                                    About
                                </span>
                                <MdInfoOutline className='hover:animate-ping' />
                            </div>
                        </motion.div>

                        {/* <motion.div variants={childVariants}>
                            <Link href={'/routes/Help'} className='FCC cursor-pointer gap-1 bg-amber-100 px-5 py-1 hover:bg-amber-900 hover:text-amber-100 active:bg-amber-900 active:text-amber-100 rounded-xl TD300 ml-48'>
                                <span>
                                    Help
                                </span>
                                <MdHelpOutline className='hover:animate-ping' />
                            </Link>
                        </motion.div> */}

                    </div>
                </div>
            </motion.div>
        )
    }

    else {

        return (
            <motion.div dir='rtl' initial={'hidden'} animate={'visible'} variants={parentVarient} className={`${noteV1Mode === 'light' ? 'bg-[rgba(0,0,0,0.5)]' : 'bg-[rgba(255,255,255,0.1)]'} z-20 fixed sm:static sm:bg-transparent inset-0 flex items-start justify-end`} onClick={outMenu} >

                <div className={`${noteV1Mode === 'light' ? 'bg-white' : 'bg-black'} ${!out ? 'openMenu' : "outMenu"} sm:hidden relative rounded-br-full pb-24`} onClick={(e) => e.stopPropagation()}>
                    <motion.div variants={childVariants}>
                        <MdClose
                            className={`cursor-pointer ${noteV1Mode === 'light' ? 'text-black hover:text-white hover:bg-black active:text-white active:bg-black' : 'text-white hover:text-black hover:bg-white active:text-black active:bg-white'} TD300 rounded-full p-1 absolute top-2 right-1 font-semibold text-4xl`}
                            onClick={outMenu}
                        />
                    </motion.div>
                    <motion.div variants={childVariants}>
                        <Image
                            src={'/picNote.jpg'}
                            alt='note'
                            width={1000}
                            height={1000}
                            className='max-w-[300px] mx-6 mt-[-10px] rounded-full'
                        />
                    </motion.div>

                    <Link href={'/routes/Add-Note'}>
                        <motion.div variants={childVariants} className='text-xl font-semibold FCC mx-auto px-6 py-1 rounded-b-full my-3 w-[90%] hover:bg-amber-100 TD300 hover:text-black active:bg-amber-100 active:text-black bg-amber-900 text-white shadow-[0px_0px_5px_#000000] '>
                            <span className=''>
                                شروع کنید
                            </span>
                            <MdArrowForward className='rotate-180' />
                        </motion.div>
                    </Link>

                    <div className='flex justify-center flex-col gap-5 tracking-wide font-serif text-xl items-start mt-6'>
                        <motion.div variants={childVariants}>
                            <Link href={'/routes/Others'} className='FCC gap-1 bg-amber-100 px-5 py-1 hover:bg-amber-900 hover:text-amber-100 active:bg-amber-900 active:text-amber-100 rounded-xl TD300 mr-12'>
                                <span>
                                    دیگر محصولات ما
                                </span>
                                <MdReadMore className='rotate-180 hover:animate-bounce' />
                            </Link>
                        </motion.div>

                        <motion.div variants={childVariants}>
                            <Link href={'/routes/Setting'} className='FCC gap-1 bg-amber-100 px-5 py-1 hover:bg-amber-900 hover:text-amber-100 active:bg-amber-900 active:text-amber-100 rounded-xl TD300 mr-24'>
                                <span>
                                    تنظیمات
                                </span>
                                <MdOutlineSettings className='hover:animate-spin ' />
                            </Link>
                        </motion.div>

                        <motion.div variants={childVariants}>
                            <div onClick={toogleAbout} className='FCC cursor-pointer gap-1 bg-amber-100 px-5 py-1 hover:bg-amber-900 hover:text-amber-100 active:bg-amber-900 active:text-amber-100 rounded-xl TD300 mr-36'>
                                <span>
                                    درباره
                                </span>
                                <MdInfoOutline className='hover:animate-ping' />
                            </div>
                        </motion.div>

                        {/* <motion.div variants={childVariants}>
                            <Link href={'/routes/Help'} className='FCC cursor-pointer gap-1 bg-amber-100 px-5 py-1 hover:bg-amber-900 hover:text-amber-100 active:bg-amber-900 active:text-amber-100 rounded-xl TD300 mr-48'>
                                <span>
                                    راهنما
                                </span>
                                <MdHelpOutline className='hover:animate-ping' />
                            </Link>
                        </motion.div> */}

                    </div>
                </div>
            </motion.div>
        )
    }


} 