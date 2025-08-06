import React from "react";
import Image from "next/image";
import { CheckCircle, Lightbulb, Users, Star, Globe, Handshake, Target } from "lucide-react";

const Mission = () => {
    return (
        <div className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
            {/* Vision & Mission */}
            <section className="mb-20 grid md:grid-cols-2 gap-8">
                <div className="bg-gradient-to-br from-blue-900 to-blue-700 text-white p-10 rounded-2xl shadow-xl transform transition-all hover:scale-[1.01]">
                    <div className="flex items-center gap-4 mb-6">
                        <Globe className="w-8 h-8 text-blue-200" />
                        <h2 className="text-3xl font-bold border-b-2 border-blue-300 pb-2">Our Vision</h2>
                    </div>
                    <p className="text-xl leading-relaxed text-blue-100">
                        To redefine the method in which real estate property goals are achieved,
                        setting a new benchmark for excellence in the industry.
                    </p>
                </div>

                <div className="bg-gradient-to-br from-blue-800 to-blue-600 text-white p-10 rounded-2xl shadow-xl transform transition-all hover:scale-[1.01]">
                    <div className="flex items-center gap-4 mb-6">
                        <Target className="w-8 h-8 text-blue-200" />
                        <h2 className="text-3xl font-bold border-b-2 border-blue-300 pb-2">Our Mission</h2>
                    </div>
                    <p className="text-xl leading-relaxed text-blue-100">
                        To provide world-class service and market-leading expertise to our clients by delivering added value through integrity, consistency, and passion—making outstanding results the signature of our service.
                    </p>
                </div>
            </section>

            {/* Core Values */}
            <section className="mb-20 bg-gradient-to-br from-blue-50 to-white p-10 rounded-2xl shadow-sm">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold text-blue-900 inline-block relative">
                        Our Core Values
                        <span className="absolute bottom-0 left-0 w-full h-1 bg-blue-200 transform translate-y-1"></span>
                    </h2>
                    <p className="mt-4 text-lg text-blue-800 max-w-3xl mx-auto">
                        The foundational principles that guide every decision and interaction at Sayin Property Limited
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {[
                        { icon: <Lightbulb className="w-6 h-6" />, title: "Innovation & Leadership", desc: "We lead with bold ideas and welcome forward-thinking solutions." },
                        { icon: <CheckCircle className="w-6 h-6" />, title: "Accountability", desc: "We take full responsibility and ownership of our decisions and actions." },
                        { icon: <Target className="w-6 h-6" />, title: "Practical Solutions", desc: "We focus on efficient, tangible solutions to meet client needs." },
                        { icon: <Handshake className="w-6 h-6" />, title: "Relationships", desc: "We build long-term, valuable partnerships with clients and peers." },
                        { icon: <Star className="w-6 h-6" />, title: "Excellence", desc: "We never settle for less—delivering premium service always." },
                        { icon: <Users className="w-6 h-6" />, title: "Teamwork", desc: "Collaboration is at the heart of our success and client satisfaction." },
                        { icon: <Globe className="w-6 h-6" />, title: "Community Impact", desc: "We contribute positively to the communities where we operate." },
                        { icon: <Handshake className="w-6 h-6" />, title: "Integrity", desc: "Honesty and transparency guide all our business dealings." }
                    ].map((value, index) => (
                        <div
                            key={index}
                            className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all border-l-4 border-blue-500 flex flex-col"
                        >
                            <div className="flex items-center mb-4">
                                <div className="p-2 bg-blue-100 rounded-lg text-blue-600 mr-4">
                                    {value.icon}
                                </div>
                                <h3 className="font-bold text-lg text-blue-900">{value.title}</h3>
                            </div>
                            <p className="text-gray-700 pl-12">{value.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Business Focus */}
            <section className="mb-10">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold text-blue-900 inline-block relative">
                        Our Business Focus
                        <span className="absolute bottom-0 left-0 w-full h-1 bg-blue-200 transform translate-y-1"></span>
                    </h2>
                    <p className="mt-4 text-lg text-blue-800 max-w-3xl mx-auto">
                        Specialized services tailored to meet the needs of discerning property investors
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                    <div className="bg-white p-8 rounded-2xl shadow-md border border-gray-100">
                        <h3 className="text-xl font-semibold text-blue-800 mb-4">Strategic Approach</h3>
                        <p className="text-gray-700 leading-relaxed mb-4">
                            Sayin Property Limited is committed to serving the evolving needs of smart property investors. Our goal is to stay on the cutting edge of the changing real estate and economic landscape.
                        </p>
                        <p className="text-gray-700 leading-relaxed">
                            With a deep focus on professional and efficient asset management, our seasoned team fosters strong client relationships while ensuring your investment&#39;s future success and financial viability.
                        </p>
                    </div>

                    <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-8 rounded-2xl shadow-md border border-blue-100">
                        <h3 className="text-xl font-semibold text-blue-800 mb-4">Our Portfolio Includes</h3>
                        <ul className="space-y-3">
                            {['Land', 'Industrial Properties', 'Warehouses', 'Retail Shopping Centres', 'Office Spaces', 'Mixed-Use Developments', 'Residential Complexes', 'Hospitality Properties'].map((item, index) => (
                                <li key={index} className="flex items-start">
                                    <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5 mr-3 flex-shrink-0" />
                                    <span className="text-gray-800">{item}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Mission;