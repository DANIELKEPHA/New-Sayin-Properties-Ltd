import React from 'react';

const services = [
    {
        name: 'Land Transaction Services',
        icon: '🏞️',
        bgColor: 'bg-gradient-to-br from-gray-600 to-gray-900',
        textColor: 'text-white',
        description: (
            <div className="space-y-8">
                <div className="space-y-4 text-lg leading-relaxed">
                    <h3 className="text-3xl font-bold text-emerald-400">Land Acquisition & Disposition</h3>
                    <p className="text-gray-300">
                        Land transactions require specialized expertise to navigate legal, financial, and procedural complexities.
                        <span className="text-white font-medium"> Sayin Properties Limited</span> provides end-to-end support
                        for seamless property transfers.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {[
                        {
                            title: "Due Diligence & Verification",
                            icon: "🔍",
                            description: "Comprehensive land searches and ownership verification to ensure legitimate transactions",
                            color: "text-amber-400"
                        },
                        {
                            title: "Sale Agreement Execution",
                            icon: "📝",
                            description: "Drafting legally binding contracts with proper witnessing for enforceable agreements",
                            color: "text-blue-400"
                        },
                        {
                            title: "Legal & Financial Advisory",
                            icon: "💼",
                            description: "Expert guidance on payment structures and transaction security measures",
                            color: "text-purple-400"
                        },
                        {
                            title: "Title Transfer Completion",
                            icon: "🏷️",
                            description: "Oversight of final payments and registration with the Land Registry",
                            color: "text-emerald-400"
                        }
                    ].map((service, idx) => (
                        <div
                            key={idx}
                            className="bg-gray-800/50 p-6 rounded-xl border border-gray-700 hover:border-emerald-400/30 transition-all duration-300"
                        >
                            <div className="flex items-start space-x-4">
                                <span className={`text-2xl ${service.color}`}>{service.icon}</span>
                                <div>
                                    <h4 className={`text-xl font-semibold mb-2 ${service.color}`}>{service.title}</h4>
                                    <p className="text-gray-300">{service.description}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-8 p-6 bg-gray-800 rounded-xl border border-gray-700">
                    <h4 className="text-xl font-semibold text-emerald-400 mb-3">Our Transaction Process</h4>
                    <ol className="space-y-4 text-gray-300">
                        {[
                            "Initial consultation and needs assessment",
                            "Comprehensive due diligence and verification",
                            "Drafting and execution of legal agreements",
                            "Secure payment structuring and monitoring",
                            "Final title transfer and registration"
                        ].map((step, idx) => (
                            <li key={idx} className="flex items-start">
                                <span className="bg-emerald-400/10 text-emerald-400 rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-1 flex-shrink-0">
                                    {idx + 1}
                                </span>
                                <span>{step}</span>
                            </li>
                        ))}
                    </ol>
                </div>
            </div>
        )
    }
];

const LandServices = () => {
    return (
        <div className="font-sans antialiased">
            {services.map((service, index) => (
                <div
                    key={index}
                    className={`${service.bgColor} ${service.textColor} py-20 px-4 sm:px-6 lg:px-8`}
                >
                    <div className="max-w-7xl mx-auto">
                        <div className="text-center mb-16">
                            <span className="text-5xl mb-6 inline-block">{service.icon}</span>
                            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-blue-400">
                                {service.name}
                            </h2>
                            <div className="w-32 h-1 bg-gradient-to-r from-emerald-400 to-blue-500 mx-auto rounded-full"></div>
                        </div>

                        <div className="max-w-6xl mx-auto">
                            {service.description}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default LandServices;