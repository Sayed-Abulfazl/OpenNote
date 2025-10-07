"use client"

import Link from "next/link";
import { useRef, useState } from "react"
import { MdArrowBack, MdClose, MdErrorOutline, MdNoteAdd, MdRefresh, MdWifiOff } from "react-icons/md";
import { useTheme } from "../../context/useTheme";

export default function AddNote() {

    const authorRef = useRef<HTMLInputElement | null>(null)
    const eAuthorRef = useRef<HTMLSpanElement | null>(null)

    const bodyRef = useRef<HTMLTextAreaElement | null>(null)
    const eBodyRef = useRef<HTMLSpanElement | null>(null)

    const [author, setAuthor] = useState<any>('');
    const [body, setBody] = useState<any>('');
    const [gender, setGender] = useState<string>('male');

    const [error, setError] = useState<String | null>(null);
    const [succeess, setSucceess] = useState<boolean>(false);
    const [wantOut, setWantOut] = useState<boolean>(false);

    const outNotific = () => {
        setSucceess(true);
        setTimeout(() => {
            setSucceess(false);
            setWantOut(false)
        }, 1000)
        setTimeout(() => {
            setWantOut(true)
        }, 495)
    }

    // removing methods
    const removeAuthor = () => {
        setAuthor('')
    }
    const removeBody = () => {
        setBody('')
    }

    const handleRemove = () => {
        setAuthor('');
        setBody('');
        setError(null);
        setGender('male')
    }



    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!(author && body)) {
            if (!author) {
                authorRef.current.style.borderColor = 'red'
                authorRef.current.disabled = true;
                eAuthorRef.current.style.display = 'block';
            }
            if (!body) {
                bodyRef.current.style.borderColor = 'red';
                bodyRef.current.disabled = true;
                eBodyRef.current.style.display = 'inline';
            }
        } else {
            try {
                const res = await fetch('/api/notes', {
                    method: "POST",
                    headers: { 'Content-Type': "application/json" },
                    body: JSON.stringify({
                        author: author,
                        body: body,
                        gender: gender,
                    })
                });

                if (!res.ok) {
                    const errData = await res.json();
                    console.log('E---R---R---O---R !-!-!', errData.error);
                    setError('Problem In Internet !');
                } else {
                    setError(null);
                    setAuthor('');
                    setBody('');
                    setGender('male');
                    outNotific();
                }
            }
            catch (err) {
                setError('Problem in fetching data !')
            }
        }

        setTimeout(() => {
            authorRef.current.style.borderColor = 'white';
            authorRef.current.disabled = true;
            eAuthorRef.current.style.display = 'none';

            bodyRef.current.style.borderColor = 'white';
            bodyRef.current.disabled = false;
            eBodyRef.current.style.display = 'none';
        }, 1500)
    }
    const { noteV1Mode, noteV1Lang } = useTheme();

    if (noteV1Lang === 'eng') {
        return (
            <div className={`FCC TD300 flex-col min-h-screen gap-2 ${noteV1Mode === 'light' ? 'bg-white text-black' : 'bg-black text-white'}`}>

                <form
                    onSubmit={handleSubmit}
                    action=""
                    className={`${noteV1Mode === 'light' ? 'bg-amber-100' : 'bg-amber-900'} FCC flex-col gap-4 w-[80%] max-w-[700px] rounded-xl text-lg lg:text-xl px-3 py-6`}
                >
                    <div className={`flex justify-between items-center w-full ${noteV1Mode === 'light' ? 'text-amber-700' : "text-amber-300"} text-2xl sm:text-3xl mb-3`}>
                        <Link href={'/'} className="p-1 cursor-pointer active:text-white hover:text-white active:bg-amber-700 rounded-full TD300 hover:bg-amber-700">
                            <MdArrowBack className="" />
                        </Link>
                        <span className="font-serif text-lg sm:text-xl lg:text-2xl">
                            Add Your Note
                        </span>
                        <div className="p-1">
                            <MdNoteAdd />
                        </div>
                    </div>
                    <div className="w-full relative max-w-[500px] mx-auto">
                        <label className="FCC gap-2">
                            <span className="font-semibold">Author: </span>
                            <input
                                type="text"
                                value={author}
                                ref={authorRef}
                                autoFocus
                                maxLength={36}
                                autoComplete="off"
                                onChange={(e) => setAuthor(e.target.value)}
                                className={`bg-white border-white text-black TD300 border-1 sm:border-2 sm:px-3 lg:px-5 lg:py-2 text-lg font-normal lg:text-xl rounded-lg outline-none w-full px-2 py-1`}
                            />
                            <span ref={eAuthorRef} className="absolute hidden left-2 TD300 text-red-500">
                                <MdErrorOutline  />
                            </span>
                            {
                                author &&
                                <MdClose onClick={removeAuthor} id="Xauthor" className="absolute right-2 TD300 cursor-pointer sm:text-xl lg:text-2xl" />
                            }
                        </label>
                    </div>

                    <div className="w-full relative  max-w-[500px] mx-auto">
                        <label className="flex gap-2 items-start flex-col justify-center w-full">
                            <span className="font-semibold">Write Your Note</span>
                            <textarea
                                rows={5}
                                className={`bg-white border-white text-black TD300 resize-none border-1 sm:border-2 sm:px-3 lg:px-5 lg:py-2 w-full rounded-xl outline-none px-2 py-1`}
                                value={body}
                                autoComplete="off"
                                maxLength={200}
                                ref={bodyRef}
                                placeholder="max length 200"
                                onChange={(e) => setBody(e.target.value)}
                            />
                            <span ref={eBodyRef} className="absolute hidden TD300 left-2 top-12 text-red-500">
                                <MdErrorOutline  />
                            </span>
                            {
                                body &&
                                <MdClose id="Xbody" onClick={removeBody} className="absolute TD300 right-2 top-12 cursor-pointer sm:text-xl lg:text-2xl" />
                            }
                        </label>
                    </div>

                    <div className={`flex justify-start w-full max-w-[500px] gap-3 border-b-1 pb-2 ${noteV1Mode === 'dark' ? 'border-white' : 'border-black'}`}>
                        <label className="FCC gap-2">
                            <span>Male</span>
                            <input type="radio" id="male" value={"male"} name="gender" checked={gender === 'male'} onChange={(e) => setGender(e.target.value)} />
                        </label>
                        <label className="FCC gap-2">
                            <span>Female</span>
                            <input type="radio" id="female" value={'female'} name="gender" checked={gender === 'female'} onChange={(e) => setGender(e.target.value)} />
                        </label>
                    </div>

                    <div className="FCC gap-3 mt-6 mb-3">
                        <button
                            type="submit"
                            className={`px-5 py-1 TD300 ${noteV1Mode === 'light' ? 'bg-amber-200' : 'bg-amber-400'} active:bg-green-600 hover:bg-green-600 text-black font-semibold hover:text-white active:text-white rounded-lg cursor-pointer`}
                        >
                            Add Note
                        </button>
                        <button
                            type="reset"
                            onClick={handleRemove}
                            className={`px-5 py-1 TD300 ${noteV1Mode === 'light' ? 'bg-amber-200' : 'bg-amber-400'} active:bg-red-600 hover:bg-red-600 text-black font-semibold hover:text-white active:text-white rounded-lg cursor-pointer`}
                        >
                            Remove
                        </button>
                    </div>
                </form>
                {
                    error &&
                    <div className="FCC flex-col gap-3">
                        <span className={`FCC gap-1 text-shadow-[_0px_0px_1px_#f00] ${noteV1Mode === 'light' ? 'text-red-600' : 'text-red-400'} text-lg lg:text-xl`}>
                            {error}
                            <MdWifiOff />
                        </span>
                        <span onClick={() => window.location.reload()} className={`FCC gap-1 cursor-pointer text-xl lg:text-2xl border px-2 py-1 border-transparent rounded-xl ${noteV1Mode === 'light' ? ' hover:border-green-600 hover:text-green-600 active:text-green-600 text-black active:border-green-600' : ' hover:border-green-300 hover:text-green-300 active:text-green-300 text-white active:border-green-300'}`}>
                            try again
                            <MdRefresh />
                        </span>
                    </div>
                }
                {
                    succeess &&
                    <div className={`absolute ${succeess ? 'notificOpen' : ''} ${wantOut ? 'notificOut' : ''} bottom-10 right-5 bg-green-600 text-white text-xl px-12 py-4 font-serif rounded-xl`}>
                        <span className="">Note Added !</span>
                    </div>
                }
            </div>
        )
    }
    else {
        return (
            <div dir="rtl" className={`FCC TD300 flex-col min-h-screen gap-2 ${noteV1Mode === 'light' ? 'bg-white text-black' : 'bg-black text-white'}`}>

                <form
                    onSubmit={handleSubmit}
                    action=""
                    className={`${noteV1Mode === 'light' ? 'bg-amber-100' : 'bg-amber-900'} FCC flex-col gap-4 w-[80%] max-w-[700px] rounded-xl text-lg lg:text-xl px-3 py-6`}
                >
                    <div className={`flex justify-between items-center w-full ${noteV1Mode === 'light' ? 'text-amber-700' : "text-amber-300"} text-2xl sm:text-3xl mb-3`}>
                        <Link href={'/'} className="p-1 cursor-pointer active:text-white hover:text-white active:bg-amber-700 rounded-full TD300 hover:bg-amber-700">
                            <MdArrowBack className="rotate-180" />
                        </Link>
                        <span className="font-serif text-lg sm:text-xl lg:text-2xl">
                            یاد داشت خود را اضافه کنید
                        </span>
                        <div className="p-1">
                            <MdNoteAdd />
                        </div>
                    </div>
                    <div className="w-full relative max-w-[500px] mx-auto">
                        <label className="FCC gap-2">
                            <span className="font-semibold">نویسنده: </span>
                            <input
                                type="text"
                                value={author}
                                ref={authorRef}
                                autoFocus
                                maxLength={36}
                                autoComplete="off"
                                onChange={(e) => setAuthor(e.target.value)}
                                className={`bg-white border-white text-black TD300 border-1 sm:border-2 sm:px-3 lg:px-5 lg:py-2 text-lg font-normal lg:text-xl rounded-lg outline-none w-full px-2 py-1`}
                            />
                            <span ref={eAuthorRef} className="absolute hidden left-2 TD300 text-red-500">
                                <MdErrorOutline  />
                            </span>
                            {
                                author &&
                                <MdClose onClick={removeAuthor} id="Xauthor" className="absolute left-2 TD300 cursor-pointer sm:text-xl lg:text-2xl" />
                            }
                        </label>
                    </div>

                    <div className="w-full relative  max-w-[500px] mx-auto">
                        <label className="flex gap-2 items-start flex-col justify-center w-full">
                            <span className="font-semibold">یاد داشت خود را بنویسید</span>
                            <textarea
                                rows={5}
                                className={`bg-white border-white text-black TD300 resize-none border-1 sm:border-2 sm:px-3 lg:px-5 lg:py-2 w-full rounded-xl outline-none px-2 py-1`}
                                value={body}
                                autoComplete="off"
                                maxLength={200}
                                ref={bodyRef}
                                placeholder="حد اکثر 200 کرکتر"
                                onChange={(e) => setBody(e.target.value)}
                            />
                            <span ref={eBodyRef} className="absolute hidden TD300 left-2 top-12 text-red-500">
                                <MdErrorOutline />
                            </span>
                            {
                                body &&
                                <MdClose id="Xbody" onClick={removeBody} className="absolute TD300 left-2 top-12 cursor-pointer sm:text-xl lg:text-2xl" />
                            }
                        </label>
                    </div>

                    <div className={`flex justify-start w-full max-w-[500px] gap-3 border-b-1 pb-2 ${noteV1Mode === 'dark' ? 'border-white' : 'border-black'}`}>
                        <label className="FCC gap-2">
                            <span>آقا</span>
                            <input type="radio" id="male" value={"male"} name="gender" checked={gender === 'male'} onChange={(e) => setGender(e.target.value)} />
                        </label>
                        <label className="FCC gap-2">
                            <span>خانم</span>
                            <input type="radio" id="female" value={'female'} name="gender" checked={gender === 'female'} onChange={(e) => setGender(e.target.value)} />
                        </label>
                    </div>

                    <div className="FCC gap-3 mt-6 mb-3">
                        <button
                            type="submit"
                            className={`px-5 py-1 TD300 ${noteV1Mode === 'light' ? 'bg-amber-200' : 'bg-amber-400'} active:bg-green-600 hover:bg-green-600 text-black font-semibold hover:text-white active:text-white rounded-lg cursor-pointer`}
                        >
                            اضافه یاد داشت
                        </button>
                        <button
                            type="reset"
                            onClick={handleRemove}
                            className={`px-5 py-1 TD300 ${noteV1Mode === 'light' ? 'bg-amber-200' : 'bg-amber-400'} active:bg-red-600 hover:bg-red-600 text-black font-semibold hover:text-white active:text-white rounded-lg cursor-pointer`}
                        >
                            حذف
                        </button>
                    </div>
                </form>
                {
                    error &&
                    <div className="FCC flex-col gap-3">
                        <span className={`FCC gap-1 text-shadow-[_0px_0px_1px_#f00] ${noteV1Mode === 'light' ? 'text-red-600' : 'text-red-400'} text-lg lg:text-xl`}>
                            مشکل در اتصال به انترنت
                            <MdWifiOff />
                        </span>
                        <span onClick={() => window.location.reload()} className={`FCC gap-1 cursor-pointer text-xl lg:text-2xl border px-2 py-1 border-transparent rounded-xl ${noteV1Mode === 'light' ? ' hover:border-green-600 hover:text-green-600 active:text-green-600 text-black active:border-green-600' : ' hover:border-green-300 hover:text-green-300 active:text-green-300 text-white active:border-green-300'}`}>
                            تلاش مجدد
                            <MdRefresh />
                        </span>
                    </div>
                }
                {
                    succeess &&
                    <div dir="rtl" className={`absolute ${succeess ? 'notificOpen' : ''} ${wantOut ? 'notificOut' : ''} bottom-10 right-5 bg-green-600 text-white text-xl px-12 py-4 sm:text-2xl font-serif rounded-xl`}>
                        <span className="">یاد داشت اضافه شد !</span>
                    </div>
                }
            </div>
        )
    }

}