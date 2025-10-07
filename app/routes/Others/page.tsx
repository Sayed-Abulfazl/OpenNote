"use client"

import { MdArrowBack, MdShare } from "react-icons/md";
import SwiperSlider from "../../component/SwiperSlider";
import { myProjects } from "../../constants";
import Link from "next/link";

import { motion } from "framer-motion";
import { useTheme } from "../../context/useTheme";

export default function Others() {

    const parent = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
                delayChildren: 0.2,
            }
        }
    }

    const child = {
        hidden: { opacity: 0, x: 300 },
        visible: { opacity: 1, x: 0, transition: { duration: 0.2 } }
    }

    const handleShare = async (inputText) => {
        if (navigator.share) {
            try {
                await navigator.share({
                    title: "Share Text",
                    text: inputText,
                    url: window.location.href
                });
            }
            catch (err) {
                console.error("Shareing failed", err);
            }
        } else {
            alert('Your Browser can not Support Sharing !');
        }
    }

    const { noteV1Mode, noteV1Lang } = useTheme();

    if (noteV1Lang === 'eng') {

        return (
            <div className={`${noteV1Mode === 'light' ? 'bg-white text-black' : 'bg-black text-white'}`}>

                <div className={`py-6 ${noteV1Mode === 'light' ? 'bg-amber-200 text-black' : 'bg-amber-700 text-white'} px-4 py-3`}>
                    <div className="flex justify-end w-full flex-row-reverse gap-5">
                        <h2 className="text-xl lg:text-2xl font-serif tracking-widest font-semibold">
                            Other Products
                        </h2>
                        <Link href={'/'} title="Home Page">
                            <MdArrowBack className={`cursor-pointer ${noteV1Mode === 'light' ? 'hover:text-white hover:bg-black active:text-white active:bg-black text-black bg-white' : 'bg-black text-white hover:text-black hover:bg-white active:text-black active:bg-white'} text-4xl p-1 rounded-full TD300`} />
                        </Link>
                    </div>

                    <div className="ml-14 mt-2 text-sm lg:text-lg">
                        <p className="font-serif uppercase">
                            You can Click and see them!
                        </p>
                    </div>
                </div>

                <motion.div variants={parent} initial={'hidden'} animate={'visible'} className="p-6 columns-1 sm:max-w-[500px] lg:max-w-[700px] mx-auto">
                    {myProjects.map((project, i) => (
                        <motion.div variants={child} key={i}>
                            <div className={`block border m-2 my-6 p-2 rounded-xl ${noteV1Mode === 'light' ? 'bg-amber-100 border-white' : 'bg-amber-800 border-black'}`}>
                                <div className="relative mb-4 overflow-hidden rounded-lg shadow-lg ">
                                    <SwiperSlider srcs={project.srcs} />
                                    <a href={project.link} target="_blank" rel="noopener noreferrer">
                                        <div className=" lg:m-8 lg:p-8 p-1 py-2 my-3 text-justify">
                                            <h3 className={`text-xl lg:text-3xl pb-4 ${noteV1Mode === 'light' ? 'text-amber-700' : 'text-amber-300'} font-semibold`}> {project.title} </h3>
                                            <p className="text-lg"> {project.discription} </p>
                                            <div className="flex w-full justify-end px-4 py-2">
                                                <button
                                                    onClick={() => handleShare(project.link)}
                                                    className={`cursor-pointer text-xl font-semibold lg:text-2xl ${noteV1Mode === 'light' ? 'text-amber-700' : 'text-amber-300'} font-semibold`}
                                                >
                                                    <MdShare />
                                                </button>
                                            </div>
                                        </div>
                                    </a>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>

                <div className="FCC animate-bounce">
                    <a
                        href="https://abulfazl-portfolio.vercel.app"
                        target="_blank"
                        className="text-lg font-semibold text-amber-500"
                    >Contact with me</a>
                </div>
            </div>
        )
    } else {

        return (
            <div className={`${noteV1Mode === 'light' ? 'bg-white text-black' : 'bg-black text-white'}`}>

                <div  dir="rtl" className={`py-6 ${noteV1Mode === 'light' ? 'bg-amber-200 text-black' : 'bg-amber-700 text-white'} px-4 py-3`}>
                    <div className="flex justify-end w-full flex-row-reverse gap-5">
                        <h2 className="text-2xl font-serif tracking-widest font-semibold">
                            دیگر محصولات ما
                        </h2>
                        <Link href={'/'} title="Home Page">
                            <MdArrowBack className={`rotate-180 cursor-pointer ${noteV1Mode === 'light' ? 'hover:text-white hover:bg-black active:text-white active:bg-black text-black bg-white' : 'bg-black text-white hover:text-black hover:bg-white active:text-black active:bg-white'} text-4xl p-1 rounded-full TD300`} />
                        </Link>
                    </div>

                    <div className="mr-14 mt-2 text-lg md:text-xl">
                        <p className="font-serif uppercase">
                            شما میتوانید با کلیک روی هر تصویر آن را ببینید !
                        </p>
                    </div>
                </div>

                <motion.div variants={parent} initial={'hidden'} animate={'visible'} className="p-6 columns-1 sm:max-w-[500px] lg:max-w-[700px] mx-auto">
                    {myProjects.map((project, i) => (
                        <motion.div variants={child} key={i}>
                            <div className={`block border m-2 my-6 p-2 rounded-xl ${noteV1Mode === 'light' ? 'bg-amber-100 border-white' : 'bg-amber-800 border-black'}`}>
                                <div className="relative mb-4 overflow-hidden rounded-lg shadow-lg ">
                                    <SwiperSlider srcs={project.srcs} />
                                    <a href={project.link} target="_blank" rel="noopener noreferrer">
                                        <div className=" lg:m-8 lg:p-8 p-1 py-2 my-3 text-justify">
                                            <h3 className={`text-xl lg:text-3xl pb-4 ${noteV1Mode === 'light' ? 'text-amber-700' : 'text-amber-300'} font-semibold`}> {project.title} </h3>
                                            <p className="text-lg"> {project.discription} </p>
                                            <div className="flex w-full justify-end px-4 py-2">
                                                <button
                                                    onClick={() => handleShare(project.link)}
                                                    className={`cursor-pointer text-xl font-semibold lg:text-2xl ${noteV1Mode === 'light' ? 'text-amber-700' : 'text-amber-300'} font-semibold`}
                                                >
                                                    <MdShare />
                                                </button>
                                            </div>
                                        </div>
                                    </a>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>

                <div className="FCC animate-bounce">
                    <a
                        href="https://abulfazl-portfolio.vercel.app"
                        target="_blank"
                        className="text-lg font-semibold text-amber-500"
                    >ارتباط با من</a>
                </div>
            </div>
        )

    }
}