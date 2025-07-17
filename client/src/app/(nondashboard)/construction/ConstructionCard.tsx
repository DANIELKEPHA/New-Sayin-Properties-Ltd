import React from 'react';
import Image from 'next/image';

const services = [
    {
        name: 'Real Estate Development',
        bgColor: 'bg-blue-700',
        textColor: 'text-white',
        description: (
            <div className="space-y-6">
                <p>
                    <strong>Sayin Properties Limited</strong> is a dynamic real estate development firm specializing in both residential and commercial projects.
                </p>

                <div className="space-y-4">
                    <h3 className="text-xl font-semibold">Our Development Expertise</h3>
                    <ul className="space-y-3">
                        {[
                            "Acquisition of prime land for new developments",
                            "Redevelopment of existing properties",
                            "Modernization of dated structures",
                            "End-to-end project execution"
                        ].map((item, idx) => (
                            <li key={idx} className="flex items-start">
                                <svg className="h-5 w-5 text-blue-300 mr-2 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                                <span>{item}</span>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="space-y-4">
                    <h3 className="text-xl font-semibold">Residential Projects</h3>
                    <p>We create homes that balance aesthetics, durability, and functionality:</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {[
                            "Efficient space planning",
                            "Structural integrity",
                            "Modern façade design",
                            "Premium interior finishes",
                            "Natural environment integration",
                            "Smart home technology"
                        ].map((feature, idx) => (
                            <div key={idx} className="flex items-start">
                                <div className="bg-blue-600 rounded-full p-1 mr-3 mt-1">
                                    <svg className="h-3 w-3 text-white" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                    </svg>
                                </div>
                                <span>{feature}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        ),
        image: '/Developers.jpg',
    },
    {
        name: 'Commercial Solutions',
        bgColor: 'bg-gray-50',
        textColor: 'text-gray-800',
        description: (
            <div className="space-y-8">
                <div className="space-y-4">
                    <h3 className="text-2xl font-bold text-blue-700">Commercial Developments</h3>
                    <p>We create functional spaces that drive business success:</p>

                    <div className="space-y-6">
                        {[
                            {
                                title: "Office Spaces",
                                description: "Designed for productivity with optimal workflows and employee wellbeing",
                                features: ["Efficient layouts", "Modern amenities", "Technology integration"]
                            },
                            {
                                title: "Retail Centers",
                                description: "Customer-focused designs that enhance shopping experiences",
                                features: ["High footfall areas", "Visual merchandising", "Tenant mix optimization"]
                            },
                            {
                                title: "Mixed-Use Developments",
                                description: "Integrated spaces combining work, live, and play elements",
                                features: ["Zoned areas", "Shared amenities", "Community spaces"]
                            }
                        ].map((category, idx) => (
                            <div key={idx} className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                                <h4 className="text-lg font-semibold text-blue-600 mb-2">{category.title}</h4>
                                <p className="mb-3">{category.description}</p>
                                <div className="flex flex-wrap gap-2">
                                    {category.features.map((feature, fIdx) => (
                                        <span key={fIdx} className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm">
                                            {feature}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                    <h4 className="font-semibold text-blue-700 mb-2">Our Development Approach</h4>
                    <p>Every project undergoes rigorous planning considering market demand, sustainability, and future adaptability to ensure long-term value creation.</p>
                </div>
            </div>
        ),
        image: '/Commercial.jpg',
    },
    {
        name: 'Strategic Advisory',
        bgColor: 'bg-blue-800',
        textColor: 'text-white',
        description: (
            <div className="space-y-6">
                <p>Our advisory services help investors navigate Kenya&#39;s complex real estate landscape with confidence.</p>

                <div className="space-y-4">
                    <h3 className="text-xl font-semibold text-blue-200">Core Advisory Services</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {[
                            {
                                title: "Investment Analysis",
                                icon: "💰",
                                description: "Market feasibility and ROI projections"
                            },
                            {
                                title: "Design Strategy",
                                icon: "🏗️",
                                description: "Optimized space planning and aesthetics"
                            },
                            {
                                title: "Legal Structuring",
                                icon: "⚖️",
                                description: "Joint ventures and partnership frameworks"
                            },
                            {
                                title: "Risk Assessment",
                                icon: "🛡️",
                                description: "Identifying and mitigating project risks"
                            }
                        ].map((service, idx) => (
                            <div key={idx} className="bg-blue-700 p-4 rounded-lg border border-blue-600">
                                <div className="flex items-center mb-2">
                                    <span className="text-2xl mr-3">{service.icon}</span>
                                    <h4 className="font-semibold">{service.title}</h4>
                                </div>
                                <p className="text-blue-100 text-sm">{service.description}</p>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="pt-4">
                    <p className="text-blue-100">
                        <strong>Why choose our advisory?</strong> We combine local market expertise with global best practices to deliver actionable insights tailored to your specific goals.
                    </p>
                </div>
            </div>
        ),
        image: '/Advisory.jpg',
    }
];

const DevelopmentServices = () => {
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
                            <div className="space-y-6 [&>p]:text-lg [&>p]:leading-relaxed">
                                {service.description}
                            </div>
                        </div>
                    </div>

                    {/* Image */}
                    <div className="lg:w-1/2 w-full relative min-h-[300px]">
                        <Image
                            src={service.image}
                            alt={service.name}
                            fill
                            className="object-cover"
                            style={{ objectPosition: 'center' }}
                            quality={100}
                            sizes="(max-width: 768px) 100vw, 50vw"
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

export default DevelopmentServices;