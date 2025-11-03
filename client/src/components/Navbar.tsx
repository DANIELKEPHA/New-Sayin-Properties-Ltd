"use client";

import { NAVBAR_HEIGHT } from "@/lib/constants";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Button } from "./ui/button";
import { useGetAuthUserQuery } from "@/state/api";
import { usePathname, useRouter } from "next/navigation";
import { signOut } from "aws-amplify/auth";
import {
    Bell,
    MessageCircle,
    Plus,
    Search,
    Building,
    Users,
    HardHat,
    Scale,
    Mail,
    Phone,
    Settings,
    LogOut,
    ChevronRight,
    Menu
} from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { cn } from "@/lib/utils";

// Types
interface NavigationItem {
    name: string;
    href: string;
    icon: React.ComponentType<any>;
    description?: string;
}

interface ContactInfo {
    email: string;
    phones: string[];
}

// Constants
const CONTACT_INFO: ContactInfo = {
    email: "info@sayinpropertiesltd.com",
    phones: ["+254 701 021100", "+254 741 681612", "+254 710 270511"]
};

const NAVIGATION_ITEMS: NavigationItem[] = [
    {
        name: "About",
        href: "/about",
        icon: Users,
        description: "Learn about our company"
    },
    {
        name: "Consultancy",
        href: "/consultancy",
        icon: MessageCircle,
        description: "Expert property advice"
    },
    {
        name: "Construction",
        href: "/construction",
        icon: HardHat,
        description: "Building and development"
    },
    {
        name: "Conveyancing",
        href: "/conveyancing",
        icon: Scale,
        description: "Legal property transfer"
    },
];

