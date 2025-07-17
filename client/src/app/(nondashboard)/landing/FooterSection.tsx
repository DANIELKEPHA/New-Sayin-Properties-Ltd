"use client";

import Link from "next/link";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faInstagram,
  faTwitter,
  faLinkedin,
  faYoutube,
  faXTwitter,
} from "@fortawesome/free-brands-svg-icons";
import { MapPin, Phone, Mail } from "lucide-react";


const FooterSection = () => {
  return (
      <footer className="bg-neutral-900 text-white pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
            {/* Company Info */}
            <div className="space-y-6">
              <Link href="/" className="text-2xl font-bold tracking-tight" scroll={false}>
                <span className="text-white">Sayin</span> <span className="text-primary-500">Properties Limited</span>
              </Link>
              <p className="text-neutral-400 leading-relaxed">
                Premium real estate services with unmatched expertise in luxury properties and investment opportunities.
              </p>
              <div className="flex space-x-4">
                <a href="#" aria-label="Facebook" className="text-neutral-400 hover:text-white transition-colors">
                  <FontAwesomeIcon icon={faFacebook} className="h-5 w-5" />
                </a>
                <a href="#" aria-label="Instagram" className="text-neutral-400 hover:text-white transition-colors">
                  <FontAwesomeIcon icon={faInstagram} className="h-5 w-5" />
                </a>
                <a href="#" aria-label="Twitter" className="text-neutral-400 hover:text-white transition-colors">
                  <FontAwesomeIcon icon={faXTwitter} className="h-5 w-5" />
                </a>
                <a href="#" aria-label="Linkedin" className="text-neutral-400 hover:text-white transition-colors">
                  <FontAwesomeIcon icon={faLinkedin} className="h-5 w-5" />
                </a>
              </div>
            </div>

            {/* Services */}
            <div>
              <h3 className="text-lg font-semibold mb-6 uppercase tracking-wider">Services</h3>
              <ul className="space-y-3">

                <li>
                  <Link href="/search" className="text-neutral-400 hover:text-white transition-colors">
                    Our Properties
                  </Link>
                </li>
                <li>
                  <Link href="/construction" className="text-neutral-400 hover:text-white transition-colors">
                    Real estate development
                  </Link>
                </li>
                <li>
                  <Link href="/consultancy" className="text-neutral-400 hover:text-white transition-colors">
                    Real Estate Consultancy
                  </Link>
                </li>
                <li>
                  <Link href="/conveyancing" className="text-neutral-400 hover:text-white transition-colors">
                    Conveyancing
                  </Link>
                </li>
              </ul>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-lg font-semibold mb-6 uppercase tracking-wider">Quick Links</h3>
              <ul className="space-y-3">
                <li>
                  <Link href="/" className="text-neutral-400 hover:text-white transition-colors">
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="text-neutral-400 hover:text-white transition-colors">
                    About Us
                  </Link>
                </li>
                <li>
                  <a href="#DiscoverSection" className="text-neutral-400 hover:text-white transition-colors">
                    Discover
                  </a>

                </li>
                <li>
                  <a href="#DiscoverSection" className="text-neutral-400 hover:text-white transition-colors">
                    Quick Features
                  </a>
                </li>
                <li>
                  <Link href="/search" className="text-neutral-400 hover:text-white transition-colors">
                    Search Property
                  </Link>
                </li>
                <li>
                  <Link href="/privacyPolicy" className="text-neutral-400 hover:text-white transition-colors">
                    Privacy Policy
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-6 uppercase tracking-wider">Contact Us</h3>
              <address className="not-italic space-y-4 text-neutral-400">
                <div className="flex items-start">
                  <MapPin className="h-4 w-4 mt-1 mr-3 flex-shrink-0" />
                  <span>
        MPC Building, Lebanon Round-About<br />
        P.O. Box 41079-80100, Mombasa, Kenya
      </span>
                </div>

                <div className="flex items-center">
                  <Phone className="h-4 w-4 mr-3 flex-shrink-0" />
                  <div className="space-y-1">
                    <a href="tel:+254100274658" className="block hover:text-white transition-colors">+254 100 274 658</a>
                    <a href="tel:+254116834751" className="block hover:text-white transition-colors">+254 116 834 751</a>
                    <a href="tel:+254752840086" className="block hover:text-white transition-colors">+254 752 840 086</a>
                  </div>
                </div>

                <div className="flex items-start">
                  <Mail className="h-4 w-4 mt-1 mr-3 flex-shrink-0" />
                  <div className="space-y-1">
                    <a href="mailto:sayinpropertieslimited@gmail.com" className="block hover:text-white transition-colors">sayinpropertieslimited@gmail.com</a>
                    <a href="mailto:info@sayinpropertieslimited.com" className="block hover:text-white transition-colors">info@sayinpropertieslimited.com</a>
                  </div>
                </div>

          </address>
            </div>

          </div>

          <div className="pt-8 border-t border-neutral-800">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-sm text-neutral-500 mb-4 md:mb-0">
                © {new Date().getFullYear()} Sayin Properties. All rights reserved.
              </p>
              <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-neutral-500">
                <Link href="/privacyPolicy" className="hover:text-white transition-colors">
                  Privacy Policy
                </Link>
                <Link href="/cookies" className="hover:text-white transition-colors">
                  Cookie Policy
                </Link>
              </div>
            </div>
          </div>
        </div>
      </footer>
  );
};

export default FooterSection;