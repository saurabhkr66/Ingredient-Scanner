"use client";

import { useEffect, useState } from "react";
import {
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
  useAuth,
} from "@clerk/nextjs";
import { ChevronDown, SquarePen } from "lucide-react";
import Link from "next/link";
import ModeToggle from "./Theme";
import { Button } from "../ui/button";
import Mytooltip from "./Toottip";
import { Separator } from "../ui/separator";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import clsx from "clsx";

export default function Header() {
  const { isSignedIn } = useAuth();
  const [show, setShow] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setShow(currentScrollY < lastScrollY || currentScrollY < 50);
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <header
      className={clsx(
        "bg-background fixed top-0 z-50 w-full shadow-md transition-transform duration-300",
        show ? "translate-y-0" : "-translate-y-full",
      )}
    >
      <nav className="flex w-full items-center justify-between p-2 px-4 sm:p-4 md:px-6">
        {/* Left Section */}
        <div className="flex items-center gap-8">
          <Link href={isSignedIn ? "/workspace" : "/"} className="flex items-center">
            <h1 className="text-2xl font-bold italic">Purely Scan</h1>
          </Link>

          {/* Navigation Links */}
          <div className="hidden items-center space-x-6 md:flex">
            <Link href="/" className="text-foreground hover:text-primary transition-colors">
              Home
            </Link>
            
            <Link href="/pricing" className="text-foreground hover:text-primary transition-colors">
              Pricing
            </Link>
            <SignedIn>
              <Link
                href="/history"
                className="text-foreground hover:text-primary transition-colors"
              >
                History
              </Link>
            </SignedIn>
            <DropdownMenu>
              <DropdownMenuTrigger className="text-foreground hover:text-primary flex items-center transition-colors">
                Resources <ChevronDown className="ml-1 h-4 w-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>
                  <Link href="/refund-cancellation" className="w-full">
                    refund policy
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href="/privicy-policy" className="w-full">
                    Privacy-Policy
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href="/hiddenHistory" className="w-full">
                    Hidden History
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* Right Section */}
        <div className="ml-auto flex items-center gap-6">
          <Mytooltip text="theme">
            <ModeToggle />
          </Mytooltip>
          <SignedOut>
            <Button variant="outline" className="hidden sm:inline-flex" asChild>
              <SignUpButton mode="modal">Join our Community</SignUpButton>
            </Button>
            <Button className="bg-blue-500 text-white hover:bg-blue-600" asChild>
              <SignInButton mode="modal">Start</SignInButton>
            </Button>
          </SignedOut>

          <SignedIn>
            <Link href={"/payment"}>
              <Button
                variant={"outline"}
                className="hidden bg-blue-500 text-white hover:bg-blue-600 hover:text-white sm:block"
              >
                Credits {}
              </Button>
            </Link>
            <UserButton />
          </SignedIn>
        </div>
      </nav>
      <Separator />
    </header>
  );
}
