import React from 'react';

import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Pagination } from 'swiper';

import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';

import style from './carousel.module.less';

function Carousel() {
    return (
        <Swiper
            effect={'coverflow'}
            grabCursor={true}
            centeredSlides={true}
            slidesPerView={'auto'}
            coverflowEffect={{
                rotate: 50,
                stretch: 0,
                depth: 100,
                modifier: 1,
                slideShadows: true,
            }}
            loop={true}
            pagination={true}
            modules={[EffectCoverflow, Pagination]}
            className={style.swiper}
        >
            <SwiperSlide className={style.swiper_slide}>
                <img
                    className={style.swiper_img}
                    src="https://swiperjs.com/demos/images/nature-1.jpg"
                />
            </SwiperSlide>
            <SwiperSlide className={style.swiper_slide}>
                <img
                    className={style.swiper_img}
                    src="https://swiperjs.com/demos/images/nature-2.jpg"
                />
            </SwiperSlide>
            <SwiperSlide className={style.swiper_slide}>
                <img
                    className={style.swiper_img}
                    src="https://swiperjs.com/demos/images/nature-3.jpg"
                />
            </SwiperSlide>
            <SwiperSlide className={style.swiper_slide}>
                <img
                    className={style.swiper_img}
                    src="https://swiperjs.com/demos/images/nature-4.jpg"
                />
            </SwiperSlide>
            <SwiperSlide className={style.swiper_slide}>
                <img
                    className={style.swiper_img}
                    src="https://swiperjs.com/demos/images/nature-5.jpg"
                />
            </SwiperSlide>
            <SwiperSlide className={style.swiper_slide}>
                <img
                    className={style.swiper_img}
                    src="https://swiperjs.com/demos/images/nature-6.jpg"
                />
            </SwiperSlide>
            <SwiperSlide className={style.swiper_slide}>
                <img
                    className={style.swiper_img}
                    src="https://swiperjs.com/demos/images/nature-7.jpg"
                />
            </SwiperSlide>
            <SwiperSlide className={style.swiper_slide}>
                <img
                    className={style.swiper_img}
                    src="https://swiperjs.com/demos/images/nature-8.jpg"
                />
            </SwiperSlide>
            <SwiperSlide className={style.swiper_slide}>
                <img
                    className={style.swiper_img}
                    src="https://swiperjs.com/demos/images/nature-9.jpg"
                />
            </SwiperSlide>
        </Swiper>
    );
}

export default Carousel;
