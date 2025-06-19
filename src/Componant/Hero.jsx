import { useEffect, useRef, useState } from 'react';

import { motion, useAnimation, AnimatePresence } from 'framer-motion';
import Lenis from '@studio-freight/lenis';
import herobg from '../assets/herobg new1.png';
import secondimg from '../assets/secondimg.jpg';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';
import icon1 from "../assets/images/design (2).png"
import icon2 from "../assets/images/web-programming.png"
import icon3 from "../assets/images/pen-tool.png"
import icon4 from "../assets/images/seo (1).png"

const ProductionWizards = () => {
    // Refs
    const heroBackgroundRef = useRef(null);
    const showreelRef = useRef(null);
    const showreelTitleRef = useRef(null);
    const servicesSectionRef = useRef(null);
    const headingRef = useRef(null);
    const heroContentRef = useRef(null);

    // State
    const [isLoading, setIsLoading] = useState(true);
    const [currentTagIndex, setCurrentTagIndex] = useState(0);
    const [displayText, setDisplayText] = useState('');
    const [isTyping, setIsTyping] = useState(true);
    const [heroBgImage, setHeroBgImage] = useState(herobg);
    const [servicesInView, setServicesInView] = useState(false);


    // Data
    const tags = ['WEB DEVELOPMENT', 'UI/UX DESIGN', 'GRAPHIC DESIGN'];
    const services = [
        {
            icon: (
                <div className="w-12 h-12  rounded-lg flex items-center justify-center mb-4">
                    <img src={icon1} />
                </div>
            ),
            title: "Web Design / Redesign",
            description: "We create stunning, user-friendly websites that convert visitors into customers with modern designs and intuitive interfaces."
        },
        {
            icon: (
                <div className="w-12 h-12  rounded-lg flex items-center justify-center mb-4">
                    <div className="text-white">
                        <img src={icon2} />
                    </div>
                </div>
            ),
            title: "Web Development",
            description: "Custom web applications built with cutting-edge technologies for performance, scalability and security."
        },
        {
            icon: (
                <div className="w-12 h-12  rounded-lg flex items-center justify-center mb-4">
                    <div className="text-white">
                        <img src={icon3} />
                    </div>
                </div>
            ),
            title: "Graphic Design",
            description: "Eye-catching visual identities, logos and branding materials that make your business stand out."
        },
        {
            icon: (
                <div className="w-12 h-12  rounded-lg flex items-center justify-center mb-4">
                    <div className="text-white">
                        <img src={icon4} />
                    </div>
                </div>
            ),
            title: "SEO Services",
            description: "Data-driven marketing strategies that increase your online visibility and drive qualified leads."
        }
    ];

    const progressItems = [
        { label: "Web Design", percentage: 95 },
        { label: "UI/UX Design", percentage: 90 },
        { label: "Frontend Development", percentage: 85 },
        { label: "Branding", percentage: 88 }
    ];

    // Animation variants
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

    const fadeUpVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.8,
                ease: [0.6, -0.05, 0.01, 0.99],
            },
        },
    };

    const fadeInVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1 }
    };

    const textRevealVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 1,
                ease: "easeOut"
            }
        }
    };

    const progressBarVariants = {
        hidden: { width: 0 },
        visible: (percentage) => ({
            width: `${percentage}%`,
            transition: {
                duration: 1.5,
                delay: 0.5,
                ease: "easeInOut"
            }
        })
    };

    // Effects
    useEffect(() => {
        const handleScroll = () => {
            const scrollY = window.scrollY;
            const windowHeight = window.innerHeight;

            // Change hero background
            setHeroBgImage(scrollY > windowHeight * 0.5 ? secondimg : herobg);

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

            // Check if services section is in view
            if (servicesSectionRef.current) {
                const rect = servicesSectionRef.current.getBoundingClientRect();
                const isInView = rect.top < windowHeight * 0.8;
                setServicesInView(isInView);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Typing animation for tags
    useEffect(() => {
        const tagInterval = setInterval(() => {
            setCurrentTagIndex((prev) => (prev + 1) % tags.length);
        }, 3000);

        return () => clearInterval(tagInterval);
    }, [tags.length]);

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
        }, 100);

        return () => clearInterval(typingInterval);
    }, [currentTagIndex]);

    // Initialize Lenis for smooth scrolling
    useEffect(() => {
        const lenis = new Lenis({
            lerp: 0.1,
            smooth: true,
            smoothTouch: true
        });

        function raf(time) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }

        requestAnimationFrame(raf);
    }, []);

    // Simulate loading
    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 1500);

        return () => clearTimeout(timer);
    }, []);

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
                        <a href="#" className="text-white hover:text-blue-600 transition-colors duration-300">
                            <FaFacebook className="w-5 h-5" />
                        </a>
                        <a href="#" className="text-white hover:text-blue-400 transition-colors duration-300">
                            <FaTwitter className="w-5 h-5" />
                        </a>
                        <a href="#" className="text-white hover:text-pink-600 transition-colors duration-300">
                            <FaInstagram className="w-5 h-5" />
                        </a>
                        <a href="#" className="text-white hover:text-blue-700 transition-colors duration-300">
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
                                ref={headingRef}
                                variants={fadeUpVariants}
                                className="mt-[6rem] text-4xl md:text-7xl font-bold text-white leading-tight mb-6"
                            >
                                We Transform <span className="text-gradient-to-br from-customBlue to-customPink">Ideas</span><br />
                                Into <span className="text-[#D700E6]">Technology</span>
                            </motion.h1>

                            <motion.p
                                variants={fadeUpVariants}
                                className="text-gray-200 text-md mb-8 leading-relaxed"
                            >
                                We craft digital experiences that captivate audiences and drive business growth through innovative design and cutting-edge technology solutions.
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
                                className="flex flex-col sm:flex-row gap-4"
                            >
                                <motion.button
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.8 }}
                                    className="border-2 border-[#D700E6] hover:bg-gradient-to-br hover:from-[#2703D9] hover:to-[#D700E6] text-white font-bold py-3 px-8 rounded-full transition duration-300"
                                >
                                    Contact us
                                </motion.button>
                                <motion.button
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.9 }}
                                    className="border-2 border-transparent bg-gradient-to-br from-[#2703D9] to-[#D700E6] hover:bg-gradient-to-br hover:from-transparent hover:to-transparent hover:border-[#D700E6] text-white font-bold py-3 px-8 rounded-full transition duration-300"
                                >
                                    Our Services
                                </motion.button>
                            </motion.div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Showreel Section */}
            <section
                ref={showreelRef}
                className="relative h-[130vh] flex flex-col justify-center z-20 bg-gradient-to-br  relative overflow-hidden transition-transform duration-300 ease-out"
                style={{ top: '100vh', backgroundColor: '#1a0d2e' }}

            >

                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-20">
                    <div className="absolute top-10 left-10 w-32 h-32 bg-pink-500 rounded-full blur-3xl"></div>
                    <div className="absolute top-40 right-20 w-24 h-24 bg-purple-500 rounded-full blur-2xl"></div>
                    <div className="absolute bottom-20 left-20 w-40 h-40 bg-pink-400 rounded-full blur-3xl"></div>
                    <div className="absolute bottom-40 right-10 w-28 h-28 bg-purple-400 rounded-full blur-2xl"></div>
                </div>
                {/* Animated Text Section */}
                <div className="w-full text-center mt-5">
                    <div className="inline-block mx-auto max-w-6xl">
                        <motion.span
                            ref={showreelTitleRef}
                            className="block text-xl md:text-6xl lg:text-5xl font-bold uppercase"
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
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
                        </motion.span>
                    </div>
                </div>

                {/* Services Section */}
                <motion.div
                    ref={servicesSectionRef}
                    className="min-h-screen  relative overflow-hidden"
                    // style={{backgroundColor: '#1a0d2e'}}
                >


                    <div className="container mx-auto px-4 py-16 relative z-10 2xl:max-w-[80%]">
                        {/* Header */}
                        <motion.div
                            className="text-center mb-16"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                        >
                            <motion.div
                                className="flex items-start justify-start mb-4"
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.4 }}
                            >
                                <span className="text-[#D600E6] text-lg font-medium">Our services</span>
                                <svg className="w-6 h-6 text-[#D600E6] ml-2" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"/>
                                </svg>
                            </motion.div>
                            <motion.h1
                                className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight text-start"
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8, delay: 0.3 }}
                            >
                                Our Mindful Approach to Digital Growth
                            </motion.h1>
                        </motion.div>

                        <div className="grid lg:grid-cols-3 gap-8 items-start">
                            {/* Left Side - Service Cards */}
                            <div className="lg:col-span-2">
                                <div className="grid md:grid-cols-2 gap-6">
                                    {services.map((service, index) => (
                                        <motion.div
                                            key={index}
                                            className="bg-purple-900/40 backdrop-blur-sm border border-gradient-to-r from-pink-500 to-purple-500 rounded-2xl p-6 hover:bg-purple-800/50 hover:border-pink-400/40 transition-all duration-700 ease-out "
                                            initial={{ opacity: 0, y: 50 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            viewport={{ once: true, margin: "-50px" }}
                                            transition={{
                                                duration: 0.8,
                                                delay: 0.1 * index,
                                                ease: [0.22, 1, 0.36, 1]
                                            }}
                                        >
                                            <motion.div
                                                initial={{ scale: 0.8 }}
                                                whileInView={{ scale: 1 }}
                                                viewport={{ once: true }}
                                                transition={{ delay: 0.1 * index + 0.2 }}
                                            >
                                                {service.icon}
                                            </motion.div>
                                            <motion.h3
                                                className="text-xl font-bold text-white mb-3"
                                                initial={{ opacity: 0 }}
                                                whileInView={{ opacity: 1 }}
                                                viewport={{ once: true }}
                                                transition={{ delay: 0.1 * index + 0.3 }}
                                            >
                                                {service.title}
                                            </motion.h3>
                                            <motion.p
                                                className="text-gray-300 text-sm leading-relaxed mb-4"
                                                initial={{ opacity: 0 }}
                                                whileInView={{ opacity: 1 }}
                                                viewport={{ once: true }}
                                                transition={{ delay: 0.1 * index + 0.4 }}
                                            >
                                                {service.description}
                                            </motion.p>
                                            <motion.button
                                                className="text-[#D600E6] hover:text-pink-300 font-medium text-sm transition-colors"
                                                initial={{ opacity: 0 }}
                                                whileInView={{ opacity: 1 }}
                                                viewport={{ once: true }}
                                                transition={{ delay: 0.1 * index + 0.5 }}
                                            >
                                                Read More
                                            </motion.button>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>

                            {/* Right Side - Progress Bars */}
                            <div className="lg:col-span-1 top-[7rem] relative justify-center">
                                <div className="space-y-8">
                                    {progressItems.map((item, index) => (
                                        <motion.div
                                            key={index}
                                            initial={{ opacity: 0, x: 50 }}
                                            whileInView={{ opacity: 1, x: 0 }}
                                            viewport={{ once: true }}
                                            transition={{
                                                duration: 0.8,
                                                delay: 0.1 * index + 0.4,
                                                ease: [0.22, 1, 0.36, 1]
                                            }}
                                        >
                                            <div className="flex justify-between items-center mb-3">
                                                <motion.span
                                                    className="text-white font-medium text-sm md:text-base"
                                                    initial={{ opacity: 0 }}
                                                    whileInView={{ opacity: 1 }}
                                                    viewport={{ once: true }}
                                                    transition={{ delay: 0.1 * index + 0.5 }}
                                                >
                                                    {item.label}
                                                </motion.span>
                                                <motion.span
                                                    className="text-white font-bold text-xl"
                                                    initial={{ opacity: 0 }}
                                                    whileInView={{ opacity: 1 }}
                                                    viewport={{ once: true }}
                                                    transition={{ delay: 0.1 * index + 0.6 }}
                                                >
                                                    {item.percentage}%
                                                </motion.span>
                                            </div>
                                            <div className="w-full bg-purple-900/60 rounded-full h-2">
                                                <motion.div
                                                    className="bg-[#D600E6] h-2 rounded-full"
                                                    initial={{ width: 0 }}
                                                    whileInView={{ width: `${item.percentage}%` }}
                                                    viewport={{ once: true }}
                                                    transition={{
                                                        duration: 1.5,
                                                        delay: 0.1 * index + 0.7,
                                                        ease: "easeInOut"
                                                    }}
                                                />
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
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