// Sub-components
const ContactBar: React.FC = () => (
    <div className="bg-slate-900 border-b border-slate-700/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-3">
                {/* Contact Information */}
                <div className="flex items-center space-x-6 text-sm text-slate-300">
                    <div className="flex items-center space-x-2">
                        <Mail className="h-3.5 w-3.5 text-blue-400" />
                        <a
                            href={`mailto:${CONTACT_INFO.email}`}
                            className="hover:text-white transition-colors duration-200"
                        >
                            {CONTACT_INFO.email}
                        </a>
                    </div>
                    <div className="flex items-center space-x-3">
                        <Phone className="h-3.5 w-3.5 text-blue-400" />
                        <div className="flex space-x-4">
                            {CONTACT_INFO.phones.map((phone, index) => (
                                <a
                                    key={index}
                                    href={`tel:${phone.replace(/\s/g, '')}`}
                                    className="hover:text-white transition-colors duration-200"
                                >
                                    {phone}
                                </a>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="flex items-center space-x-4">
                    <button className="text-slate-300 hover:text-white transition-colors duration-200 text-sm font-medium">
                        Schedule Consultation
                    </button>
                    <div className="w-px h-4 bg-slate-600"></div>
                    <button className="text-slate-300 hover:text-white transition-colors duration-200 text-sm font-medium">
                        Agent Portal
                    </button>
                </div>
            </div>
        </div>
    </div>
);

const Logo: React.FC = () => (
    <Link href="/" className="group cursor-pointer" scroll={false}>
        <div className="flex items-center gap-3">
            <div className="relative">
                <Image
                    src="/logo.svg"
                    alt="Sayin Properties Logo"
                    width={140}
                    height={52}
                    className="h-10 md:h-12 w-auto object-contain transition-all duration-300 group-hover:scale-105 group-hover:drop-shadow-[0_0_12px_rgba(37,99,235,0.4)]"
                    priority
                />
            </div>
        </div>
    </Link>
);

const NavigationMenu: React.FC<{
    items: NavigationItem[];
    className?: string;
    orientation?: "horizontal" | "vertical";
}> = ({ items, className, orientation = "horizontal" }) => {
    const pathname = usePathname();

    const isActive = (href: string) => pathname === href;

    return (
        <nav className={cn(
            orientation === "horizontal"
                ? "flex items-center space-x-1"
                : "flex flex-col space-y-2",
            className
        )}>
            {items.map((item) => {
                const Icon = item.icon;
                return (
                    <Link
                        key={item.name}
                        href={item.href}
                        className={cn(
                            "flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all duration-200 group relative",
                            isActive(item.href)
                                ? "text-blue-600 bg-blue-50 font-semibold"
                                : "text-slate-700 hover:text-blue-600 hover:bg-blue-50/80",
                            orientation === "horizontal" ? "flex-row" : "flex-row justify-between"
                        )}
                    >
                        <div className="flex items-center gap-3">
                            <Icon className={cn(
                                "h-4 w-4 transition-colors",
                                isActive(item.href)
                                    ? "text-blue-600"
                                    : "text-slate-500 group-hover:text-blue-600"
                            )} />
                            <span className="font-medium">{item.name}</span>
                        </div>
                        {orientation === "vertical" && (
                            <ChevronRight className="h-4 w-4 text-slate-400 group-hover:text-blue-600" />
                        )}
                    </Link>
                );
            })}
        </nav>
    );
};

const UserDropdown: React.FC<{ user: any }> = ({ user }) => {
    const router = useRouter();

    const handleSignOut = async () => {
        await signOut();
        window.location.href = "/";
    };

    const userInitial = user.userRole?.[0]?.toUpperCase() || "U";

    return (
        <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center gap-3 focus:outline-none hover:bg-slate-100 rounded-xl px-3 py-2 transition-all duration-200 border border-transparent hover:border-slate-200">
                <Avatar className="h-9 w-9 border-2 border-slate-200 shadow-sm">
                    <AvatarImage src={user.userInfo?.image} />
                    <AvatarFallback className="bg-gradient-to-br from-blue-600 to-cyan-600 text-white font-semibold text-sm">
                        {userInitial}
                    </AvatarFallback>
                </Avatar>
                <div className="hidden md:block text-left">
                    <p className="text-sm font-semibold text-slate-900 leading-tight">
                        {user.userInfo?.name || "User"}
                    </p>
                    <p className="text-xs text-slate-500 capitalize mt-0.5">
                        {user.userRole?.toLowerCase() || "user"}
                    </p>
                </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent
                className="w-64 bg-white/95 backdrop-blur-md border border-slate-200 shadow-xl rounded-2xl p-2"
                align="end"
            >
                <div className="px-3 py-2 border-b border-slate-100">
                    <p className="text-sm font-semibold text-slate-900">{user.userInfo?.name}</p>
                    <p className="text-xs text-slate-500 capitalize">{user.userRole?.toLowerCase()}</p>
                </div>

                <DropdownMenuItem
                    className="cursor-pointer rounded-lg hover:bg-blue-50 hover:text-blue-600 px-3 py-3 my-1"
                    onClick={() => router.push(
                        user.userRole?.toLowerCase() === "manager"
                            ? "/managers/properties"
                            : "/tenants/favorites"
                    )}
                >
                    <Building className="h-4 w-4 mr-3 text-slate-600" />
                    <span className="font-medium">Dashboard</span>
                </DropdownMenuItem>

                <DropdownMenuItem
                    className="cursor-pointer rounded-lg hover:bg-blue-50 hover:text-blue-600 px-3 py-3 my-1"
                    onClick={() => router.push(`/${user.userRole?.toLowerCase()}s/settings`)}
                >
                    <Settings className="h-4 w-4 mr-3 text-slate-600" />
                    <span className="font-medium">Settings</span>
                </DropdownMenuItem>

                <DropdownMenuSeparator className="bg-slate-100 my-1" />

                <DropdownMenuItem
                    className="cursor-pointer rounded-lg hover:bg-red-50 hover:text-red-600 px-3 py-3 my-1"
                    onClick={handleSignOut}
                >
                    <LogOut className="h-4 w-4 mr-3 text-slate-600" />
                    <span className="font-medium">Sign Out</span>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

const AuthButtons: React.FC = () => (
    <div className="flex items-center gap-3">
        <Link href="/signin">
            <Button
                variant="ghost"
                className="h-11 px-6 font-semibold text-slate-700 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all duration-200 border-2 border-transparent hover:border-blue-100"
            >
                Sign In
            </Button>
        </Link>
        <Link href="/signup">
            <Button
                className="h-11 px-6 font-semibold text-white bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 shadow-lg hover:shadow-xl rounded-xl transition-all duration-300 group"
            >
                Join Now
                <ChevronRight className="h-4 w-4 ml-2 transition-transform group-hover:translate-x-0.5" />
            </Button>
        </Link>
    </div>
);

const NotificationBadge: React.FC<{
    icon: React.ComponentType<any>;
    count?: number;
    color?: string;
}> = ({ icon: Icon, count = 0, color = "bg-red-500" }) => (
    <button className="relative p-2.5 text-slate-600 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all duration-200 group">
        <Icon className="h-5 w-5 transition-transform group-hover:scale-110" />
        {count > 0 && (
            <span className={cn(
                "absolute -top-1 -right-1 w-4 h-4 rounded-full border-2 border-white text-[10px] font-bold text-white flex items-center justify-center",
                color
            )}>
        {count > 9 ? "9+" : count}
      </span>
        )}
    </button>
);

const DashboardActions: React.FC<{ user: any }> = ({ user }) => {
    const router = useRouter();
    const isManager = user.userRole?.toLowerCase() === "manager";

    return (
        <Button
            onClick={() => router.push(isManager ? "/managers/newproperty" : "/search")}
            className="h-11 px-6 font-semibold bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white shadow-lg hover:shadow-xl rounded-xl transition-all duration-300 group"
        >
            {isManager ? (
                <>
                    <Plus className="h-4 w-4 mr-2 transition-transform group-hover:rotate-90" />
                    <span>Add Property</span>
                </>
            ) : (
                <>
                    <Search className="h-4 w-4 mr-2" />
                    <span>Search Properties</span>
                </>
            )}
        </Button>
    );
};

// Main Component
const Navbar: React.FC = () => {
    const { data: authUser, isLoading } = useGetAuthUserQuery();
    const pathname = usePathname();

    const isDashboardPage = pathname.includes("/managers") || pathname.includes("/tenants");

    return (
        <div className="fixed top-0 left-0 w-full z-50">
            {/* Contact Information Bar */}
            <ContactBar />

            {/* Main Navigation Bar */}
            <div
                className={cn(
                    "bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-sm transition-all duration-300",
                    "hover:shadow-lg"
                )}
                style={{ height: `${NAVBAR_HEIGHT}px` }}
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
                    <div className="flex justify-between items-center h-full">
                        {/* Left Section - Logo & Navigation */}
                        <div className="flex items-center gap-8">
                            <Logo />

                            {/* Main Navigation */}
                            {!isDashboardPage && (
                                <div className="hidden xl:block">
                                    <NavigationMenu items={NAVIGATION_ITEMS} />
                                </div>
                            )}
                        </div>

                        {/* Right Section - Actions & Auth */}
                        <div className="flex items-center gap-4">
                            {/* Dashboard-specific Actions */}
                            {isDashboardPage && authUser && (
                                <>
                                    <DashboardActions user={authUser} />

                                    {/* Notifications & Messages */}
                                    <div className="flex items-center gap-2">
                                        <NotificationBadge
                                            icon={Bell}
                                            count={3}
                                            color="bg-red-500"
                                        />
                                        <NotificationBadge
                                            icon={MessageCircle}
                                            count={1}
                                            color="bg-green-500"
                                        />
                                    </div>
                                </>
                            )}

                            {/* Authentication Section */}
                            <div className="flex items-center gap-4">
                                {authUser ? (
                                    <UserDropdown user={authUser} />
                                ) : (
                                    <AuthButtons />
                                )}
                            </div>

                            {/* Mobile Menu Trigger */}
                            <button className="xl:hidden p-2 text-slate-600 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-colors">
                                <Menu className="h-5 w-5" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Navbar;