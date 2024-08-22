import React from "react";
import Link from "next/link";

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
}

const NavLink: React.FC<NavLinkProps> = ({ href, children, className }) => {
  return (
    <Link
      href={href}
      className={`text-2xl cursor-pointer transition-all border-b-2 font-bold py-2 px-4 h-fit border-transparent hover:border-black duration-300 ease-in ${className}`}
    >
      {children}
    </Link>
  );
};
export default NavLink;
