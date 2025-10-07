"use client"

import { useState } from "react";
import { MdAdsClick, MdArrowBack, MdDateRange } from "react-icons/md";
import { useTheme } from "../context/useTheme";

export default function About({ toogleAbout }) {
    const [outAbout, setOutAbout] = useState<boolean>(false);
    const waitForOutAbout = () => {
        setOutAbout(true)
        setTimeout(() => {
            toogleAbout();
        }, 490)
    }
    const { noteV1Lang } = useTheme();

    return (
        <div onClick={waitForOutAbout} className="inset-0 z-10 fixed FCC bg-[rgba(0,0,0,0.9)]">
            <div className={`bg-white relative FCC flex-col p-3 rounded-xl w-[80%] max-w-[600px] ${outAbout ? 'outAbout' : 'openAbout'} `} onClick={(e) => e.stopPropagation()}>
                {noteV1Lang === 'eng' ? (
                    <div className="flex justify-end w-full flex-row-reverse gap-5">
                        <h2 className="text-2xl font-semibold">
                            About
                        </h2>
                        <span>
                            <MdArrowBack onClick={waitForOutAbout} className="cursor-pointer text-amber-700 text-4xl p-1 rounded-full hover:text-white hover:bg-amber-700 TD300" />
                        </span>
                    </div>
                ) : (
                    <div dir="rtl" className="flex justify-end w-full flex-row-reverse gap-5">
                        <h2 className="text-2xl font-semibold">
                            درباره
                        </h2>
                        <span>
                            <MdArrowBack onClick={waitForOutAbout} className="rotate-180 cursor-pointer text-amber-700 text-4xl p-1 rounded-full hover:text-white hover:bg-amber-700 TD300" />
                        </span>
                    </div>
                )}

                <div className={`box overflow-hidden relative FCC w-[220px] h-[150px] `}>
                    <div className={`absolute top-0 left-0 h-[100%] z-10 w-[4px] lightBar1 rounded-3xl`}></div>
                    <div className={`absolute top-0 left-0 h-[100%] w-[100%] topLayer1`}></div>
                    <p className={`text-3xl sm:font-semibold title1 uppercase `}>Open Note</p>
                </div>

                <div className="text-justify my-3 shadow-[0px_1px_1px_#000000] px-2 text-sm sm:text-lg lg:text-xl lg:px-12">
                    <p className="p-2"> <span className="text-amber-700 font-semibold"> OpenNote </span> application is created for providing an enviroment that each one can share his/her notes and others can see them, like or unlike them and comment for them. THANKS</p>
                </div>

                <div dir="ltr" className="flex items-center my-3 gap-1 justify-start ml-6 w-full">
                    <p className="lg:text-xl text-sm sm:text-lg font-serif">
                        Contact with us :
                    </p>
                    <a
                        href="https://abulfazl-portfolio.vercel.app"
                        target="_blank"
                        className="px-3 py-1 FCC text-sm lg:text-lg gap-1 rounded-2xl border-transparent TD300 hover:text-amber-500 active:text-amber-500 border-2 hover:border-amber-500 active:border-amber-500"
                    >
                        click me
                        <MdAdsClick />
                    </a>
                </div>

                <div className="text-sm my-2 text-amber-700 font-semibold">
                    <p className="absolute bottom-2 right-2">
                        Version 1.0
                    </p>
                    <p className="absolute bottom-2 FCC gap-1 flex-row-reverse left-2">
                        1404/07/07
                        <MdDateRange />
                    </p>
                </div>
            </div>
        </div>
    )

}