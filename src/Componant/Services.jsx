import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from '@studio-freight/lenis';
import ScrollAnimationComponent from "./About.jsx";
import item1 from '../assets/images/1.png'
import item2 from '../assets/images/2.png'
import item3 from '../assets/images/3.png'
import item4 from '../assets/images/4.jpeg'
import item5 from '../assets/images/5.jpeg'
import item6 from '../assets/images/6.png'

// Sample gallery data with images and details
const galleryItems = [
    {
        id: 1,
        title: "Modern Architecture",
        description: "Contemporary design with clean lines and open spaces",
        image: (item1 ),
        details: "This project features innovative use of materials and sustainable design principles."
    },
    {
        id: 2,
        title: "Urban Landscape",
        description: "Vibrant cityscape photography",
        image: (item2 ),
        details: "Capturing the essence of city life through unique perspectives."
    },
    {
        id: 3,
        title: "Nature Retreat",
        description: "Serene natural environment design",
        image: (item3),
        details: "Blending architecture with natural surroundings for a peaceful retreat."
    },
    {
        id: 4,
        title: "Interior Design",
        description: "Luxurious residential interiors",
        image: (item4 ),
        details: "High-end materials and custom furniture create a unique living space."
    },
    {
        id: 5,
        title: "Product Showcase",
        description: "Minimalist product photography",
        image: (item5 ),
        details: "Highlighting product features with clean, focused compositions."
    },
    {
        id: 6,
        title: "Event Photography",
        description: "Capturing special moments",
        image: (item6),
        details: "Professional event coverage with artistic flair and attention to detail."
    },

];

gsap.registerPlugin(ScrollTrigger);

const SmoothScrollWebsite = () => {
    const containerRef = useRef(null);
    const lenisRef = useRef(null);
    const gallerySectionRef = useRef(null);
    const galleryRef = useRef(null);
    const progressRef = useRef(null);

    // Setup Lenis smooth scroll
    useEffect(() => {
        lenisRef.current = new Lenis({
            lerp: 0.1,
            smooth: true,
            syncTouch: true
        });

        const raf = (time) => {
            lenisRef.current.raf(time);
            requestAnimationFrame(raf);
        };
        requestAnimationFrame(raf);

        return () => lenisRef.current.destroy();
    }, []);

    // GSAP horizontal scroll setup
    useEffect(() => {
        const ctx = gsap.context(() => {
            if (!galleryRef.current || !gallerySectionRef.current) return;

            const galleryItems = gsap.utils.toArray(galleryRef.current.children);
            const galleryWidth = galleryRef.current.scrollWidth;
            const viewportWidth = window.innerWidth;
            const scrollDistance = galleryWidth - viewportWidth;

            // Create a progress indicator
            gsap.to(progressRef.current, {
                scaleX: 1,
                scrollTrigger: {
                    trigger: gallerySectionRef.current,
                    start: "top top",
                    end: `+=${scrollDistance}`,
                    scrub: true
                }
            });

            // Horizontal scroll animation
            gsap.to(galleryRef.current, {
                x: -scrollDistance,
                ease: "none",
                scrollTrigger: {
                    trigger: gallerySectionRef.current,
                    start: "top top",
                    end: `+=${scrollDistance}`,
                    scrub: 1,
                    pin: true,
                    anticipatePin: 1,
                    invalidateOnRefresh: true,
                    onUpdate: (self) => {
                        // Highlight current item based on scroll position
                        const progress = self.progress;
                        const activeIndex = Math.floor(progress * (galleryItems.length - 1));
                        galleryItems.forEach((item, i) => {
                            gsap.to(item, {
                                scale: i === activeIndex ? 1.05 : 1,
                                duration: 0.3,
                                ease: "power2.out"
                            });
                        });
                    },
                    onLeave: () => {
                        // Reset all items when leaving the section
                        gsap.to(galleryItems, {
                            scale: 1,
                            duration: 0.3
                        });
                    }
                }
            });

        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <div ref={containerRef} className="relative z-20 ">
            {/* Gallery Section */}
            <section
                ref={gallerySectionRef}
                className="min-h-screen w-full py-20 bg-white relative"
            >
                {/* Progress indicator */}
                <div className="absolute top-4 left-0 w-full px-4 z-20">
                    <div
                        ref={progressRef}
                        className="h-1 bg-[#D700E6] origin-left scale-x-0"
                        style={{ transform: 'scaleX(0)' }}
                    />
                </div>

                <div className="container mx-auto px-4 h-full">
                    <motion.h2
                        className="text-5xl mt-10 font-bold text-[#D700E6] text-center mb-16"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true, margin: "-100px" }}
                    >
                        OUR RECENT WORKS
                    </motion.h2>

                    <div className="relative h-[70vh] overflow-hidden">
                        <div
                            ref={galleryRef}
                            className="absolute top-0 left-0 h-full flex items-center gap-8 will-change-transform"
                        >
                            {galleryItems.map((item, i) => (
                                <motion.div
                                    key={item.id}
                                    className="w-[80vw] md:w-[40vw] lg:w-[30vw] h-[60vh] bg-white rounded-xl overflow-hidden shadow-lg flex-shrink-0 relative group"
                                    initial={{ opacity: 0, y: 50 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: i * 0.1 }}
                                    viewport={{ once: true, margin: "-50px" }}
                                    whileHover={{ scale: 1.03 }}
                                >
                                    <div className="h-3/4 w-full overflow-hidden relative">
                                        <img
                                            src={item.image}
                                            alt={item.title}
                                            className="w-full h-full object-cover"
                                        />
                                        <motion.div
                                            className="absolute inset-0 bg-black bg-opacity-0 flex items-center justify-center"
                                            whileHover={{ backgroundColor: 'rgba(0,0,0,0.3)' }}
                                            transition={{ duration: 0.3 }}
                                        >
                                            <motion.button
                                                className="px-6 py-3 bg-[#D700E6] text-white rounded-full font-medium opacity-0 -translate-y-4"
                                                // whileHover={{ scale: 1.05 }}
                                                // whileTap={{ scale: 0.95 }}
                                                // initial={{ opacity: 0, y: 10 }}
                                                // animate={{
                                                //     opacity: 1,
                                                //     y: 0,
                                                //     transition: {
                                                //         delay: 0.3,
                                                //         when: "beforeChildren"
                                                //     }
                                                // }}
                                                whileInView={{ opacity: 0, y: 10 }}
                                                viewport={{ once: true }}
                                                whileHover={{
                                                    opacity: 1,
                                                    y: 0,
                                                    transition: { duration: 0.3 }
                                                }}
                                            >
                                                Show More
                                            </motion.button>
                                        </motion.div>
                                    </div>
                                    <div className="p-6">
                                        <h3 className="text-xl font-bold mb-2 text-gray-800">{item.title}</h3>
                                        <p className="text-gray-600">{item.description}</p>
                                    </div>
                                    <div className="absolute bottom-4 right-4 text-xs text-gray-400">
                                        {i + 1}/12
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer Section */}
            <section className="h-screen w-full flex items-center justify-center bg-gray-900 text-white">
                <div className="text-4xl font-bold">Footer Section</div>
            </section>
        </div>
    );
};

export default SmoothScrollWebsite;