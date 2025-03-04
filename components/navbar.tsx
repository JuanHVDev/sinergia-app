import Link from "next/link";
import React from "react";
import { Button } from "./ui/button";
import ButtonSignOut from "./buttonsignout";

const NavBar = () => {
    return (
        <header className="flex flex-row justify-between items-center h-24 bg-gray-100 px-4">
            <Link
                href="/dashboard"
                className="flex items-center justify-center"
            >
                {/* <Image src="/logo.svg" alt="logo" width={40} height={40} /> */}
                <span className="ml-2 text-2xl font-bold">Sinergia</span>
            </Link>
            <nav className="flex flex-row gap-4 items-center justify-center">
                <Link href="/dashboard">Dashboard</Link>
                <Link href="/dashboard/settings">Settings</Link>
                <Link href="/dashboard/profile">Profile</Link>
                <ButtonSignOut />
            </nav>
        </header>
    );
};

export default NavBar;
