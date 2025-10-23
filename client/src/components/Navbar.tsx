"use client";

import { NAVBAR_HEIGHT } from "@/lib/constants";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Button } from "./ui/button";
import { useGetAuthUserQuery } from "@/state/api";
import { usePathname, useRouter } from "next/navigation";
import { signOut } from "aws-amplify/auth";
import { Bell, MessageCircle, Plus, Search, Building, Users, HardHat, Scale } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { SidebarTrigger } from "./ui/sidebar";

const Navbar = () => {
    const { data: authUser } = useGetAuthUserQuery();
    const router = useRouter();
    const pathname = usePathname();

    const isDashboardPage =
        pathname.includes("/managers") || pathname.includes("/tenants");

    const handleSignOut = async () => {
        await signOut();
        window.location.href = "/";
    };

    const navigationItems = [
        { name: "About", href: "/about", icon: Users },
        { name: "Consultancy", href: "/consultancy", icon: MessageCircle },
        { name: "Construction", href: "/construction", icon: HardHat },
        { name: "Conveyancing", href: "/conveyancing", icon: Scale },
    ];

    return (
        <div className="fixed top-0 left-0 w-full z-50">
            {/* Top Info Bar */}
            <div className="bg-slate-900 border-b border-slate-700/50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center py-5">
                        {/* Contact Info */}
                        <div className="flex items-center space-x-8 text-xs text-slate-300">
                            <div className="flex items-center space-x-1">
                                <svg className="h-3 w-3 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                                <span>info@sayinpropertiesltd.com</span>
                            </div>
                            <div className="flex items-center space-x-3">
                                <svg className="h-3 w-3 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                </svg>
                                <div className="flex space-x-4">
                                    <span>+254 100 274 658</span>
                                    <span>+254 116 834 751</span>
                                    <span>+254 752 840 086</span>
                                </div>
                            </div>
                        </div>

                        {/* Additional Links */}
                        <div className="flex items-center space-x-4">
                            <button className="text-slate-300 hover:text-white transition-colors text-xs">
                                Schedule Consultation
                            </button>
                            <div className="w-px h-3 bg-slate-600"></div>
                            <button className="text-slate-300 hover:text-white transition-colors text-xs">
                                Agent Portal
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Navigation Bar */}
            <div
                className="bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-lg flex items-center"
                style={{ height: `${NAVBAR_HEIGHT}px` }}
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-full">
                <div className="flex justify-between items-center h-full">
                        <div className="flex items-center gap-8">
                            {/* Logo */}
                            <Link
                                href="/"
                                className="cursor-pointer hover:opacity-80 transition-opacity"
                                scroll={false}
                            >
                                <div className="flex items-center gap-3">
                                    <Image
                                        src="/logo.svg"
                                        alt="Sayin Properties Logo"
                                        width={0}
                                        height={0}
                                        sizes="100vw"
                                        className="w-auto h-10 md:h-12 object-contain transition-transform duration-300 hover:scale-110 hover:drop-shadow-[0_0_10px_rgba(37,99,235,0.6)]"
                                    />

                                    <div className="text-xl font-bold text-slate-900">
                                        Sayin
                                        <span className="text-blue-600 font-light">
                      &nbsp;Properties
                    </span>
                                    </div>
                                </div>
                            </Link>

                            {/* Navigation Links */}
                            {!isDashboardPage && (
                                <nav className="hidden lg:flex items-center space-x-1">
                                    {navigationItems.map((item) => {
                                        const Icon = item.icon;
                                        return (
                                            <Link
                                                key={item.name}
                                                href={item.href}
                                                className="flex items-center gap-2 px-4 py-2 text-slate-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200 group"
                                            >
                                                <Icon className="h-4 w-4 group-hover:text-blue-600" />
                                                <span className="font-medium">{item.name}</span>
                                            </Link>
                                        );
                                    })}
                                </nav>
                            )}
                        </div>

                        {/* Dashboard Actions */}
                        <div className="flex items-center gap-4">
                            {isDashboardPage && authUser && (
                                <Button
                                    variant="secondary"
                                    className="bg-blue-600 text-white hover:bg-blue-700 shadow-lg hover:shadow-blue-500/25"
                                    onClick={() =>
                                        router.push(
                                            authUser.userRole?.toLowerCase() === "manager"
                                                ? "/managers/newproperty"
                                                : "/search"
                                        )
                                    }
                                >
                                    {authUser.userRole?.toLowerCase() === "manager" ? (
                                        <>
                                            <Plus className="h-4 w-4" />
                                            <span className="hidden md:block ml-2">Add Property</span>
                                        </>
                                    ) : (
                                        <>
                                            <Search className="h-4 w-4" />
                                            <span className="hidden md:block ml-2">
                        Search Properties
                      </span>
                                        </>
                                    )}
                                </Button>
                            )}

                            {/* Auth Section */}
                            {authUser ? (
                                <div className="flex items-center gap-4">
                                    {/* Notifications */}
                                    <button className="relative p-2 text-slate-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                                        <Bell className="h-5 w-5" />
                                        <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-white"></span>
                                    </button>

                                    {/* Messages */}
                                    <button className="relative p-2 text-slate-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                                        <MessageCircle className="h-5 w-5" />
                                        <span className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></span>
                                    </button>

                                    {/* User Dropdown */}
                                    <DropdownMenu>
                                        <DropdownMenuTrigger className="flex items-center gap-3 focus:outline-none hover:bg-slate-100 rounded-lg px-2 py-1 transition-colors">
                                            <Avatar className="h-8 w-8 border-2 border-slate-200">
                                                <AvatarImage src={authUser.userInfo?.image} />
                                                <AvatarFallback className="bg-blue-600 text-white text-sm">
                                                    {authUser.userRole?.[0].toUpperCase()}
                                                </AvatarFallback>
                                            </Avatar>
                                            <div className="hidden md:block text-left">
                                                <p className="text-sm font-medium text-slate-900">
                                                    {authUser.userInfo?.name}
                                                </p>
                                                <p className="text-xs text-slate-500 capitalize">
                                                    {authUser.userRole?.toLowerCase()}
                                                </p>
                                            </div>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent
                                            className="bg-white text-slate-900 border border-slate-200 shadow-xl rounded-xl min-w-48"
                                            align="end"
                                        >
                                            <DropdownMenuItem
                                                className="cursor-pointer hover:bg-blue-50 hover:text-blue-600 font-medium px-4 py-3"
                                                onClick={() =>
                                                    router.push(
                                                        authUser.userRole?.toLowerCase() === "manager"
                                                            ? "/managers/properties"
                                                            : "/tenants/favorites",
                                                        { scroll: false }
                                                    )
                                                }
                                            >
                                                <Building className="h-4 w-4 mr-3" />
                                                Go to Dashboard
                                            </DropdownMenuItem>
                                            <DropdownMenuSeparator className="bg-slate-200" />
                                            <DropdownMenuItem
                                                className="cursor-pointer hover:bg-blue-50 hover:text-blue-600 px-4 py-3"
                                                onClick={() =>
                                                    router.push(
                                                        `/${authUser.userRole?.toLowerCase()}s/settings`,
                                                        { scroll: false }
                                                    )
                                                }
                                            >
                                                <svg className="h-4 w-4 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                </svg>
                                                Settings
                                            </DropdownMenuItem>
                                            <DropdownMenuSeparator className="bg-slate-200" />
                                            <DropdownMenuItem
                                                className="cursor-pointer hover:bg-red-50 hover:text-red-600 px-4 py-3"
                                                onClick={handleSignOut}
                                            >
                                                <svg className="h-4 w-4 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                                </svg>
                                                Sign out
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </div>
                            ) : (
                                /* Sign In / Join Now Buttons */
                                <div className="flex items-center gap-3">
                                    <Link href="/signin">
                                        <Button
                                            variant="ghost"
                                            className="h-10 px-6 font-medium text-slate-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors border border-transparent hover:border-blue-200"
                                        >
                                            Sign In
                                        </Button>
                                    </Link>
                                    <Link href="/signup">
                                        <Button
                                            className="h-10 px-6 font-medium text-white bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 shadow-lg hover:shadow-xl rounded-lg transition-all duration-300"
                                        >
                                            Join Now
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="h-4 w-4 ml-2 -mr-1"
                                                viewBox="0 0 20 20"
                                                fill="currentColor"
                                            >
                                                <path
                                                    fillRule="evenodd"
                                                    d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                                                    clipRule="evenodd"
                                                />
                                            </svg>
                                        </Button>
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Navbar;