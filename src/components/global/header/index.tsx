import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronDown, Phone } from 'lucide-react';
import { MENU_ITEMS } from '@/constants/links'

const Header = () => {
  return (
    <div className="w-full px-4 py-2 flex items-center justify-between bg-transparent">
      {/* Left Section: Logo */}
      <div className="flex items-center gap-2 text-black">
        <div className="flex items-center justify-center">
          
          <Image alt="logo" src="/next.svg"
            width={100}
            height={100}
          />
          
        </div>
      </div>

      {/* Center Section: Navigation Links */}
      <div className="hidden md:flex items-center gap-8 text-black font-medium">
        
        {MENU_ITEMS.filter(item => !item.hidden)
          .map((item) => (
            <Link 
              key={item.title} 
              href={item.href} 
              className="hover:opacity-80 transition-opacity"
            >
              {item.title}
            </Link>
        ))}
      </div>

      {/* Right Section: Login */}
      <div className="flex items-center gap-6">
        <div className="hidden lg:flex items-center border-r border-white/30 pr-6">
          <button className="text-white hover:scale-110 transition-transform">
            <Phone size={20} fill="white" />
          </button>
        </div>
        
        <button className="bg-[#e67e22] hover:bg-[#d35400] text-white px-8 py-3 rounded-md font-semibold transition-colors shadow-lg">
          Login
        </button>
      </div>
    </div>
  );
};

export default Header;