'use client'

import Link from "next/link";
import React from "react";
import { CgDebug } from "react-icons/cg";
import { usePathname } from "next/navigation";
import classNames from "classnames";

const NavBar = () => {
  const currentPath = usePathname();
  //array of objects
  const links = [
    { label: "Dashboard", href: "/" },
    { label: "Issues", href: "/issues" },
  ];
  return (
    <nav className="flex space-x-6 border-b mb-5 px-5 h-14 items-center">
      <Link href="/">
        <CgDebug />
      </Link>
      <ul className="flex space-x-6">
        {/* We named every object link */}
        {links.map((link) => (
          <Link
            key={link.href}
            className={
              (classNames(
                "tracking-normal",
                {
                "text-zinc-500": currentPath !== link.href,
                "text-zinc-900": currentPath === link.href,
                "hover:text-zinc-600": true,
              }))
            }
            href={link.href}
          >
            {link.label}
          </Link>
        ))}
      </ul>
    </nav>
  );
};

export default NavBar;
