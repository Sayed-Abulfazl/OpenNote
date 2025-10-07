"use client"

import { MdAdsClick, MdCopyAll, MdRefresh, MdShare, MdWifiOff } from "react-icons/md";
import { FaCheckCircle } from "react-icons/fa";
import { BsArrowUpCircle } from "react-icons/bs";
import { LuRefreshCw } from "react-icons/lu";

import Image from "next/image";
import { useEffect, useState } from "react";

import { motion } from "framer-motion";
import { useTheme } from "../context/useTheme";
import { defaultNotes } from "../constants";

export default function NoteList() {
    const [copidID, setCopiedID] = useState<string | number | null>(null);

    const [notes, setNotes] = useState<string[] | number[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    const [showDefaultNotes, setShowDeafualtNotes] = useState<boolean>(false);

    const handleDefaultNotes = () => {
        setShowDeafualtNotes(showDefaultNotes ? false : true);
    }

    const handleCopy = async (inputText, inputID) => {
        if (!navigator.clipboard) {
            alert('Your Browser can not Support ClipBoard !');
            return;
        }
        try {
            await navigator.clipboard.writeText(inputText);
            setCopiedID(inputID);
            setTimeout(() => {
                setCopiedID(null);
            }, 2000)
        }
        catch (err) {
            console.error("Copy Failed", err);
        }
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
        hidden: { opacity: 0, x: -300 },
        visible: { opacity: 1, x: 0, transition: { duration: 0.2 } }
    }

    const [moveUp, setMoveUp] = useState<boolean>(false);


    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > window.innerHeight) {
                setMoveUp(true);
            } else {
                setMoveUp(false);
            }
        }

        window.addEventListener('scroll', handleScroll);

        return () => window.removeEventListener('scroll', handleScroll)

    }, [])

    useEffect(() => {
        fetchNote();
    }, [])

    const fetchNote = async () => {
        try {
            const res = await fetch('/api/notes');

            if (!res.ok) {
                setNotes([]);
                const errData = await res.json();
                console.log("-----------E-R-R-O-R", errData.error);
                throw new Error('Problem at connection !');
            } else {
                const getNotes = await res.json();
                setNotes(getNotes);
            }
        }
        catch (err) {
            setError(err.message);
            setNotes([]);
        }
        finally {
            setLoading(false);
        }
    }

    const { noteV1Mode, noteV1Lang } = useTheme()

    if (noteV1Lang === 'eng') {

        return (
            <div className={`px-4 relative min-h-screen py-6 ${noteV1Mode === 'light' ? 'bg-white text-black' : "bg-black text-white"}`} >
                {
                    loading ? (
                        <div className={`FCC gap-2 ${noteV1Mode === 'light' ? 'text-blue-700' : "text-blue-300"} text-2xl`}>
                            Loading
                            <LuRefreshCw className="refresh" />
                        </div>) : error ? (
                            <div className="FCC flex-col gap-3">
                                <span className={`FCC gap-1 text-shadow-[_0px_0px_1px_#f00] ${noteV1Mode === 'light' ? 'text-red-600' : 'text-red-400'} text-lg lg:text-xl`}>
                                    {error}
                                    <MdWifiOff />
                                </span>
                                <span onClick={() => window.location.reload()} className={`FCC gap-1 cursor-pointer text-xl lg:text-2xl border px-2 py-1 border-transparent rounded-xl ${noteV1Mode === 'light' ? ' hover:border-green-600 hover:text-green-600 active:text-green-600 text-black active:border-green-600' : ' hover:border-green-300 hover:text-green-300 active:text-green-300 text-white active:border-green-300'}`}>
                                    try again
                                    <MdRefresh />
                                </span>
                                {
                                    showDefaultNotes ?
                                        <motion.div
                                            initial={'hidden'}
                                            animate={'visible'}
                                            variants={parent}
                                        >
                                            <motion.div
                                                variants={child}
                                                className={`min-w-[300px] text-center mt-8 rounded-b-full pt-2 pb-4 text-xl lg:text-2xl mb-6 ${noteV1Mode === 'light' ? 'bg-amber-300' : 'bg-amber-700'}`}
                                            >
                                                <span className="tracking-widest font-semibold">Default Notes</span>
                                            </motion.div>
                                            {/* Default Notes start */}
                                            {
                                                Array.isArray(defaultNotes) && defaultNotes.length > 1 ? defaultNotes.map((note) => (
                                                    <motion.div
                                                        key={note._id}
                                                        variants={child}
                                                        className={`relative ${noteV1Mode === 'light' ? 'bg-amber-300 text-black' : 'bg-amber-700 text-white'} my-6 py-2 px-4 rounded-2xl mx-auto sm:max-w-[500px] lg:max-w-[700px]`}
                                                    >
                                                        <div
                                                            className="grid grid-cols-3 py-2 gap-6 my-4"
                                                        >
                                                            <div className="FCC flex-col gap-3">
                                                                {note.gender === 'male' ? (<>
                                                                    <Image
                                                                        src={'/male.jpg'}
                                                                        alt="male"
                                                                        width={100}
                                                                        height={100}
                                                                        className="w-[100px] h-[100px] lg:w-[150px] lg:h-[150px] rounded-full object-cover"
                                                                    />
                                                                </>) : (<>
                                                                    <Image
                                                                        src={'/female.jpg'}
                                                                        alt="male"
                                                                        width={100}
                                                                        height={100}
                                                                        className="w-[100px] h-[100px] lg:w-[150px] lg:h-[150px] rounded-full object-cover"
                                                                    />
                                                                </>)}
                                                                <div className="text-lg text-center font-serif lg:text-xl">
                                                                    {note.author}
                                                                </div>
                                                            </div>

                                                            <div className="col-span-2 text-justify mt-8 FCC flex-wrap overflow-hidden ">
                                                                <span className="text-sm text-center leading-8 lg:leading-10 font-semibold sm:text-lg lg:text-xl">
                                                                    {note.body}
                                                                </span>
                                                            </div>

                                                        </div>
                                                        {/* end grid  */}

                                                        <div className="absolute top-4 right-4 font-semibold lg:text-lg text-sm">
                                                            {note.createdAt}
                                                        </div>

                                                        <div className="flex justify-end mb-2 items-center">

                                                            <div className="FCC gap-3">
                                                                <button
                                                                    onClick={() => handleShare(note.body)}
                                                                    className="cursor-pointer text-xl lg:text-2xl"
                                                                >
                                                                    <MdShare />
                                                                </button>

                                                                <button
                                                                    onClick={() => handleCopy(note.body, note._id)}
                                                                    className="cursor-pointer text-xl TD300 lg:text-2xl"
                                                                >
                                                                    {copidID === note._id ? (<><FaCheckCircle /></>) : (<><MdCopyAll /></>)}
                                                                </button>
                                                            </div>
                                                            {/* 
                                <Link href={`/routes/${note._id}`} className="FCC gap-1 text-sm lg:text-lg">
                                    Read more
                                    <MdReadMore />
                                </Link> */}

                                                        </div>

                                                    </motion.div>
                                                    // end background
                                                )
                                                ) : (<div>
                                                    <span className="FCC text-3xl text-amber-700">Is empty</span>
                                                </div>)
                                            }

                                        </motion.div>
                                        :
                                        <span onClick={handleDefaultNotes} className={`mt-24 px-6 py-2 cursor-pointer text-lg lg:text-xl TD300 font-semibold FCC gap-2 rounded-full border-1 lg:border-2 ${noteV1Mode === 'light' ? 'border-amber-700 hover:bg-amber-700 hover:text-white active:bg-amber-700 active:text-white' : 'border-amber-300 hover:bg-amber-300 hover:text-black active:bg-amber-300 active:text-black'}`}>
                                            Default Notes
                                            <MdAdsClick />
                                        </span>
                                }
                            </div>
                        ) :
                        <motion.div
                            initial={'hidden'}
                            animate={'visible'}
                            variants={parent}
                        >
                            <div className={`FCC mx-auto rounded-b-full font-semibold sm:max-w-[500px] lg:max-w-[700px] items-center text-lg lg:text-xl font-serif ${noteV1Mode === 'light' ? 'bg-amber-300' : 'bg-amber-700'} `}>
                                <div className="FCC gap-1">
                                    <span>Numbers of Notes: </span>
                                    <span className="">
                                        {notes.length}
                                    </span>
                                </div>
                            </div>
                            {
                                Array.isArray(notes) && notes.length > 1 ? notes.map((note) => (
                                    <motion.div
                                        key={note._id}
                                        variants={child}
                                        className={`relative ${noteV1Mode === 'light' ? 'bg-amber-300 text-black' : 'bg-amber-700 text-white'} my-6 py-2 px-4 rounded-2xl mx-auto sm:max-w-[500px] lg:max-w-[700px]`}
                                    >
                                        <div
                                            className="grid grid-cols-3 py-2 gap-6 my-4"
                                        >
                                            <div className="FCC flex-col gap-3">
                                                {note.gender === 'male' ? (<>
                                                    <Image
                                                        src={'/male.jpg'}
                                                        alt="male"
                                                        width={100}
                                                        height={100}
                                                        className="w-[100px] h-[100px] lg:w-[150px] lg:h-[150px] rounded-full object-cover"
                                                    />
                                                </>) : (<>
                                                    <Image
                                                        src={'/female.jpg'}
                                                        alt="male"
                                                        width={100}
                                                        height={100}
                                                        className="w-[100px] h-[100px] lg:w-[150px] lg:h-[150px] rounded-full object-cover"
                                                    />
                                                </>)}
                                                <div className="text-lg text-center font-serif lg:text-xl">
                                                    {note.author}
                                                </div>
                                            </div>

                                            <div className="col-span-2 text-justify mt-4 FCC flex-wrap overflow-hidden ">
                                                <span className="text-sm leading-8 lg:leading-10 text-center font-semibold sm:text-lg lg:text-xl">
                                                    {note.body}
                                                </span>
                                            </div>

                                        </div>
                                        {/* end grid  */}

                                        <div className="absolute top-4 right-4 font-semibold lg:text-lg text-sm">
                                            {new Date(note.createdAt).toLocaleDateString('en-GB', { year: 'numeric', month: 'long', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                                        </div>

                                        <div className="flex justify-end mb-2 items-center">

                                            <div className="FCC gap-3">
                                                <button
                                                    onClick={() => handleShare(note.body)}
                                                    className="cursor-pointer text-xl lg:text-2xl"
                                                >
                                                    <MdShare />
                                                </button>

                                                <button
                                                    onClick={() => handleCopy(note.body, note._id)}
                                                    className="cursor-pointer text-xl TD300 lg:text-2xl"
                                                >
                                                    {copidID === note._id ? (<><FaCheckCircle /></>) : (<><MdCopyAll /></>)}
                                                </button>
                                            </div>
                                            {/* 
                                <Link href={`/routes/${note._id}`} className="FCC gap-1 text-sm lg:text-lg">
                                    Read more
                                    <MdReadMore />
                                </Link> */}

                                        </div>

                                    </motion.div>
                                    // end background
                                )
                                ) : (<div>
                                    <span className="FCC text-3xl text-amber-700">Is empty</span>
                                </div>)
                            }
                        </motion.div>
                }

                {
                    moveUp &&
                    <div className="bottom-5 w-full fixed text-2xl lg:text-3xl animate-bounce">
                        <BsArrowUpCircle
                            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                            className={`mx-auto cursor-pointer ${noteV1Mode === 'light' ? 'text-black' : 'text-white'}`}
                        />
                    </div>
                }
            </div>
        )
    }










    // Persian
    else {

        return (
            <div dir="rtl" className={`px-4 relative min-h-screen py-6 ${noteV1Mode === 'light' ? 'bg-white text-black' : "bg-black text-white"}`} >
                {
                    loading ? (
                        <div className={`FCC gap-2 ${noteV1Mode === 'light' ? 'text-blue-700' : "text-blue-300"} text-2xl`}>
                            بارگذاری
                            <LuRefreshCw className="refresh" />
                        </div>) : error ? (
                            <div className="FCC flex-col gap-3">
                                <span className={`FCC gap-1 text-shadow-[_0px_0px_1px_#f00] ${noteV1Mode === 'light' ? 'text-red-600' : 'text-red-400'} text-lg lg:text-xl`}>
                                    مشکل اتصال به انترنت
                                    <MdWifiOff />
                                </span>
                                <span onClick={() => window.location.reload()} className={`FCC gap-1 cursor-pointer text-xl lg:text-2xl border px-2 py-1 border-transparent rounded-xl ${noteV1Mode === 'light' ? ' hover:border-green-600 hover:text-green-600 active:text-green-600 text-black active:border-green-600' : ' hover:border-green-300 hover:text-green-300 active:text-green-300 text-white active:border-green-300'}`}>
                                    تلاش مجدد
                                    <MdRefresh />
                                </span>
                                {
                                    showDefaultNotes ?
                                        <motion.div
                                            initial={'hidden'}
                                            animate={'visible'}
                                            variants={parent}
                                        >
                                            <motion.div
                                                variants={child}
                                                className={`min-w-[300px] text-center mt-8 rounded-b-full pt-2 pb-4 lg:text-2xl text-xl font-semibold mb-6 ${noteV1Mode === 'light' ? 'bg-amber-300' : 'bg-amber-700'}`}
                                            >
                                                <span>یاد داشت های پیش فرض</span>
                                            </motion.div>
                                            {/* Default Notes start */}
                                            {
                                                Array.isArray(defaultNotes) && defaultNotes.length > 1 ? defaultNotes.map((note) => (
                                                    <motion.div
                                                        key={note._id}
                                                        variants={child}
                                                        className={`relative ${noteV1Mode === 'light' ? 'bg-amber-300 text-black' : 'bg-amber-700 text-white'} my-6 py-2 px-4 rounded-2xl mx-auto sm:max-w-[500px] lg:max-w-[700px]`}
                                                    >
                                                        <div
                                                            className="grid grid-cols-3 py-2 gap-6 my-4"
                                                        >
                                                            <div className="FCC flex-col gap-3">
                                                                {note.gender === 'male' ? (<>
                                                                    <Image
                                                                        src={'/male.jpg'}
                                                                        alt="male"
                                                                        width={100}
                                                                        height={100}
                                                                        className="w-[100px] h-[100px] lg:w-[150px] lg:h-[150px] rounded-full object-cover"
                                                                    />
                                                                </>) : (<>
                                                                    <Image
                                                                        src={'/female.jpg'}
                                                                        alt="male"
                                                                        width={100}
                                                                        height={100}
                                                                        className="w-[100px] h-[100px] lg:w-[150px] lg:h-[150px] rounded-full object-cover"
                                                                    />
                                                                </>)}
                                                                <div className="text-lg text-center font-serif lg:text-xl">
                                                                    {note.author}
                                                                </div>
                                                            </div>

                                                            <div className="col-span-2 text-justify mt-8 FCC flex-wrap overflow-hidden ">
                                                                <span className="text-sm leading-8 lg:leading-10 sm:text-lg lg:text-xl font-semibold text-center">
                                                                    {note.body}
                                                                </span>
                                                            </div>

                                                        </div>
                                                        {/* end grid  */}

                                                        <div className="absolute top-4 left-4 font-semibold lg:text-lg text-sm">
                                                            {note.createdAt}
                                                        </div>

                                                        <div className="flex justify-end mb-2 items-center">

                                                            <div className="FCC gap-3">
                                                                <button
                                                                    onClick={() => handleShare(note.body)}
                                                                    className="cursor-pointer text-xl lg:text-2xl"
                                                                >
                                                                    <MdShare />
                                                                </button>

                                                                <button
                                                                    onClick={() => handleCopy(note.body, note._id)}
                                                                    className="cursor-pointer text-xl TD300 lg:text-2xl"
                                                                >
                                                                    {copidID === note._id ? (<><FaCheckCircle /></>) : (<><MdCopyAll /></>)}
                                                                </button>
                                                            </div>
                                                            {/* 
                                <Link href={`/routes/${note._id}`} className="FCC gap-1 text-sm lg:text-lg">
                                    Read more
                                    <MdReadMore />
                                </Link> */}

                                                        </div>

                                                    </motion.div>
                                                    // end background
                                                )
                                                ) : (<div>
                                                    <span className="FCC text-3xl text-amber-700">Is empty</span>
                                                </div>)
                                            }

                                        </motion.div>
                                        :
                                        <span onClick={handleDefaultNotes} className={`mt-24 px-6 py-2 cursor-pointer text-lg lg:text-xl TD300 font-semibold FCC gap-2 rounded-full border-1 lg:border-2 ${noteV1Mode === 'light' ? 'border-amber-700 hover:bg-amber-700 hover:text-white active:bg-amber-700 active:text-white' : 'border-amber-300 hover:bg-amber-300 hover:text-black active:bg-amber-300 active:text-black'}`}>
                                            یاد داشت های پیش فرض
                                            <MdAdsClick />
                                        </span>
                                }
                            </div>
                        ) :
                        <motion.div
                            initial={'hidden'}
                            animate={'visible'}
                            variants={parent}
                        >
                            <div className={`FCC mx-auto rounded-b-full sm:max-w-[500px] lg:max-w-[700px] items-center text-lg lg:text-xl font-serif font-semibold ${noteV1Mode === 'light' ? 'bg-amber-300' : 'bg-amber-700'}`}>
                                <div className="FCC gap-1">
                                    <span>تعداد یاد داشت ها: </span>
                                    <span className="">
                                        {notes.length}
                                    </span>
                                </div>
                            </div>
                            {
                                Array.isArray(notes) && notes.length > 1 ? notes.map((note) => (
                                    <motion.div
                                        key={note._id}
                                        variants={child}
                                        className={`relative ${noteV1Mode === 'light' ? 'bg-amber-300 text-black' : 'bg-amber-700 text-white'} my-6 py-2 px-4 rounded-2xl mx-auto sm:max-w-[500px] lg:max-w-[700px]`}
                                    >
                                        <div
                                            className="grid grid-cols-3 py-2 gap-6 my-4"
                                        >
                                            <div className="FCC flex-col gap-3">
                                                {note.gender === 'male' ? (<>
                                                    <Image
                                                        src={'/male.jpg'}
                                                        alt="male"
                                                        width={100}
                                                        height={100}
                                                        className="w-[100px] h-[100px] lg:w-[150px] lg:h-[150px] rounded-full object-cover"
                                                    />
                                                </>) : (<>
                                                    <Image
                                                        src={'/female.jpg'}
                                                        alt="male"
                                                        width={100}
                                                        height={100}
                                                        className="w-[100px] h-[100px] lg:w-[150px] lg:h-[150px] rounded-full object-cover"
                                                    />
                                                </>)}
                                                <div className="text-lg text-center font-serif lg:text-xl">
                                                    {note.author}
                                                </div>
                                            </div>

                                            <div className="col-span-2 text-justify mt-8 FCC flex-wrap overflow-hidden ">
                                                <span className="text-sm leading-8 lg:leading-10 sm:text-lg lg:text-xl font-semibold text-center">
                                                    {note.body}
                                                </span>
                                            </div>

                                        </div>
                                        {/* end grid  */}

                                        <div className="absolute top-4 left-4 font-semibold lg:text-lg text-sm">
                                            {new Date(note.createdAt).toLocaleDateString('fa-AF', { year: 'numeric', month: 'long', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                                        </div>

                                        <div className="flex justify-end mb-2 items-center">

                                            <div className="FCC gap-3">
                                                <button
                                                    onClick={() => handleShare(note.body)}
                                                    className="cursor-pointer text-xl lg:text-2xl"
                                                >
                                                    <MdShare />
                                                </button>

                                                <button
                                                    onClick={() => handleCopy(note.body, note._id)}
                                                    className="cursor-pointer text-xl TD300 lg:text-2xl"
                                                >
                                                    {copidID === note._id ? (<><FaCheckCircle /></>) : (<><MdCopyAll /></>)}
                                                </button>
                                            </div>
                                            {/* 
                                <Link href={`/routes/${note._id}`} className="FCC gap-1 text-sm lg:text-lg">
                                    Read more
                                    <MdReadMore />
                                </Link> */}

                                        </div>

                                    </motion.div>
                                    // end background
                                )
                                ) : (<div>
                                    <span className="FCC text-3xl text-amber-700">Is empty</span>
                                </div>)
                            }
                        </motion.div>
                }

                {
                    moveUp &&
                    <div className="bottom-5 w-full fixed text-2xl lg:text-3xl animate-bounce">
                        <BsArrowUpCircle
                            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                            className={`mx-auto cursor-pointer ${noteV1Mode === 'light' ? 'text-black' : 'text-white'}`}
                        />
                    </div>
                }
            </div>
        )
    }

}