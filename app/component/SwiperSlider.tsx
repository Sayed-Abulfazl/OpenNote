"use client"

import { Swiper, SwiperSlide } from 'swiper/react'

import 'swiper/css'
import 'swiper/css/effect-coverflow'
import 'swiper/css/pagination'
import 'swiper/css/navigation'

import { Autoplay, EffectCoverflow, } from 'swiper/modules'
import { useState } from 'react'
import ShowPictureFullPage from './ShowPictureFullPage'
import Image from 'next/image'

export default function SwiperSlider({ srcs }) {
    const [showImage, setShowImage] = useState<string | object | null>(null);
    return (
        <div>
            <Swiper
                modules={[Autoplay, EffectCoverflow]}  // use from what functionalities
                spaceBetween={30}  // spacebetween slides
                slidesPerView={1}  // number of slides in a time or page
                loop={true}  // run at last to first
                centeredSlides={true}  // start from center
                effect={'coverflow'} // is mode of slider
                grabCursor={true}  // show hand on slides
                coverflowEffect={{
                    rotate: 0,
                    stretch: 0,
                    depth: 100,
                    modifier: 3,
                }}
                autoplay={{
                    delay: 3000,
                    disableOnInteraction: false
                }}
            >
                {srcs.map((src, index) => (
                    <SwiperSlide key={index}>
                        <Image src={src} width={100} height={100} alt={src} onClick={() => setShowImage(src)} className="h-auto w-full object-cover" />
                    </SwiperSlide>
                ))}
            </Swiper>

            {showImage && <ShowPictureFullPage toggle={setShowImage} src={showImage} /> }
        </div >
    )
}