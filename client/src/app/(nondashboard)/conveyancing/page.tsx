"use client";

import React from "react";

import FooterSection from "@/app/(nondashboard)/landing/FooterSection";
import NewsLetter from "@/components/NewsLetter";
import Conveyancing from "@/app/(nondashboard)/conveyancing/Conveyancing";
import BreadCrumb from "@/components/BreadCrumb";
import ConveyancingCard from "@/app/(nondashboard)/conveyancing/ConveyancingCard";

const SearchPage = () => {
    return (
        <div className="w-full min-h-screen flex flex-col bg-white">
            <main className="flex flex-col flex-1">
                <BreadCrumb
                    items={[
                        { label: 'Home', href: '/' },
                        { label: 'conveyancing', href: '/conveyancing' },

                    ]}
                />
                <Conveyancing />
                <ConveyancingCard/>
                <NewsLetter/>
                <FooterSection />
            </main>
        </div>
    );
};

export default SearchPage;
