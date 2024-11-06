document.addEventListener('DOMContentLoaded', () => {

    const contentAnimationModule = () => {

        const heroUpperTitle = document.querySelector('.hero__title-upper');
        const heroLowerTitle = document.querySelector('.hero__title-lower');

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
                    ease: "power4.out",
                    scrollTrigger: {
                        trigger: title,
                        start: "top 80%",
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
                y: '-80vh',       
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

        gsap.fromTo('.crackedwall__result',
            { 
                opacity: 0,
            }, 
            {
                opacity: 1,
                duration: 0.8,  
                delay: 15,   
                scrollTrigger: {
                    trigger: '.crackedwall',
                    start: "center center",
                    end: 'bottom bottom',
                    toggleActions: "play none none reverse",
                    scrub: true
                }
            }
        );



        // const crackedWallContainer = document.querySelector('.crackedwall__overlay');

        // const frameWidth = 1920; 
        // const frameHeight = 1080; 
        // const totalFrames = 70; 
        // const framesPerRow = 10; 

        // gsap.to({ currentFrame: 0 }, {
        //     currentFrame: totalFrames - 1,
        //     duration: 5,
        //     ease: 'none',
        //     roundProps: "currentFrame",
        //     onUpdate: function () {

        //         const frameIndex = Math.floor(this.targets()[0].currentFrame); 

        //         if (frameIndex < 0 || frameIndex >= totalFrames) return;

        //         const row = Math.floor(frameIndex / framesPerRow); 
        //         const col = frameIndex % framesPerRow; 

        //         const posX = -(col * frameWidth); 
        //         const posY = -(row * frameHeight);

        //         crackedWallContainer.style.backgroundPosition = `${posX}px ${posY}px`;
        //     },
        //     scrollTrigger: {
        //         trigger: '.crackedwall',
        //         start: 'top top',
        //         // end: 'bottom bottom',
        //         scrub: true,
        //         pin: true,
        //     }
        // });

        const crackedWallContainer = document.querySelector('.crackedwall__overlay');

        const totalFrames = 70; 
        const framesPerRow = 10; 
        const frameWidth = 1920;
        const frameHeight = 1080;

        // Масштабируем контейнер в зависимости от ширины окна
        function updateScale() {
            const scale = window.innerWidth / frameWidth;
            crackedWallContainer.style.transform = `translateX(-50%) scale(${scale})`;
        }

        // Анимация с GSAP
        gsap.to({ currentFrame: 0 }, {
            currentFrame: totalFrames - 1,
            duration: 10,
            // delay: 6,
            ease: 'none',
            roundProps: "currentFrame",
            onUpdate: function () {
                const frameIndex = Math.floor(this.targets()[0].currentFrame); 

                if (frameIndex < 0 || frameIndex >= totalFrames) return;

                const row = Math.floor(frameIndex / framesPerRow); 
                const col = frameIndex % framesPerRow; 

                const posX = -(col * frameWidth); 
                const posY = -(row * frameHeight);

                crackedWallContainer.style.backgroundPosition = `${posX}px ${posY}px`;
            },
            scrollTrigger: {
                trigger: '.section--6',
                start: 'top top',
                end: 'bottom bottom',
                scrub: true,
                pin: true,
            }
        });

        window.addEventListener('resize', updateScale);
        updateScale(); // Первоначальный вызов для установки масштаба

    };

    const heroVideoModule = () => {
        const movingBlock = document.getElementById('video-play');
        const video = document.getElementById('player');
        const progressBar = document.getElementById('progress-bar');
        const postVideoContent = document.getElementById('main');
        const skipVideoButton = document.getElementById('skip-button');
        const videoWrapper = document.getElementById('video-wrapper');

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
            requestAnimationFrame(updateVideoProgress);
        };
    
        const videoEndedEvent = (e) => {
            e.preventDefault();
            e.stopPropagation();
    
            progressBar.style.width = '0%';
            video.pause();
            videoWrapper.style.display = 'none';
            postVideoContent.classList.add('-js-visible');
    
            document.removeEventListener('mousemove', rotatingPlayButton);
    
            contentAnimationModule();
        };

        initAnimation();

        window.innerWidth <= 1024 ? contentAnimationModule() : '';
    
        skipVideoButton ? skipVideoButton.addEventListener('click', videoEndedEvent) : '';
        movingBlock ? movingBlock.addEventListener('click', movingBlockClickEvent) : '';
        video ? video.addEventListener('timeupdate', videoTimeUpdateEvent) : '';
        video ? video.addEventListener('ended', videoEndedEvent) : '';
        document.addEventListener('mousemove', rotatingPlayButton);
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
    
    heroVideoModule();
    showNextScreen();

});