import Image from "next/image";
import { MdOutlineCloseFullscreen } from "react-icons/md";

export default function ShowPictureFullPage({ src, toggle }) {
    return (
        <div className="inset-0 FCC bg-black fixed z-100">
            <MdOutlineCloseFullscreen
                onClick={() => toggle(null)}
                className="text-4xl text-white cursor-pointer absolute top-6 left-4"
            />
            <Image
                src={src}
                alt="picture"
                width={1000}
                height={1000}
                className="object-cover"
            />
        </div>
    )
}