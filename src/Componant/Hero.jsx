import { useEffect, useRef, useState } from 'react';
import { motion, useAnimation, AnimatePresence } from 'framer-motion';
import Lenis from '@studio-freight/lenis';
import herobg from '../assets/herobg new1.png'
import secondimg from '../assets/secondimg.jpg'
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';

const ProductionWizards = () => {
    const heroBackgroundRef = useRef(null);
    // const heroTitleRef = useRef(null);
    // const heroDescRef = useRef(null);
    // const contactBtnRef = useRef(null);
    const showreelRef = useRef(null);
    const showreelTitleRef = useRef(null);
    const showreelContentRef = useRef(null);
    // const lastScrollY = useRef(0);
    const [ setIsLoading] = useState(true);
    const headingRef = useRef(null);
    const paragraphRef = useRef(null);
    const buttonRef = useRef(null);
    const heroContentRef = useRef(null);
    // const [currentTagIndex, setCurrentTagIndex] = useState(0);

    const tags = ['WEB DEVELOPMENT', 'UI/UX DESIGN', 'GRAPHIC DESIGN'];
    const [heroBgImage, setHeroBgImage] = useState(
        herobg
    );

    useEffect(() => {
        const handleScroll = () => {
            const scrollY = window.scrollY;
            const windowHeight = window.innerHeight;

            // Change hero background when showreel section comes into view
            if (scrollY > windowHeight * 0.5) {
                setHeroBgImage(secondimg);
            } else {
                setHeroBgImage(herobg);
            }

            // Hero content fade out
            if (heroContentRef.current) {
                const opacity = 1 - Math.min(scrollY / (windowHeight * 0.5), 1);
                heroContentRef.current.style.opacity = opacity;
            }

            // Showreel section animations
            if (showreelRef.current) {
                const slideUpAmount = Math.min(scrollY, windowHeight);
                showreelRef.current.style.transform = `translateY(-${slideUpAmount * 0.7}px)`;
            }

            if (scrollY > windowHeight * 0.3 && showreelTitleRef.current) {
                showreelTitleRef.current.style.opacity = '1';
                showreelTitleRef.current.style.transform = 'translateY(0)';
            }

            if (scrollY > windowHeight * 0.9 && showreelContentRef.current) {
                showreelContentRef.current.style.opacity = '1';
                showreelContentRef.current.style.transform = 'translateY(0)';
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        // Set up interval for tag rotation
        const interval = setInterval(() => {
            setCurrentTagIndex((prevIndex) => (prevIndex + 1) % tags.length);
        }, 3000); // Change tag every 3 seconds

        return () => clearInterval(interval);
    }, [tags.length]);

    useEffect(() => {
        // Simulate loading
        const timer = setTimeout(() => {
            setIsLoading(false);
            // Trigger animations after loading
            if (headingRef.current) {
                headingRef.current.classList.add('animate-fadeInUp');
            }
            if (paragraphRef.current) {
                paragraphRef.current.classList.add('animate-fadeInUp');
            }
            if (buttonRef.current) {
                buttonRef.current.classList.add('animate-fadeInUp');
            }
        }, 1500);

        return () => clearTimeout(timer);
    }, []);

    const controls = useAnimation();

    useEffect(() => {
        // Initialize Lenis for smooth scrolling
        const lenis = new Lenis({
            lerp: 0.1,
            smooth: true,
        });

        function raf(time) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }

        requestAnimationFrame(raf);

        // Animation sequence
        const sequence = async () => {
            await controls.start("visible");
        };

        sequence();
    }, [controls]);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.3,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, x: -50 },
        visible: {
            opacity: 1,
            x: 0,
            transition: {
                duration: 0.8,
                ease: [0.6, -0.05, 0.01, 0.99],
            },
        },
    };

    // const fadeInVariants = {
    //     hidden: { opacity: 0 },
    //     visible: {
    //         opacity: 1,
    //         transition: {
    //             duration: 0.8,
    //             ease: "easeInOut",
    //         },
    //     },
    // };

    const [currentTagIndex, setCurrentTagIndex] = useState(0);
    const [displayText, setDisplayText] = useState('');
    const [isTyping, setIsTyping] = useState(true);

    useEffect(() => {
        const tagInterval = setInterval(() => {
            setCurrentTagIndex((prev) => (prev + 1) % tags.length);
        }, 3000); // Change tag every 3 seconds

        return () => clearInterval(tagInterval);
    }, []);

    useEffect(() => {
        setIsTyping(true);
        setDisplayText('');

        const currentTag = tags[currentTagIndex];
        let i = 0;

        const typingInterval = setInterval(() => {
            if (i < currentTag.length) {
                setDisplayText(currentTag.substring(0, i + 1));
                i++;
            } else {
                setIsTyping(false);
                clearInterval(typingInterval);
            }
        }, 100); // Typing speed (adjust as needed)

        return () => clearInterval(typingInterval);
    }, [currentTagIndex]);



    const fadeInVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1 }
    };

    return (
        <div className="bg-black text-white overflow-x-hidden" style={{ height: '300vh' }}>
            {/* Hero Section */}
            <section className="fixed top-0 left-0 h-screen w-full overflow-hidden z-0">
                <div ref={heroBackgroundRef} className="absolute inset-0 z-0 transition-all duration-500">
                    <div className="absolute inset-0 bg-black/30 z-0"></div>
                    <img
                        src={heroBgImage}
                        alt="Technology background"
                        className="w-full h-full object-cover transition-all duration-500"
                        onLoad={() => setIsLoading(false)}
                    />
                </div>

                {/* Hero Content */}
                <div
                    ref={heroContentRef}
                    className="absolute top-0 left-0 w-full h-full flex flex-col justify-center items-center px-5 z-10 transition-opacity duration-500"
                >
                    {/* Left Social Media Bar */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5, duration: 0.8 }}
                        className="hidden md:flex fixed left-0 top-2/3 transform -translate-y-1/2 h-64 w-10 bg-[#D700E6] backdrop-blur-sm shadow-lg rounded-r-xl z-20 flex-col items-center justify-center space-y-6"
                    >
                        <a
                            href="#"
                            className="text-white hover:text-blue-600 transition-colors duration-300"
                        >
                            <FaFacebook className="w-5 h-5" />
                        </a>
                        <a
                            href="#"
                            className="text-white hover:text-blue-400 transition-colors duration-300"
                        >
                            <FaTwitter className="w-5 h-5" />
                        </a>
                        <a
                            href="#"
                            className="text-white hover:text-pink-600 transition-colors duration-300"
                        >
                            <FaInstagram className="w-5 h-5" />
                        </a>
                        <a
                            href="#"
                            className="text-white hover:text-blue-700 transition-colors duration-300"
                        >
                            <FaLinkedin className="w-5 h-5" />
                        </a>
                    </motion.div>

                    <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={containerVariants}
                        className="container mx-auto px-6 md:px-[13rem] py-12 md:py-24"
                    >
                        <div className="max-w-2xl z-10 mx-left">
                            <motion.h1
                                variants={itemVariants}
                                className="mt-[6rem] text-4xl md:text-7xl font-bold text-white leading-tight mb-6"
                            >
                                We Transform <span className="text-gradient-to-br from-customBlue to-customPink">Ideas</span><br />
                                Into <span className="text-[#D700E6]">Technology</span>
                            </motion.h1>

                            <motion.p
                                variants={itemVariants}
                                className="text-gray-200 text-md mb-8 leading-relaxed"
                            >
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
                                incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis
                                nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                            </motion.p>

                            <motion.div
                                variants={fadeInVariants}
                                className="flex mb-10 h-10 relative items-center"
                            >
                                <AnimatePresence mode="wait">
                                    <motion.span
                                        key={tags[currentTagIndex]}
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -20 }}
                                        transition={{ duration: 0.5 }}
                                        className={`px- py-2 rounded-full font-large text-xl relative ${
                                            currentTagIndex === 0 ? 'text-[#D700E6] ' :
                                                currentTagIndex === 1 ? ' text-[#D700E6]' :
                                                    ' text-[#D700E6]'
                                        }`}
                                        style={{
                                            fontFamily: "'Arial Black', sans-serif",
                                            WebkitTextStroke: '1px purple',
                                            textStroke: '1px black',
                                            letterSpacing: '2px'
                                        }}
                                    >
                                        {displayText}
                                        {isTyping && (
                                            <motion.span
                                                className="ml-1"
                                                animate={{ opacity: [0, 1, 0] }}
                                                transition={{ repeat: Infinity, duration: 0.8 }}
                                            >
                                                |
                                            </motion.span>
                                        )}
                                    </motion.span>
                                </AnimatePresence>
                            </motion.div>

                            <motion.div
                                variants={fadeInVariants}
                                className="flex flex-col sm:flex-row gap-4 "
                            >
                                <motion.button
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.8 }}
                                    className=" border-2 border-[#D700E6]    hover:bg-gradient-to-br hover:from-[#2703D9] hover:to-[#D700E6] text-white font-bold py-3 px-8 rounded-full transition duration-300   "
                                >
                                    Contact us
                                </motion.button>
                                <motion.button
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.9 }}
                                    className="border-2 border-transparent  bg-gradient-to-br from-[#2703D9] to-[#D700E6] hover:bg-gradient-to-br hover:from-transparent hover:to-transparent hover:border-[#D700E6] text-white  font-bold py-3 px-8 rounded-full transition duration-300"
                                >
                                    Our Services
                                </motion.button>
                            </motion.div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Showreel Section with Animated Text */}
            <section
                ref={showreelRef}
                className="relative h-[120vh] flex flex-col justify-center z-20 bg-[#190321] transition-transform duration-300 ease-out"
                style={{ top: '100vh' }}
            >
                {/* Animated Text Section */}
                <div className="w-full text-center my-20">
                    <div className="inline-block mx-auto max-w-6xl">
                        <span
                            ref={showreelTitleRef}
                            className="block text-5xl md:text-6xl lg:text-8xl font-bold uppercase opacity-0 translate-y-12 transition-all duration-500 ease-out"
                            style={{
                                fontFamily: '"Oswald", sans-serif',
                                letterSpacing: '0',
                                padding: '0.25em 0 0.325em',
                                textShadow: '0 0 80px rgba(255,255,255,.5)',
                                background: 'url(https://i.ibb.co/RDTnNrT/animated-text-fill.png) repeat-y',
                                WebkitBackgroundClip: 'text',
                                backgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                animation: 'aitf 80s linear infinite',
                                transform: 'translate3d(0,0,0)',
                            }}
                        >
                            HDS DIGITAL SOLUTION
                        </span>
                    </div>
                </div>

                {/* Showreel Content */}
                <div
                    ref={showreelContentRef}
                    className="w-full opacity-0 translate-y-12 transition-all duration-500 ease-out px-4 sm:px-6 lg:px-8"
                >
                    <div className="max-w-7xl mx-auto text-center">
                        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6">
                            Elevating Your Business Through Tailored Solutions.
                        </h1>
                        <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto mb-8">
                            At our agency, we believe that every business has unique challenges and aspirations.
                            That's why we specialize in providing tailored solutions designed.
                        </p>
                        <button className="bg-white hover:bg-gray-200 text-black font-semibold py-3 px-8 rounded-full text-lg transition duration-300 transform hover:scale-105">
                            Know About Us
                        </button>
                    </div>
                </div>
            </section>

            {/* Spacer */}
            <div className="h-screen"></div>

            {/* Animation styles */}
            <style jsx global>{`
                @keyframes aitf {
                    0% { background-position: 0% 50%; }
                    100% { background-position: 100% 50%; }
                }
                @keyframes fadeInUp {
                    from {
                        opacity: 0;
                        transform: translateY(20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                .animate-fadeInUp {
                    animation: fadeInUp 0.8s ease-out forwards;
                }
            `}</style>
        </div>
    );
};

export default ProductionWizards;