document.addEventListener('DOMContentLoaded', () => {

    const videoAnimationModule = () => {

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

    const contentAnimationModule = () => {

        const heroUpperTitle = document.querySelector('.hero__title-upper');
        const heroLowerTitle = document.querySelector('.hero__title-lower');

        const heroUpperTitleHeight = heroUpperTitle.offsetHeight;
        const heroLowerTitleHeight = heroLowerTitle.offsetHeight;

        heroUpperTitle.style.height = 0;
        heroLowerTitle.style.height = 0;

        gsap.registerPlugin(ScrollTrigger);

        gsap.to('.hero__slide-button', {
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

        

        gsap.utils.toArray(".section__title").forEach((title, index) => {

            const lines = title.querySelectorAll("div");
        
            gsap.fromTo(
                lines,
                { opacity: 0 },
                {
                    opacity: 1,
                    duration: 1,
                    ease: "power2.out",
                    delay: 0.2,
                    stagger: 0.1,
                    scrollTrigger: {
                        trigger: title,
                        start: "top 70%",
                        toggleActions: "play none none reverse",
                        scrub: true 
                    }
                }
            );
        });

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
                        start: "bottom bottom",
                        toggleActions: "play reverse play reverse",
                        scrub: true,
                    },
                    ease: "power2.out"
                }
            );
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
                    start: "40% 15%",
                    toggleActions: "play reverse play reverse",
                    scrub: true
                },
            }
        );



        const wallImages = [];
        
        for (let i = 14; i <= 83; i++) {
            wallImages.push(`./assets/images/cracked-wall/Crack_alpha_${String(i).padStart(5, '0')}.png`);
        }

        const totalImagesCount = wallImages.length;
        let previousIndex = -1;
        let currentBackground = document.getElementById("background1");
        let nextBackground = document.getElementById("background2");

        wallImages.forEach(src => {
            const img = new Image();
            img.src = src;
        });

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: ".section--6",
                start: "center+=100vh center",
                end: "bottom bottom",
                scrub: 0.1, 
                toggleActions: "play reverse play reverse",
            }
        });

        tl.to({}, {
            onUpdate: function() {
                const progress = this.progress();
                const index = Math.min(Math.floor(progress * totalImagesCount), totalImagesCount - 1);

                if (index !== previousIndex) {
                    previousIndex = index;

                    nextBackground.style.backgroundImage = `url(${wallImages[index]})`;
                    nextBackground.style.opacity = 1;

                    currentBackground.style.opacity = 1;

                    [currentBackground, nextBackground] = [nextBackground, currentBackground];
                }
            }
        });

        gsap.utils.toArray(".result__title").forEach((title) => {
            gsap.fromTo(
                title,
                { y: '20vh'}, 
                {
                    y: '0',       
                    delay: 1,
                    duration: 3,
                    ease: "power4.out",
                    scrollTrigger: {
                        trigger: title,
                        start: "top 80%",
                        scrub: true
                    }
                }
            );
        });

        gsap.fromTo('.section__title--reversed', 
            { 
                y: '0',
                opacity: 1
            }, 
            {
                y: '-100vh',
                opacity: 0,
                duration: 1,
                scrollTrigger: {
                    trigger: ".section--5",
                    start: "bottom bottom",
                    toggleActions: "play reverse play reverse",
                    scrub: true
                },
            }
        );
        


        gsap.fromTo('.crackedwall__title', 
            { 
                y: '-2vh',
                opacity: 1
            }, 
            {
                y: 0,
                opacity: 0,
                duration: 1,
                delay: 1,
                scrollTrigger: {
                    trigger: ".crackedwall",
                    start: "center center",
                    end: 'bottom bottom',
                    toggleActions: "play reverse play reverse",
                    scrub: true
                },
            }
        );

        gsap.fromTo('.result', 
            { 
                top: '100vh',
            }, 
            {
                top: 0,
                duration: 1,
                scrollTrigger: {
                    trigger: ".crackedwall",
                    start: "center center",
                    toggleActions: "play reverse play reverse",
                    scrub: true
                },
            }
        );
    };

    const heroVideoModule = () => {
        
        const movingBlock = document.getElementById('video-play');
        const video = document.getElementById('player');
        const progressBar = document.getElementById('progress-bar');
        const postVideoContent = document.getElementById('main');
        const skipVideoButton = document.getElementById('skip-button');
        const videoWrapper = document.getElementById('video-wrapper');

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
        
            movingBlock.style.opacity = isIntersecting ? '0' : '1';
        };

        const hideMovingBlock = () => {

            movingBlock.style.opacity = '0'; 

            setTimeout(() => { movingBlock.classList.add('-js-hidden') }, 300); 

        };

        const movingBlockClickEvent = () => { 

            video.play();
            hideMovingBlock();

        };

        const updateVideoProgress = () => {

            const progress = (video.currentTime / video.duration) * 100;
            progressBar.style.width = `${progress}%`;

        }

        const videoTimeUpdateEvent = () => { requestAnimationFrame(updateVideoProgress) };

        const videoEndedEvent = () => {

            progressBar.style.width = '0%';
            video.pause();
            videoWrapper.style.display = 'none';
            postVideoContent.classList.add('-js-visible');

            contentAnimationModule();

        };

        
        skipVideoButton.addEventListener('click', videoEndedEvent);
        movingBlock.addEventListener('click', movingBlockClickEvent);
        video.addEventListener('timeupdate', videoTimeUpdateEvent);
        video.addEventListener('ended', videoEndedEvent);

        if (window.innerWidth <= 1024) {

            movingBlock.style.transform = 'translate(-50%, -50%)';

        } else {

            document.addEventListener('mousemove', rotatingPlayButton);

        };

    };

    

    heroVideoModule();
    videoAnimationModule();
});