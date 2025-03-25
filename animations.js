document.addEventListener("DOMContentLoaded", function () {
    // Preloader animation and greetings logic
    const greetings = [
        "ٱلسَّلَامُ عَلَيْكُمْ", "नमस्ते", "Hola", "Bonjour", "Ciao", "Hallo", "こんにちは", "안녕하세요", "你好", "Привет", "Merhaba", "مرحبا"
    ];
    const greetingElement = document.getElementById("greeting");
    let index = 0;

    function showGreeting() {
        if (index < greetings.length) {
            gsap.to(greetingElement, {
                opacity: 0,
                duration: 0.1,
                onComplete: () => {
                    greetingElement.textContent = greetings[index];
                    gsap.to(greetingElement, { opacity: 1, duration: 0.1 });
                    index++;
                    setTimeout(showGreeting, 200);
                }
            });
        } else {
            gsap.to("#preloader", {
                opacity: 0,
                duration: 0.7,
                onComplete: () => {
                    document.getElementById("preloader").style.display = "none";
                    gsap.to("main", { opacity: 1, duration: 0.7 });
                }
            });
        }
    }
    showGreeting();

    // GSAP and ScrollTrigger setup
    gsap.registerPlugin(ScrollTrigger);

    const scroll = new LocomotiveScroll({
        el: document.querySelector("[data-scroll-container]"),
        smooth: true
    });

    // Sync Locomotive Scroll with GSAP ScrollTrigger
    scroll.on("scroll", ScrollTrigger.update);

    ScrollTrigger.scrollerProxy("[data-scroll-container]", {
        scrollTop(value) {
            return arguments.length ? scroll.scrollTo(value, 0, 0) : scroll.scroll.instance.scroll.y;
        },
        getBoundingClientRect() {
            return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
        }
    });

    // Refresh ScrollTrigger when Locomotive Scroll updates
    ScrollTrigger.addEventListener("refresh", () => scroll.update());
    ScrollTrigger.refresh();

    // Apply GSAP animation using Locomotive Scroll
    gsap.to("main nav .name_logo h1", {
        scale: 0.8,
        duration: 0.3,
        ease: "power2.out",
        scrollTrigger: {
            scroller: "[data-scroll-container]",
            start: "top top",
            end: "300px top",
            scrub: 1
        }
    });

    // Sections that trigger animations
    const sections = document.querySelectorAll('.b_section');
    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;

        // Scroll listener that tracks scroll position of each section
        ScrollTrigger.create({
            trigger: section,
            scroller: "[data-scroll-container]",
            start: "top 10%",  // Trigger when section reaches the center of the viewport
            end: "bottom center", // End when section is fully past the center
            scrub: 0.5,  // Adding scrub can make this smoother
            onEnter: () => {
                gsap.to(section, {
                    backgroundColor: "black",
                    ease: "power2.inOut",
                    duration: 0.3
                });

                gsap.to("nav .name_logo h1", {
                    color: "#fff",
                    ease: "power2.inOut",
                    duration: 0.2
                });

                gsap.to("nav .hamburger .line", {
                    backgroundColor: "#fff",
                    ease: "power2.inOut",
                    duration: 0.2
                });

                gsap.to(".icons a i", {
                    color: "#fff",
                    ease: "power2.inOut",
                    duration: 0.2
                });
            },
            onLeave: () => {
                gsap.to(section, {
                    backgroundColor: "transparent",
                    ease: "power2.inOut",
                    duration: 0.3
                });

                gsap.to("nav .name_logo h1", {
                    color: "#000",
                    ease: "power2.inOut",
                    duration: 0.2
                });

                gsap.to("nav .hamburger .line", {
                    backgroundColor: "#000",
                    ease: "power2.inOut",
                    duration: 0.2
                });

                gsap.to(".icons a i", {
                    color: "#000",
                    ease: "power2.inOut",
                    duration: 0.2
                });
            },
            onEnterBack: () => {
                gsap.to(section, {
                    backgroundColor: "black",
                    ease: "power2.inOut",
                    duration: 0.3
                });

                gsap.to("nav .name_logo h1", {
                    color: "#fff",
                    ease: "power2.inOut",
                    duration: 0.2
                });

                gsap.to("nav .hamburger .line", {
                    backgroundColor: "#fff",
                    ease: "power2.inOut",
                    duration: 0.2
                });

                gsap.to(".icons a i", {
                    color: "#fff",
                    ease: "power2.inOut",
                    duration: 0.2
                });
            },
            onLeaveBack: () => {
                gsap.to(section, {
                    backgroundColor: "transparent",
                    ease: "power2.inOut",
                    duration: 0.2
                });

                gsap.to("nav .name_logo h1", {
                    color: "#000",
                    ease: "power2.inOut",
                    duration: 0.2
                });

                gsap.to("nav .hamburger .line", {
                    backgroundColor: "#000",
                    ease: "power2.inOut",
                    duration: 0.2
                });

                gsap.to(".icons a i", {
                    color: "#000",
                    ease: "power2.inOut",
                    duration: 0.2
                });
            }
        });
    });

    // Menu toggle logic
    let menuOpen = false;

    function toggleMenu() {
        menuOpen = !menuOpen;

        // Animate the menu sliding in and out
        gsap.to("#menu", {
            y: menuOpen ? "0%" : "-100%",
            duration: 0.6,
            ease: "power2.inOut"
        });

        // Animate the hamburger into an "X"
        gsap.to(".line:first-child", {
            rotate: menuOpen ? 45 : 0,
            y: menuOpen ? 8 : 0,
            transformOrigin: "center",
            duration: 0.1
        });

        gsap.to(".line:last-child", {
            rotate: menuOpen ? -45 : 0,
            y: menuOpen ? -17 : 0,
            transformOrigin: "center",
            opacity: menuOpen ? 1 : 0,
            duration: 0.1
        });

        // Hide the middle line when menu is open (optional)
        gsap.to(".line:nth-child(2)", {
            opacity: menuOpen ? 0 : 1,
            duration: 0.1
        });

        // Change color of the lines
        gsap.to(".line", {
            backgroundColor: menuOpen ? "var(--Secondary-Color)" : "var(--Primary-Color)",
            duration: 0.3
        });

        gsap.to(".name_logo h1", {
            color: menuOpen ? "var(--tertiary-color)" : "var(--Primary-Color)",
            duration: 0.3
        });

        gsap.to(".icons a i", {
            color: menuOpen ? "var(--Secondary-Color)" : "var(--Primary-Color)",
            duration: 0.5
        });
    }

    // Optional: Add event listener to toggle the menu when the hamburger is clicked
    document.querySelector(".hamburger").addEventListener("click", toggleMenu);
});

