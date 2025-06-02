import { useEffect, useRef, useState } from 'react';

const ElevatingBusinessSection = () => {
    const [isLoading, setIsLoading] = useState(true);
    const headingRef = useRef(null);
    const paragraphRef = useRef(null);
    const buttonRef = useRef(null);

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

    return (
        <section className="bg-white py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                {/* Loading animation */}
                {isLoading && (
                    <div className="flex justify-center items-center h-64">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-black"></div>
                    </div>
                )}

                {/* Content */}
                {!isLoading && (
                    <>
                        {/* Heading with animation */}
                        <div className="text-center mb-12 overflow-hidden">
                            <h1
                                ref={headingRef}
                                className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-6 opacity-0 translate-y-10"
                            >
                                Elevating Your Business Through Tailored Solutions.
                            </h1>
                            <p
                                ref={paragraphRef}
                                className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto opacity-0 translate-y-10"
                            >
                                At our agency, we believe that every business has unique challenges and aspirations. That's why we specialize in providing tailored solutions designed.
                            </p>
                        </div>

                        {/* Divider */}
                        <div className="border-t border-gray-200 my-8"></div>

                        {/* CTA Button with animation */}
                        <div className="text-center mt-12 overflow-hidden">
                            <button
                                ref={buttonRef}
                                className="bg-black hover:bg-gray-800 text-white font-semibold py-3 px-8 rounded-full text-lg transition duration-300 transform hover:scale-105 opacity-0 translate-y-10"
                            >
                                Know About Us
                            </button>
                        </div>
                    </>
                )}
            </div>

            {/* Animation styles */}
            <style jsx global>{`
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
        </section>
    );
};

export default ElevatingBusinessSection;