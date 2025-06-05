'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
  Phone,
  Mail,
  MapPin,
  ChevronRight,
  MessageSquare
} from 'lucide-react';

// Types
export type SocialLink = {
  icon: React.ComponentType<{ size?: number }>;
  url: string;
  name: string;
};

export type QuickLink = {
  title: string;
  url: string;
};

export type ContactInfo = {
  icon: React.ComponentType<{ size?: number }>;
  text: string[];
};

export type FooterProps = {
  companyInfo: {
    name: string;
    logo: string;
    description: string;
    socialLinks: SocialLink[];
    quickLinks: QuickLink[];
    contactInfo: ContactInfo[];
    address: string[];
    copyright: string;
  };
  newsletter: {
    title: string;
    placeholder: string;
    buttonText: string;
  };
  instagramPosts: {
    images: string[];
    profileUrl: string;
  };
  paymentMethods: {
    text: string;
    image: string;
  };
};

// Default data
const defaultFooterData: FooterProps = {
  companyInfo: {
    name: "Map My Tour",
    logo: "/logo.png",
    description: "Rapidiously myocardinate cross-platform intellectual capital model. Appropriately create interactive infrastructures.",
    socialLinks: [
      { icon: Facebook, url: "https://facebook.com", name: "Facebook" },
      { icon: Twitter, url: "https://twitter.com", name: "Twitter" },
      { icon: Linkedin, url: "https://linkedin.com", name: "LinkedIn" },
      { icon: MessageSquare, url: "https://whatsapp.com", name: "WhatsApp" },
      { icon: Instagram, url: "https://instagram.com", name: "Instagram" }
    ],
    quickLinks: [
      { title: "Home", url: "#" },
      { title: "About us", url: "#" },
      { title: "Our Service", url: "#" },
      { title: "Terms of Service", url: "#" },
      { title: "Tour Booking Now", url: "#" }
    ],
    contactInfo: [
      { icon: Phone, text: ["+91 92609 27665"] },
      { icon: Mail, text: ["info@mapmytour.in", "help@mapmytour.in"] },
      { icon: MapPin, text: ["54 Colony Kalkaji", "Tenament Kalkaji South", "Delhi, New Delhi, Delhi", "India 110019"] }
    ],
    address: [
      "54 Colony Kalkaji",
      "Tenament Kalkaji South",
      "Delhi, New Delhi, Delhi",
      "India 110019"
    ],
    copyright: "Copyright 2025 Map My Tour. All Rights Reserved."
  },
  newsletter: {
    title: "Get Updated The Latest Newsletter",
    placeholder: "Enter Email",
    buttonText: "Subscribe Now"
  },
  instagramPosts: {
    images: Array(6).fill("").map((_, i) => `/assets/img/widget/gallery_1_${i + 1}.jpg`),
    profileUrl: "https://instagram.com"
  },
  paymentMethods: {
    text: "We Accept",
    image: "/assets/img/shape/cards.png"
  }
};

const Footer: React.FC = () => {
  const {
    companyInfo,
    newsletter,
    instagramPosts,
    paymentMethods
  } = defaultFooterData;

  return (
    <footer className="bg-white/95">
      {/* Newsletter */}
      <div className="max-w-7xl mx-auto py-12 px-4 border-b border-gray-200">
        <div className="flex flex-col lg:flex-row justify-between items-center gap-6">
          <h2 className="text-3xl font-semibold text-[var(--title-color)]">
            {newsletter.title}
          </h2>
          <form className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <input
              type="email"
              placeholder={newsletter.placeholder}
              className="px-6 py-3 border border-[var(--theme-color)] rounded-full bg-white text-[var(--title-color)] placeholder-[var(--body-color)] w-full sm:w-80 focus:outline-none focus:ring-2 focus:ring-[var(--theme-color)]"
              required
            />
            <motion.button
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="relative z-10 bg-[var(--theme-color)] text-white px-6 py-3 rounded-full font-semibold flex items-center gap-2 hover:bg-[var(--title-color)] transition-colors duration-300"
            >
              <span className="relative z-10">{newsletter.buttonText}</span>
              <svg className="w-5 h-5 relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path>
              </svg>
            </motion.button>
          </form>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto py-12 px-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
        {/* Logo & About */}
        <div>
          <div className="flex items-center space-x-3 group cursor-pointer mb-4">
            <div className="flex justify-center items-center py-4">
              <div className="relative">
                <img
                  src={companyInfo.logo}
                  alt={`${companyInfo.name} Logo`}
                  className="w-20 sm:w-24 md:w-32 lg:w-40 object-contain"
                />
              </div>
            </div>
          </div>
          <p className="text-[var(--body-color)] mb-6 text-sm">
            {companyInfo.description}
          </p>
          {/* Social Icons */}
          <div className="flex gap-3">
            {companyInfo.socialLinks.map((social, i) => (
              <motion.a
                key={i}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -3 }}
                className="bg-[var(--theme-color)] w-10 h-10 flex items-center justify-center rounded-full hover:bg-[var(--title-color)] transition-all duration-300 text-white"
                aria-label={social.name}
              >
                <social.icon size={18} />
              </motion.a>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-xl font-semibold mb-6 text-[var(--title-color)]">Quick Links</h3>
          <ul className="space-y-3 text-[var(--body-color)] text-sm">
            {companyInfo.quickLinks.map((link, i) => (
              <motion.li
                key={i}
                whileHover={{ x: 5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <a href={link.url} className="flex items-center group transition-colors duration-200">
                  <ChevronRight
                    className="text-[var(--theme-color)] group-hover:text-[var(--title-color)] mr-1 transition-colors duration-200"
                    size={16}
                  />
                  <span className="group-hover:text-[var(--theme-color)] transition-colors duration-200">
                    {link.title}
                  </span>
                </a>
              </motion.li>
            ))}
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-xl font-semibold mb-6 text-[var(--title-color)]">Get In Touch</h3>
          <ul className="space-y-5 text-sm text-[var(--body-color)]">
            {companyInfo.contactInfo.map((info, i) => (
              <motion.li
                key={i}
                className="flex gap-3 items-start"
                whileHover={{ x: 5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="bg-[var(--theme-color)] w-10 h-10 flex items-center justify-center rounded-full text-white">
                  <info.icon size={18} />
                </div>
                <div>
                  {info.text.map((line, j) => (
                    <p key={j}>{line}</p>
                  ))}
                </div>
              </motion.li>
            ))}
          </ul>
        </div>

        {/* Instagram Gallery */}
        <div>
          <h3 className="text-xl font-semibold mb-6 text-[var(--title-color)]">Instagram Post</h3>
          <div className="grid grid-cols-3 gap-2">
            {instagramPosts.images.map((image, i) => (
              <motion.a
                key={i}
                href={instagramPosts.profileUrl}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                className="relative group overflow-hidden rounded-md aspect-square"
              >
                <img
                  src={image}
                  alt={`Instagram post ${i + 1}`}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-[var(--theme-color)]/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <Instagram size={20} className="text-white" />
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-200 py-4 text-sm bg-[var(--smoke-color)]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 px-4">
          <p className="text-[var(--body-color)]">
            {companyInfo.copyright}
          </p>
          <div className="flex items-center gap-3">
            <span className="text-[var(--body-color)]">{paymentMethods.text}</span>
            <img src={paymentMethods.image} alt="Payment methods" className="h-6" />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;