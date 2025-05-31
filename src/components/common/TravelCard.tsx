'use client';

import React from 'react';
import { ArrowRight } from 'lucide-react';

const TravelCard: React.FC = () => {
    return (
        <div className="relative py-16 bg-white" id="about-sec">
            <div className="container mx-auto px-4 max-w-7xl">
                <div className="flex flex-col lg:flex-row items-center gap-12">

                    {/* Left Side: Images */}
                    <div className="relative flex-1 flex">
                        {/* Main large image */}
                        <div className="relative w-70 h-140 overflow-hidden">
                            <img
                                src="/assets/img/normal/about_1_1.jpg"
                                alt="About 1"
                                className="w-full h-full object-cover rounded-[156px_156px_0px_156px]"
                            />
                        </div>

                        {/* Overlapping smaller image - top right */}
                        <div className="absolute top-5 left-1/2 w-60 h-65 overflow-hidden transform translate-x-10 -translate-y-6 hidden sm:block">
                            <img
                                src="/assets/img/normal/about_1_2.jpg"
                                alt="About 2"
                                className="w-full h-full object-cover rounded-[156px_156px_156px_0px]"
                            />
                        </div>

                        {/* Overlapping smaller image - bottom left */}
                        <div className="absolute bottom-5 right-0 w-60 h-65 overflow-hidden transform -translate-x-6 translate-y-6 hidden sm:block">
                            <img
                                src="/assets/img/normal/about_1_3.jpg"
                                alt="About 3"
                                className="w-full h-full object-cover rounded-[156px_0px_156px_156px]"
                            />
                        </div>
                    </div>

                    {/* Right Side: Text and Features */}
                    <div className="flex-1 text-left">
                        <h2 className="text-2xl font-cursive">Let’s Go Together</h2>
                        <h1 className="text-4xl font-bold mt-2 mb-8">Plan Your Trip With Us</h1>
                        <p className="text-gray-600 mb-6 max-w-prose text-[18px] leading-[26px]">
                            There are many variations of passages of available but the majority have suffered alteration in some form,
                            by injected hum randomised words which don't look even slightly.
                        </p>

                        {/* Feature List */}
                        <div className="space-y-6">
                            <div className="flex items-start gap-4">
                                <img src="assets/img/icon/map3.svg" alt="Trip" className="w-20 h-20 p-4" style={{ background: "black", borderRadius: "50%" }} />
                                <div>
                                    <h5 className="text-xl font-semibold">Exclusive Trip</h5>
                                    <p className="text-gray-600 text-[18px] leading-[26px]">There are many variations of passages<br /> of available but the majority.</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <img src="assets/img/icon/guide.svg" alt="Guide" className="w-20 h-20 p-4" style={{ background: "black", borderRadius: "50%" }} />
                                <div>
                                    <h5 className="text-xl font-semibold">Professional Guide</h5>
                                    <p className="text-gray-600 text-[18px] leading-[26px]">There are many variations of passages<br /> of available but the majority.</p>
                                </div>
                            </div>
                        </div>

                        <a
                            href="#"
                            className="mt-2 travel-card-slider-button-animate inline-flex items-center rounded-full border border-gray-300 px-6 py-3 text-sm font-semibold relative z-10 bg-white text-black gap-2 overflow-hidden group"
                        >
                            <span className="relative z-10 transition-colors duration-300 group-hover:text-white">
                                Read More <ArrowRight size={18} className="ml-1" />
                            </span>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TravelCard;
