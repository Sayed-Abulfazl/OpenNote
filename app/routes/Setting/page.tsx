"use client"

import Link from "next/link";
import { MdArrowBack } from "react-icons/md";
import { useTheme } from "../../context/useTheme";

import '../../style2.css'

export default function Setting() {
    const { noteV1Mode, chnageMode, noteV1Lang, chnageLang } = useTheme();

    if (noteV1Lang === 'eng') {

        return (
            <div className={`h-screen TD300 ${noteV1Mode === 'light' ? 'bg-white text-black' : 'bg-black text-white'}`}>
                <div className={`${noteV1Mode === 'light' ? 'bg-amber-200 text-black' : 'bg-amber-700 text-white'} px-4 py-5`}>
                    <div className="flex justify-end w-full flex-row-reverse gap-5">
                        <h2 className="text-2xl font-serif tracking-widest font-semibold">
                            Setting
                        </h2>
                        <Link href={'/'} title="Home Page">
                            <MdArrowBack className={`cursor-pointer ${noteV1Mode === 'light' ? 'hover:text-white hover:bg-black active:text-white active:bg-black text-black bg-white' : 'bg-black text-white hover:text-black hover:bg-white active:text-black active:bg-white'} text-4xl p-1 rounded-full TD300`} />
                        </Link>
                    </div>

                    <div className="ml-14 mt-2">
                        <p className="font-serif uppercase">
                            Personalize on your liking
                        </p>
                    </div>
                </div>

                <div className='FCC gap-3 flex-col md:flex-row md:gap-5 font-semibold my-12 text-2xl'>
                    <span className={`TD300`} > Select Language </span>

                    <div className='modeMotion flex justify-around'>
                        <label
                        >
                            <input
                                onClick={() => chnageLang(noteV1Lang === 'fa' ? 'eng' : 'fa')}
                                type="checkbox"
                            />
                            <p>Persian</p>
                            <p>English</p>
                            <span className="angle"></span>
                        </label>
                    </div>
                </div>



                <div className="flex lang TD300 items-center justify-center flex-col md:flex-row gap-5 py-6">
                    <span className="text-2xl font-semibold TD300">Light Mode</span>
                    <label >
                        {noteV1Mode === 'dark' &&
                            <input
                                onClick={() => chnageMode(noteV1Mode === 'light' ? 'dark' : "light")}
                                type="checkbox"
                                className="appearance-none"
                            />
                        }
                        {noteV1Mode === 'light' &&
                            <input
                                defaultChecked
                                onClick={() => chnageMode(noteV1Mode === 'light' ? 'dark' : "light")}
                                type="checkbox"
                                className="appearance-none"
                            />
                        }
                        <span> <i ></i> </span>
                    </label>
                </div>


            </div>
        )
    } else {
        return (
            <div dir="rtl" className={`h-screen TD300 ${noteV1Mode === 'light' ? 'bg-white text-black' : 'bg-black text-white'}`}>
                <div className={`${noteV1Mode === 'light' ? 'bg-amber-200 text-black' : 'bg-amber-700 text-white'} px-4 py-5`}>
                    <div className="flex justify-end w-full flex-row-reverse gap-5">
                        <h2 className="text-3xl font-serif tracking-widest font-semibold">
                            تنظــــــیمات
                        </h2>
                        <Link href={'/'} title="Home Page">
                            <MdArrowBack className={`rotate-180 cursor-pointer ${noteV1Mode === 'light' ? 'hover:text-white hover:bg-black active:text-white active:bg-black text-black bg-white' : 'bg-black text-white hover:text-black hover:bg-white active:text-black active:bg-white'} text-4xl p-1 rounded-full TD300`} />
                        </Link>
                    </div>

                    <div className="mr-14 mt-2">
                        <p className="font-serif text-xl">
                            مطابق علاقه تان شخصی سازی کنید
                        </p>
                    </div>
                </div>

                <div className='FCC gap-3 text-2xl flex-col md:flex-row md:gap-5 font-semibold py-12'>
                    <span className={`TD300`} > انتخاب زبان </span>

                    <div dir="ltr" className='modeMotion flex justify-around'>
                        <label
                        >
                            <input
                                onClick={() => chnageLang(noteV1Lang === 'fa' ? 'eng' : 'fa')}
                                type="checkbox"
                            />
                            <p>فارسی</p>
                            <p>انگلیسی</p>
                            <span className="angle"></span>
                        </label>
                    </div>
                </div>



                <div className="flex lang TD300 items-center justify-center md:flex-row md:gap-5 flex-col gap-5 my-6">
                    <span className="text-2xl font-semibold TD300">حالت روزانه</span>
                    <label >
                        {noteV1Mode === 'dark' &&
                            <input
                                onClick={() => chnageMode(noteV1Mode === 'light' ? 'dark' : "light")}
                                type="checkbox"
                                className="appearance-none"
                            />
                        }
                        {noteV1Mode === 'light' &&
                            <input
                                defaultChecked
                                onClick={() => chnageMode(noteV1Mode === 'light' ? 'dark' : "light")}
                                type="checkbox"
                                className="appearance-none"
                            />
                        }
                        <span> <i ></i> </span>
                    </label>
                </div>


            </div>
        )
    }
}