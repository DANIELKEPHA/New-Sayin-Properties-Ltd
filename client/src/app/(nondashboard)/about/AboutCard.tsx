import React from 'react';
import Image from 'next/image';

const teas = [
    {
        name: 'About Us',
        bgColor: 'bg-gradient-to-br from-rose-100 to-rose-50',
        textColor: 'text-rose-900',
        accentColor: 'text-rose-600',
        description: (
            <>
                <p className="mb-6 text-lg leading-relaxed">
                    <strong className="font-bold">Sayin Properties Limited</strong> is a dynamic real estate and property firm offering a unique and unmatched value proposition across all core services essential to the success of any real estate venture.
                </p>
                <p className="mb-6 text-lg leading-relaxed">
                    We specialize in property consultancy—whether for sale or development—with a mission to deliver exceptional services that drive real estate success across Kenya. As the demand for quality housing continues to rise, we are actively involved in property development to meet this growing need.
                </p>
                <p className="mb-6 text-lg leading-relaxed">
                    Our development portfolio spans the entire property lifecycle—from land acquisition and construction of facilities to selling or leasing completed developments—all tailored to meet our clients&#39; needs.
                </p>
                <p className="text-lg leading-relaxed">
                    Sayin Properties also has a team of <strong className="font-bold">registered and qualified valuers</strong> who offer professional valuation services for a variety of real estate needs. Whether for sale, insurance, mortgage, or estate planning purposes, our valuation process is thorough—from initial instruction and site inspection to document verification and submission of a comprehensive Property Valuation Report.
                </p>
            </>
        ),
        image: '/about-sayin.jpg',
    },
    {
        name: 'The Company',
        bgColor: 'bg-gradient-to-br from-blue-50 to-blue-100',
        textColor: 'text-blue-900',
        accentColor: 'text-blue-600',
        description: (
            <>
                <p className="mb-6 text-lg leading-relaxed">
                    At <strong className="font-bold">Sayin Properties Limited</strong>, we&#39;re building a full-spectrum property group that covers all aspects of real estate—from leasing and sales to development, construction, and business transactions.
                </p>
                <p className="mb-6 text-lg leading-relaxed">
                    In today&#39;s evolving property market—now a billion-dollar industry—making informed decisions requires detailed market knowledge and timely, accurate insights. Our experienced team brings the dedication and market expertise necessary to navigate these complexities and support both property owners and buyers.
                </p>
                <p className="mb-6 text-lg leading-relaxed">
                    We invest in ongoing training across departments and maintain strong leadership in every division to ensure that our team&#39;s knowledge and skills remain sharp and current. This commitment has driven our expansion into business sales and project development, particularly in urban areas where our services continue to grow.
                </p>
                <p className="text-lg leading-relaxed">
                    As the industry moves increasingly toward <strong className="font-bold">mixed-use developments</strong>, we are uniquely positioned to offer complete solutions—spanning residential and commercial sales, leasing, and feasibility analysis—delivering smooth, end-to-end outcomes for our clients.
                </p>
            </>
        ),
        image: '/the-company.png',
    },
];

const AboutCard = () => {
    return (
        <div className="font-sans antialiased">
            <section className="w-full overflow-hidden">
                {teas.map((tea, index) => (
                    <div
                        key={index}
                        className={`flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} w-full ${tea.bgColor} ${tea.textColor}`}
                    >
                        {/* Content */}
                        <div className="lg:w-1/2 w-full">
                            <div className="container mx-auto px-6 py-16 lg:py-24 max-w-2xl">
                                <div className="relative">
                                    <h2 className="text-4xl md:text-5xl font-bold mb-8 relative inline-block">
                                        <span className="relative z-10">{tea.name}</span>
                                        <span className={`absolute bottom-1 left-0 w-full h-3 ${index % 2 === 0 ? 'bg-rose-200' : 'bg-blue-200'} -z-0 opacity-80`}></span>
                                    </h2>
                                </div>
                                <div className="space-y-6">
                                    {tea.description}
                                </div>
                            </div>
                        </div>

                        {/* Image */}
                        <div className="lg:w-1/2 w-full relative">
                            <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent z-10"></div>
                            <Image
                                src={tea.image}
                                alt={tea.name}
                                width={800}
                                height={800}
                                className="w-full h-full min-h-[400px] max-h-[800px] object-cover object-center"
                                onError={(e) => {
                                    e.currentTarget.src = '/tea-placeholder.jpg';
                                }}
                                priority={index === 0}
                            />
                        </div>
                    </div>
                ))}
            </section>
        </div>
    );
};

export default AboutCard;