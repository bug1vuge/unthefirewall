document.addEventListener('DOMContentLoaded', () => {

    const checkCurrentDevice = () => {

        const video = document.querySelector('.foreground');

        const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
        const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;

        isSafari || isIOS ? video.classList.add('-js-hidden') : video.classList.remove('-js-hidden');

    };

    const showNextScreen = () => {

        const slideButton = document.querySelector('.slide-button');

        let scrollToValue = window.innerHeight;

        const slideButtonEvent = () => {

            window.scrollTo({
                top: scrollToValue,
                behavior: 'smooth'
            });

            scrollToValue += window.innerHeight;

        };
    
        slideButton.addEventListener('click', slideButtonEvent);

    };

    const contentAnimationModule = () => {

        const heroUpperTitle = document.querySelector('.hero__title-upper');
        const heroLowerTitle = document.querySelector('.hero__title-lower');

        const svgUse = document.querySelector('.crackedwall__overlay svg use');

        const totalFrames = 70; 
        const indexMinValue = 14;

        const heroUpperTitleHeight = heroUpperTitle.offsetHeight;
        const heroLowerTitleHeight = heroLowerTitle.offsetHeight;

        heroUpperTitle.style.height = 0;
        heroLowerTitle.style.height = 0;

        gsap.registerPlugin(ScrollTrigger);

        gsap.to(".texture1", {
            scrollTrigger: {
                trigger: ".section--2",
                start: "top top",
                scrub: true
            },
            rotate: 45,
            scale: 3,
            duration: 2.2
        });

        gsap.to(".texture2", {
            scrollTrigger: {
                trigger: ".section--2",
                start: "top top",
                scrub: true
            },
            rotate: 20,
            scale: 2,
            duration: 2.2
        });

        gsap.to(".hero__content", {
            scrollTrigger: {
                trigger: ".section--2",
                start: "top top",
                scrub: true
            },
            opacity: 0,
            rotate: 10,
            scale: 10,
            duration: 2
        });

        gsap.to('.slide-button', {
            duration: 1.2,
            delay: 1.5,
            opacity: 1,
            scale: 1
        });

        gsap.fromTo('.slide-button', 
            {
                opacity: 1,
            }, 
            {
                opacity: 0,
                delay: 0,
                scrollTrigger: {
                    trigger: ".divider",
                    end: "bottom bottom",
                    toggleActions: "play reverse play reverse",
                    scrub: true
                },
            }
        );

        gsap.to(heroUpperTitle, {
            height: heroUpperTitleHeight, 
            duration: 0.6,
            delay: 1,
            ease: "power1.out"
        });

        gsap.to(heroLowerTitle, {
            height: heroLowerTitleHeight, 
            duration: 0.6,
            delay: 1,
            ease: "power1.out"
        });

        gsap.to('.hero__subtitle', {
            duration: 0.6,
            delay: 1,
            opacity: 1,
        });

        gsap.fromTo('.headlines', 
            { 
                scale: 1,
            }, 
            {
                rotate: 10,
                scale: 10,
                duration: 2.2,
                scrollTrigger: {
                    trigger: ".divider",
                    start: "40% 20%",
                    toggleActions: "play reverse play reverse",
                    scrub: true
                },
            }
        );

        gsap.utils.toArray(".headline").forEach((block, index) => {
            gsap.fromTo(block, 
                { 
                    opacity: 0, 
                }, 
                { 
                    opacity: 1, 
                    duration: 2.2, 
                    scrollTrigger: {
                        trigger: ".section--1",
                        start: "bottom+=20vh bottom",
                        toggleActions: "play reverse play reverse",
                        scrub: true,
                    },
                    ease: "power2.out"
                }
            );
        });

        gsap.utils.toArray(".section__title").forEach((title) => {
            gsap.fromTo(
                title,
                { y: '10vh'}, 
                {
                    y: '-10vh',       
                    delay: 1,
                    duration: 2,
                    ease: "power4.inOut",
                    scrollTrigger: {
                        trigger: '.section',
                        start: "top top",
                        scrub: true
                    }
                }
            );
        });

        gsap.utils.toArray(".section__title--anim").forEach((title, index) => {

            const lines = title.querySelectorAll("div");
        
            gsap.fromTo(
                lines,
                { opacity: 0 },
                {
                    opacity: 1,
                    duration: 1,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: title,
                        start: "top 100%",
                        toggleActions: "play none none reverse",
                        scrub: true 
                    }
                }
            );
        });

        gsap.fromTo('.title-reversed',
            { 
                y: '-10vh'
            }, 
            {
                y: '-60vh',       
                duration: 4,
                ease: "power4.out",
                scrollTrigger: {
                    trigger: '.section--5',
                    start: "bottom bottom",
                    scrub: true
                }
            }
        );

        gsap.fromTo('.crackedwall__title',
            { 
                opacity: 1,
            }, 
            {
                opacity: 0,
                duration: 0.8,  
                delay: 15,   
                scrollTrigger: {
                    trigger: '.crackedwall',
                    start: "top top",
                    end: 'center center',
                    toggleActions: "play none none reverse",
                    scrub: true
                }
            }
        );

        gsap.fromTo('.crackedwall__content',
            { 
                opacity: 0,
            }, 
            {
                opacity: 1,
                duration: 0.8,  
                delay: 30,
                scrollTrigger: {
                    trigger: '.crackedwall',
                    start: "center center",
                    toggleActions: "play none none reverse",
                    scrub: true
                }
            }
        );

        gsap.to({ currentFrame: 0 }, {
            currentFrame: totalFrames - 1,
            duration: 60,
            ease: 'power1.inOut',
            roundProps: "currentFrame",
            onUpdate: function () {
                const frameIndex = Math.floor(this.targets()[0].currentFrame) + indexMinValue;
                const formattedFrameIndex = String(frameIndex).padStart(5, '0'); 
                svgUse.setAttribute('xlink:href', `./assets/sprite-sheet/sprite.svg#Crack_alpha_${formattedFrameIndex}`);
            },
            scrollTrigger: {
                trigger: '.section--6',
                start: 'top top',
                end: 'bottom bottom',
                scrub: true,
                pin: true,
                snap: {
                    snapTo: "labels", 
                    duration: {min: 0.2, max: 0.6}, 
                    ease: "power1.inOut"
                }
            }
        });

    };

    // const heroVideoModule = () => {
    //     const movingBlock = document.getElementById('video-play');
    //     const video = document.getElementById('player');
    //     const progressBar = document.getElementById('progress-bar');
    //     const postVideoContent = document.getElementById('main');
    //     const skipVideoButton = document.getElementById('skip-button');
    //     const videoWrapper = document.getElementById('video-wrapper');
    //     let isVideoEndingHandled = false;
    
    //     const initAnimation = () => {
    //         gsap.to('.video__player', {
    //             duration: 0.6,
    //             delay: 0.6,
    //             opacity: 1 
    //         });
    
    //         gsap.to('.video__skip', {
    //             bottom: '40px',
    //             delay: 1,
    //             duration: 1, 
    //             ease: 'power2.out' 
    //         });
    //     };
    
    //     const rotatingPlayButton = (event) => {
    //         const mouseX = event.clientX;
    //         const mouseY = event.clientY;
    
    //         const movingBlockWidth = movingBlock.offsetWidth / 2;
    //         const movingBlockHeight = movingBlock.offsetHeight / 2;
    
    //         movingBlock.style.transform = `translate(${mouseX - movingBlockWidth}px, ${mouseY - movingBlockHeight}px)`;
    
    //         const movingRect = movingBlock.getBoundingClientRect();
    //         const targetRect = skipVideoButton.getBoundingClientRect();
    
    //         const isIntersecting = !(
    //             movingRect.right < targetRect.left ||
    //             movingRect.left > targetRect.right ||
    //             movingRect.bottom < targetRect.top ||
    //             movingRect.top > targetRect.bottom
    //         );
    
    //         if (video.paused) {
    //             movingBlock.style.opacity = isIntersecting ? '0' : '1';
    //             if (!isIntersecting) {
    //                 movingBlock.classList.remove('-js-hidden');
    //             }
    //         } else {
    //             hideMovingBlock();
    //         }
    //     };
    
    //     const hideMovingBlock = () => {
    //         movingBlock.style.opacity = '0';
    //         movingBlock.classList.add('-js-hidden');
    //     };
    
    //     const movingBlockClickEvent = () => {
    //         video.play();
    //         hideMovingBlock();
    //     };
    
    //     const updateVideoProgress = () => {
    //         const progress = (video.currentTime / video.duration) * 100;
    //         progressBar.style.width = `${progress}%`;
    //     };
    
    //     const videoTimeUpdateEvent = () => {
    //         if (!isVideoEndingHandled && video.duration - video.currentTime <= 3) {
    //             isVideoEndingHandled = true;
    //             handleVideoEnding();
    //         }
    //         requestAnimationFrame(updateVideoProgress);
    //     };
    
    //     const handleVideoEnding = () => {
    //         videoWrapper.style.visibility = 'hidden';
    //         videoWrapper.style.position = 'absolute';
    //         movingBlock.style.visibility = 'hidden';
    
    //         postVideoContent.classList.add('-js-visible');
    //         contentAnimationModule();
    
    //         setTimeout(() => {
    //             video.pause();
    //         }, 2500);
    //     };
    
    //     initAnimation();
    
    //     window.innerWidth <= 1024 ? contentAnimationModule() : '';
    
    //     skipVideoButton ? skipVideoButton.addEventListener('click', handleVideoEnding) : '';
    //     movingBlock ? movingBlock.addEventListener('click', movingBlockClickEvent) : '';
    //     video ? video.addEventListener('timeupdate', videoTimeUpdateEvent) : '';
    //     document.addEventListener('mousemove', rotatingPlayButton);
    // };
    
    // const heroVideoModule = () => {
    //     const movingBlock = document.getElementById('video-play');
    //     const video = document.getElementById('player');
    //     const progressBar = document.getElementById('progress-bar');
    //     const postVideoContent = document.getElementById('main');
    //     const skipVideoButton = document.getElementById('skip-button');
    //     const videoWrapper = document.getElementById('video-wrapper');
    //     let isContentVisible = false;
    
    //     const initAnimation = () => {
    //         gsap.to('.video__player', {
    //             duration: 0.6,
    //             delay: 0.6,
    //             opacity: 1 
    //         });
    
    //         gsap.to('.video__skip', {
    //             bottom: '40px',
    //             delay: 1,
    //             duration: 1, 
    //             ease: 'power2.out' 
    //         });
    //     };
    
    //     const rotatingPlayButton = (event) => {
    //         const mouseX = event.clientX;
    //         const mouseY = event.clientY;
    
    //         const movingBlockWidth = movingBlock.offsetWidth / 2;
    //         const movingBlockHeight = movingBlock.offsetHeight / 2;
    
    //         movingBlock.style.transform = `translate(${mouseX - movingBlockWidth}px, ${mouseY - movingBlockHeight}px)`;
    
    //         const movingRect = movingBlock.getBoundingClientRect();
    //         const targetRect = skipVideoButton.getBoundingClientRect();
    
    //         const isIntersecting = !(
    //             movingRect.right < targetRect.left ||
    //             movingRect.left > targetRect.right ||
    //             movingRect.bottom < targetRect.top ||
    //             movingRect.top > targetRect.bottom
    //         );
    
    //         if (video.paused) {
    //             movingBlock.style.opacity = isIntersecting ? '0' : '1';
    //             if (!isIntersecting) {
    //                 movingBlock.classList.remove('-js-hidden');
    //             }
    //         } else {
    //             hideMovingBlock();
    //         }
    //     };
    
    //     const hideMovingBlock = () => {
    //         movingBlock.style.opacity = '0';
    //         movingBlock.classList.add('-js-hidden');
    //     };
    
    //     const movingBlockClickEvent = () => {
    //         video.play();
    //         hideMovingBlock();
    //     };
    
    //     const updateVideoProgress = () => {
    //         const progress = (video.currentTime / video.duration) * 100;
    //         progressBar.style.width = `${progress}%`;
    //     };
    
    //     const videoTimeUpdateEvent = () => {
    //         if (!isContentVisible && video.currentTime >= 60) {
    //             isContentVisible = true;
    //             showContentAndContinueVideo();
    //         }
    //         requestAnimationFrame(updateVideoProgress);
    //     };
    
    //     const showContentAndContinueVideo = () => {
    //         videoWrapper.style.display = 'none'; // Полностью скрываем видео
    //         postVideoContent.classList.add('-js-visible'); // Показываем основной контент
    //         contentAnimationModule(); // Запускаем анимацию контента
    
    //         setTimeout(() => {
    //             video.pause(); // Останавливаем видео через 5 секунд
    //         }, 5000);
    //     };
    
    //     const handleVideoEnding = () => {
    //         videoWrapper.style.display = 'none'; // Скрываем видео сразу
    //         movingBlock.style.visibility = 'hidden';
    
    //         postVideoContent.classList.add('-js-visible');
    //         contentAnimationModule();
    
    //         setTimeout(() => {
    //             video.pause();
    //         }, 2500);
    //     };
    
    //     initAnimation();
    
    //     window.innerWidth <= 1024 ? contentAnimationModule() : '';
    
    //     skipVideoButton ? skipVideoButton.addEventListener('click', handleVideoEnding) : '';
    //     movingBlock ? movingBlock.addEventListener('click', movingBlockClickEvent) : '';
    //     video ? video.addEventListener('timeupdate', videoTimeUpdateEvent) : '';
    //     document.addEventListener('mousemove', rotatingPlayButton);
    // };
    
    const heroVideoModule = () => {
        const movingBlock = document.getElementById('video-play');
        const video = document.getElementById('player');
        const progressBar = document.getElementById('progress-bar');
        const postVideoContent = document.getElementById('main');
        const skipVideoButton = document.getElementById('skip-button');
        const videoWrapper = document.getElementById('video-wrapper');
        let isContentVisible = false;
    
        const initAnimation = () => {
            gsap.to('.video__player', {
                duration: 0.6,
                delay: 0.6,
                opacity: 1 
            });
    
            gsap.to('.video__skip', {
                bottom: '40px',
                delay: 1,
                duration: 1, 
                ease: 'power2.out' 
            });
        };
    
        const rotatingPlayButton = (event) => {
            const mouseX = event.clientX;
            const mouseY = event.clientY;
    
            const movingBlockWidth = movingBlock.offsetWidth / 2;
            const movingBlockHeight = movingBlock.offsetHeight / 2;
    
            movingBlock.style.transform = `translate(${mouseX - movingBlockWidth}px, ${mouseY - movingBlockHeight}px)`;
    
            const movingRect = movingBlock.getBoundingClientRect();
            const targetRect = skipVideoButton.getBoundingClientRect();
    
            const isIntersecting = !(
                movingRect.right < targetRect.left ||
                movingRect.left > targetRect.right ||
                movingRect.bottom < targetRect.top ||
                movingRect.top > targetRect.bottom
            );
    
            if (video.paused) {
                movingBlock.style.opacity = isIntersecting ? '0' : '1';
                if (!isIntersecting) {
                    movingBlock.classList.remove('-js-hidden');
                }
            } else {
                hideMovingBlock();
            }
        };
    
        const hideMovingBlock = () => {
            movingBlock.style.opacity = '0';
            movingBlock.classList.add('-js-hidden');
        };
    
        const movingBlockClickEvent = () => {
            video.play();
            hideMovingBlock();
        };
    
        const updateVideoProgress = () => {
            const progress = (video.currentTime / video.duration) * 100;
            progressBar.style.width = `${progress}%`;
        };
    
        const videoTimeUpdateEvent = () => {
            if (!isContentVisible && video.currentTime >= 60) {
                isContentVisible = true;
                showContentAndContinueVideo();
            }
            requestAnimationFrame(updateVideoProgress);
        };
    
        const showContentAndContinueVideo = () => {
            videoWrapper.style.display = 'none'; // Полностью скрываем видео
            postVideoContent.classList.add('-js-visible'); // Показываем основной контент
            contentAnimationModule(); // Запускаем анимацию контента
    
            setTimeout(() => {
                video.pause(); // Останавливаем видео через 5 секунд
            }, 5000);
        };
    
        const handleVideoEnding = () => {
            // Проверяем, воспроизводится ли видео
            if (!video.paused) {
                video.pause(); // Сразу останавливаем видео, если оно запущено
            }
    
            videoWrapper.style.display = 'none'; // Скрываем видео сразу
            movingBlock.style.visibility = 'hidden';
    
            postVideoContent.classList.add('-js-visible');
            contentAnimationModule();
        };
    
        initAnimation();
    
        window.innerWidth <= 1024 ? contentAnimationModule() : '';
    
        skipVideoButton ? skipVideoButton.addEventListener('click', handleVideoEnding) : '';
        movingBlock ? movingBlock.addEventListener('click', movingBlockClickEvent) : '';
        video ? video.addEventListener('timeupdate', videoTimeUpdateEvent) : '';
        document.addEventListener('mousemove', rotatingPlayButton);
    };
    

    checkCurrentDevice();
    showNextScreen();
    heroVideoModule();

});