"use client";

import React from "react";

import FooterSection from "@/app/(nondashboard)/landing/FooterSection";
import NewsLetter from "@/components/NewsLetter";
import BreadCrumb from "@/components/BreadCrumb";
import Construction from "@/app/(nondashboard)/construction/Construction";
import ConstructionCard from "@/app/(nondashboard)/construction/ConstructionCard";

const SearchPage = () => {
    return (
        <div className="w-full min-h-screen flex flex-col bg-white">
            <main className="flex flex-col flex-1">
                <BreadCrumb
                    items={[
                        { label: 'Home', href: '/' },
                        { label: 'Construction', href: '/construction' },

                    ]}
                />
                <Construction/>
                <ConstructionCard/>
                <NewsLetter/>
                <FooterSection/>
            </main>
        </div>
    );
};

export default SearchPage;
