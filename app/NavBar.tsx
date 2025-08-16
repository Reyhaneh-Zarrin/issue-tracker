"use client";

import Link from "next/link";
import React from "react";
import { CgDebug } from "react-icons/cg";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import classNames from "classnames";
import { Avatar, Box, Button, DropdownMenu } from "@radix-ui/themes";

const NavBar = () => {
  const currentPath = usePathname();
  const { status, data: session } = useSession();
  //array of objects
  const links = [
    { label: "Dashboard", href: "/" },
    { label: "Issues", href: "/issues" },
  ];
  return (
    <nav
      className="flex space-x-6 border-b mb-5 px-5 h-14 items-center"
      style={{ borderBottomColor: "#00A86B" }}
    >
      <Link href="/">
        <CgDebug />
      </Link>

      <ul className="flex space-x-6">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              className={classNames("tracking-normal", {
                "text-zinc-500": currentPath !== link.href,
                "text-zinc-900": currentPath === link.href,
                "hover:text-zinc-600": true,
              })}
              href={link.href}
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
      <div className="flex-grow" />

      <Box>
        {status === "authenticated" && (
          <DropdownMenu.Root>
            <DropdownMenu.Trigger>
              <Avatar
                src={session.user!.image!}
                fallback={"?"}
                className="cursor-pointer"
                referrerPolicy="no-referrer"
              />
            </DropdownMenu.Trigger>
            <DropdownMenu.Content>
              <DropdownMenu.Label>{session.user!.email}</DropdownMenu.Label>
              <DropdownMenu.Item>
                <Link href="/api/auth/signout">Log out</Link>
              </DropdownMenu.Item>
            </DropdownMenu.Content>
          </DropdownMenu.Root>
        )}
      </Box>
      <Box>
        {status === "unauthenticated" && (
          <Link href=
                "/api/auth/signin"
            className="text-black-600 hover:underline"
          >
            Login</Link>)}
      </Box>
    </nav>
  );
};

export default NavBar;