function toggleAnswer(clickedElement) {
    var answer = clickedElement.parentElement.nextElementSibling;  // Get the corresponding answer element
    var question = clickedElement;  // The clicked question element

    // Animate the question with GSAP (scale animation or other effects)
    gsap.to(question, { scale: 1.1, duration: 0.3, ease: "power2.out", yoyo: true, repeat: 1 });

    if (answer.style.display === "none" || answer.style.display === "") {
        answer.style.display = "block";
        
        // Animate the answer with GSAP
        gsap.fromTo(answer, 
            { opacity: 0, y: -20 },  // Starting properties
            { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }  // Ending properties
        );
    } else {
        // Animate the answer hiding with GSAP
        gsap.to(answer, 
            { opacity: 0, y: -20, duration: 0.6, ease: "power2.in", onComplete: function() {
                answer.style.display = "none";
            } }
        );
    }
}
document.addEventListener("DOMContentLoaded", function () {
    // Initialize Locomotive Scroll
    const locoScroll = new LocomotiveScroll({
        el: document.querySelector("[data-scroll-container]"), // Ensure this is the correct container
        smooth: true,
    });

    // Sync Locomotive Scroll with GSAP ScrollTrigger
    locoScroll.on("scroll", ScrollTrigger.update);

    // GSAP ScrollTrigger scrollerProxy for Locomotive Scroll
    ScrollTrigger.scrollerProxy("[data-scroll-container]", {
        scrollTop(value) {
            return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
        },
        getBoundingClientRect() {
            return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
        }
    });

    // Refresh ScrollTrigger when Locomotive Scroll updates
    ScrollTrigger.addEventListener("refresh", () => locoScroll.update());
    ScrollTrigger.refresh();

    // Set initial height based on screen width
    let picHeight = window.innerWidth <= 425 ? "800px" : "2000px"; // Adjust height accordingly

    // Parallax effect on .my_pic (Height only)
    gsap.to(".my_pic", {
        height: picHeight,  // Dynamically set height
        ease: "none", // No easing, smooth movement
        scrollTrigger: {
            trigger: ".my_pic",
            scroller: "[data-scroll-container]",
            start: "top bottom", // Trigger when the element enters the viewport
            end: "bottom top",  // End when it leaves the viewport
            scrub: true,  // Scrubbing makes it smooth
        },
    });

    // Listen for window resize to update the height dynamically
    window.addEventListener('resize', () => {
        picHeight = window.innerWidth <= 425 ? "1000px" : "2000px";
        gsap.to(".my_pic", { height: picHeight });
    });

    // Scroll to FAQ section on link click
    document.querySelector('#faq-link').addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector("#faq");

        // Use Locomotive Scroll's scrollTo method
        locoScroll.scrollTo(target);
    });
});
