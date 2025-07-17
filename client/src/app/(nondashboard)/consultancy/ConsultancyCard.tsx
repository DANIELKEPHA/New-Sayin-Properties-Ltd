import React from 'react';

const services = [
    {
        name: 'What we do',
        icon: '🌍',
        bgColor: 'bg-gradient-to-br from-blue-900 to-blue-700',
        textColor: 'text-white',
        description: (
            <div className="space-y-8">
                <div className="space-y-4">
                    <p className="text-lg leading-relaxed">
                        <strong>Sayin&apos;s Real Estate Consultants</strong> provide expert guidance across all phases of the property lifecycle — from acquisition to portfolio management.
                    </p>
                    <p className="text-lg leading-relaxed">
                        We identify strategic opportunities and implement research-backed solutions for Kenya's dynamic real estate market.
                    </p>
                </div>

                <div className="space-y-6">
                    <h3 className="text-xl font-semibold text-blue-200">Core Consultancy Services</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {[
                            {
                                title: "Market Strategy",
                                icon: "📊",
                                description: "Develop and implement data-driven real estate strategies"
                            },
                            {
                                title: "Transaction Advisory",
                                icon: "🤝",
                                description: "Expert guidance on purchases, sales, and developments"
                            },
                            {
                                title: "Financial Analysis",
                                icon: "💰",
                                description: "Comprehensive business and financial reporting"
                            },
                            {
                                title: "Policy Development",
                                icon: "📝",
                                description: "Create effective processes and procedures"
                            },
                            {
                                title: "Market Research",
                                icon: "🔍",
                                description: "In-depth analysis for informed decisions"
                            },
                            {
                                title: "Legal Documentation",
                                icon: "⚖️",
                                description: "Prepare transaction documents and contracts"
                            },
                            {
                                title: "Industry Reporting",
                                icon: "📈",
                                description: "Detailed professional reports and insights"
                            },
                            {
                                title: "Trend Analysis",
                                icon: "🔮",
                                description: "Stay ahead with current market intelligence"
                            }
                        ].map((service, idx) => (
                            <div key={idx} className="bg-blue-800/50 p-4 rounded-lg border border-blue-700/50 backdrop-blur-sm">
                                <div className="flex items-start">
                                    <span className="text-2xl mr-3">{service.icon}</span>
                                    <div>
                                        <h4 className="font-semibold text-blue-100">{service.title}</h4>
                                        <p className="text-blue-200 text-sm mt-1">{service.description}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="bg-blue-800/30 p-6 rounded-xl border border-blue-700/30 mt-6">
                    <p className="text-lg leading-relaxed">
                        Whether you&#39;re a developer, investor, or individual client, <strong>Sayin Properties</strong> delivers actionable insights to advance your projects with confidence.
                    </p>
                </div>
            </div>
        )
    }
];

const ConsultancyServices = () => {
    return (
        <div className="font-sans antialiased">
            {services.map((service, index) => (
                <div
                    key={index}
                    className={`${service.bgColor} ${service.textColor} py-16 px-4 sm:px-6 lg:px-8`}
                >
                    <div className="max-w-6xl mx-auto">
                        <div className="text-center mb-12">
                            <span className="text-4xl mb-4 inline-block">{service.icon}</span>
                            <h2 className="text-4xl md:text-5xl font-bold mb-4">
                                {service.name.replace(/^[^\w]+/, '')}
                            </h2>
                            <div className="w-24 h-1 bg-blue-400 mx-auto"></div>
                        </div>

                        <div className="max-w-4xl mx-auto">
                            {service.description}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default ConsultancyServices;