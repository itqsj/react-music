import React, { useEffect } from 'react';
import style from './css/playDetail.module.less';

interface OdragInt extends HTMLDivElement {
    timer: NodeJS.Timeout;
}

interface EventInt extends Event {
    wheelDelta: number;
    detail: number;
}
function PlayDetail() {
    useEffect(() => {
        let radius = 240; // how big of the radius
        const autoRotate = true; // auto rotate or not
        const rotateSpeed = -60; // unit: seconds/360 degrees
        const imgWidth = 120; // width of images (unit: px)
        const imgHeight = 170; // height of images (unit: px)

        setTimeout(init, 1000);

        const odrag = document.getElementById(
            'drag_container',
        ) as unknown as OdragInt;
        const ospin: HTMLDivElement = document.getElementById(
            'spin_container',
        ) as HTMLDivElement;
        const aImg = ospin.getElementsByTagName('img');
        const aVid = ospin.getElementsByTagName('video');
        const aEle = [...aImg, ...aVid]; // combine 2 arrays

        // Size of images
        ospin.style.width = imgWidth + 'px';
        ospin.style.height = imgHeight + 'px';

        // Size of ground - depend on radius
        const ground: HTMLDivElement = document.getElementById(
            'ground',
        ) as HTMLDivElement;
        ground.style.width = radius * 3 + 'px';
        ground.style.height = radius * 3 + 'px';

        function init(delayTime: number) {
            for (let i = 0; i < aEle.length; i++) {
                aEle[i].style.transform =
                    'rotateY(' +
                    i * (360 / aEle.length) +
                    'deg) translateZ(' +
                    radius +
                    'px)';
                aEle[i].style.transition = 'transform 1s';
                aEle[i].style.transitionDelay = (delayTime ||
                    (aEle.length - i) / 4 + 's') as string;
            }
        }

        function applyTranform(obj: OdragInt) {
            // Constrain the angle of camera (between 0 and 180)
            if (tY > 180) tY = 180;
            if (tY < 0) tY = 0;

            // Apply the angle
            obj.style.transform =
                'rotateX(' + -tY + 'deg) rotateY(' + tX + 'deg)';
        }

        function playSpin(yes: boolean) {
            ospin.style.animationPlayState = yes ? 'running' : 'paused';
        }

        let sX,
            sY,
            nX,
            nY,
            desX = 0,
            desY = 0,
            tX = 0,
            tY = 10;

        // auto spin
        if (autoRotate) {
            const animationName = rotateSpeed > 0 ? 'spin' : 'spinRevert';
            ospin.style.animation = `${animationName} ${Math.abs(
                rotateSpeed,
            )}s infinite linear`;
        }

        // setup events
        document.onpointerdown = function (e) {
            clearInterval(odrag.timer);
            e = e || window.event;
            let sX = e.clientX,
                sY = e.clientY;

            this.onpointermove = function (e) {
                e = e || window.event;
                const nX = e.clientX,
                    nY = e.clientY;
                desX = nX - sX;
                desY = nY - sY;
                tX += desX * 0.1;
                tY += desY * 0.1;
                applyTranform(odrag);
                sX = nX;
                sY = nY;
            };

            this.onpointerup = function (e) {
                odrag.timer = setInterval(function () {
                    desX *= 0.95;
                    desY *= 0.95;
                    tX += desX * 0.1;
                    tY += desY * 0.1;
                    applyTranform(odrag);
                    // playSpin(true);
                    // if (Math.abs(desX) < 0.5 && Math.abs(desY) < 0.5) {
                    //     clearInterval(odrag.timer);
                    //     playSpin(true);
                    // }
                }, 17);
                this.onpointermove = this.onpointerup = null;
            };

            return false;
        };

        document.onmousewheel = function (e: EventInt) {
            e = e || window.event;
            const d = e.wheelDelta / 20 || -e.detail;
            radius += d;
            init(1);
        };
    });

    return (
        <div className={style.page}>
            <div className={style.page_animat}>
                <div id="drag_container">
                    <div id="spin_container">
                        <img
                            src="https://images.pexels.com/photos/206395/pexels-photo-206395.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
                            alt=""
                        />
                        <img
                            src="https://images.pexels.com/photos/1391498/pexels-photo-1391498.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
                            alt=""
                        />
                        <img
                            src="https://images.pexels.com/photos/1382731/pexels-photo-1382731.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
                            alt=""
                        />
                        <img
                            src="https://images.pexels.com/photos/1758144/pexels-photo-1758144.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
                            alt=""
                        />
                        <img
                            src="https://images.pexels.com/photos/1382734/pexels-photo-1382734.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
                            alt=""
                        />
                        <img
                            src="https://images.pexels.com/photos/1462636/pexels-photo-1462636.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
                            alt=""
                        />

                        <a
                            target="_blank"
                            href="https://images.pexels.com/photos/139829/pexels-photo-139829.jpeg"
                        >
                            <img
                                src="https://images.pexels.com/photos/139829/pexels-photo-139829.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
                                alt=""
                            />
                        </a>

                        <video controls loop>
                            <source
                                src="https://player.vimeo.com/external/322244668.sd.mp4?s=338c48ac2dfcb1d4c0689968b5baf94eee6ca0c1&profile_id=165&oauth2_token_id=57447761"
                                type="video/mp4"
                            />
                        </video>

                        <p>3D Tiktok Carousel</p>
                    </div>
                    <div id="ground"></div>
                </div>

                <div id="music_container"></div>
            </div>
            <div className={style.page_lyric}>123</div>
        </div>
    );
}

export default PlayDetail;
