import React from 'react';
import Image from 'next/image';

const services = [
    {
        name: 'Conveyancing Services',
        bgColor: 'bg-blue-700', // Deeper, more professional blue
        textColor: 'text-white',
        description: (
            <>
                <p className="text-white text-lg leading-relaxed mb-4">
                    At <strong className="font-semibold">Sayin Properties Limited</strong>, we offer expert <strong className="font-semibold">conveyancing services</strong> to guide you through every legal and administrative step involved in buying or selling property in Kenya.
                </p>
                <p className="text-white text-lg leading-relaxed">
                    As licensed and experienced conveyancers, we specialize in property law, ensuring a seamless, transparent, and compliant transaction process for our clients.
                </p>
            </>
        ),
        image: '/conveyancers.jpg',
    },
    {
        name: 'What We Do',
        bgColor: 'bg-gray-100', // Light background for better readability
        textColor: 'text-gray-800',
        description: (
            <div className="space-y-6">
                <p className="text-lg leading-relaxed">
                    Our conveyancing services cover a wide range of essential tasks:
                </p>

                <div className="space-y-6">
                    {[
                        {
                            title: 'Legal Guidance & Documentation',
                            content: 'We prepare, review, and explain legal documents such as sale agreements, lease contracts, mortgage papers, and title deeds.'
                        },
                        {
                            title: 'Property Transfer & Registration',
                            content: 'We manage the entire process of transferring ownership, including liaising with the Land Registry.'
                        },
                        {
                            title: 'Contract Negotiation & Review',
                            content: 'We negotiate and agree on contract terms with the conveyancer acting for the other party.'
                        },
                        {
                            title: 'Mortgage & Lease Processing',
                            content: 'We assist with the preparation and validation of mortgage or lease agreements.'
                        },
                        {
                            title: 'Client Communication & Transparency',
                            content: 'We communicate regularly with clients using a reliable and secure case management system.'
                        },
                        {
                            title: 'Risk Management & Compliance',
                            content: 'We strictly follow anti-fraud and anti-money laundering protocols.'
                        },
                        {
                            title: 'Financial Coordination',
                            content: 'We handle all financial elements of the transaction, including deposits and tax payments.'
                        }
                    ].map((item, idx) => (
                        <div key={idx} className="bg-white p-4 rounded-lg shadow-sm">
                            <h3 className="text-lg font-semibold text-blue-700 mb-2">{item.title}</h3>
                            <p className="text-gray-700">{item.content}</p>
                        </div>
                    ))}
                </div>
            </div>
        ),
        image: '/conveyancing-services.jpg',
    },
    {
        name: 'Why Choose Sayin Properties Limited?',
        bgColor: 'bg-blue-800', // Dark blue for contrast
        textColor: 'text-white',
        description: (
            <div className="space-y-6">
                <p className="text-lg leading-relaxed">
                    We pride ourselves on delivering reliable, professional, and client-centered conveyancing services:
                </p>

                <ul className="space-y-4">
                    {[
                        "Deep knowledge of Kenyan property law and real estate regulations",
                        "Strong relationships with the Land Registry and financial institutions",
                        "Clear communication and client-focused approach",
                        "Secure digital systems for document management",
                        "Trusted by individuals and businesses across Kenya"
                    ].map((item, idx) => (
                        <li key={idx} className="flex items-start">
                            <svg className="h-5 w-5 text-green-400 mr-2 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            <span className="text-lg">{item}</span>
                        </li>
                    ))}
                </ul>
            </div>
        ),
        image: '/happy.jpg',
    },
];

const ConveyancingCard = () => {
    return (
        <div className="font-sans antialiased">
            {services.map((service, index) => (
                <div
                    key={index}
                    className={`flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} min-h-[500px]`}
                >
                    {/* Content */}
                    <div className={`lg:w-1/2 w-full ${service.bgColor} ${service.textColor} flex items-center`}>
                        <div className="container mx-auto px-6 py-12 lg:py-16 max-w-2xl">
                            <h2 className="text-3xl md:text-4xl font-bold mb-8">{service.name}</h2>
                            <div className="space-y-6">
                                {service.description}
                            </div>
                        </div>
                    </div>

                    {/* Image */}
                    <div className="lg:w-1/2 w-full relative">
                        <Image
                            src={service.image}
                            alt={service.name}
                            fill
                            className="object-cover"
                            style={{ objectPosition: 'center' }}
                            quality={100}
                            onError={(e) => {
                                e.currentTarget.src = '/placeholder.jpg';
                            }}
                            priority={index === 0}
                        />
                    </div>
                </div>
            ))}
        </div>
    );
};

export default ConveyancingCard;