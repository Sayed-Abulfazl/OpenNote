"use client"

import { FaSadCry } from "react-icons/fa";
import { SiQuicklook } from "react-icons/si";
import { useTheme } from "./context/useTheme"
import Link from "next/link";

export default function notFound(){
    const { noteV1MOde } = useTheme();
    return(
        <div className={`FCC gap-3 flex-col h-screen ${noteV1MOde === 'light' ? 'bg-white text-black' : 'bg-black text-white'}`}>
            <div className="text-2xl lg:text-3xl FCC gap-2">
                <span>
                    Not Found Any Page
                </span>
                <FaSadCry />
            </div>
            <Link href={'/'} className="FCC my-3 px-6 py-2 rounded-2xl border-1 border-transparent TD300 font-serif hover:text-blue-400 hover:border-blue-500 active:text-blue-400 active:border-blue-500 gap-2 text-xl lg:text-2xl">
                <span>See Notes</span>
                <SiQuicklook/>
            </Link>
        </div>
    )
}