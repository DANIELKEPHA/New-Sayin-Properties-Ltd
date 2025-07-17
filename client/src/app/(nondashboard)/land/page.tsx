"use client";

import React from "react";

import FooterSection from "@/app/(nondashboard)/landing/FooterSection";
import NewsLetter from "@/components/NewsLetter";
import Conveyancing from "@/app/(nondashboard)/conveyancing/Conveyancing";
import BreadCrumb from "@/components/BreadCrumb";
import ConveyancingCard from "@/app/(nondashboard)/conveyancing/ConveyancingCard";
import ConsultancyCard from "@/app/(nondashboard)/consultancy/ConsultancyCard";
import Consultancy from "@/app/(nondashboard)/consultancy/Consultancy";
import Land from "@/app/(nondashboard)/land/Land";
import LandCard from "@/app/(nondashboard)/land/LandCard";

const LandPage = () => {
    return (
        <div className="w-full min-h-screen flex flex-col bg-white">
            <main className="flex flex-col flex-1">
                <BreadCrumb
                    items={[
                        { label: 'Home', href: '/' },
                        { label: 'Land', href: '/land' },

                    ]}
                />
                <Land />
                <LandCard/>
                <NewsLetter/>
                <FooterSection />
            </main>
        </div>
    );
};

export default LandPage;
