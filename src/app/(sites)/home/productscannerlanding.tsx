"use client";
import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useAuth, useClerk } from "@clerk/nextjs";
export default function ProductScannerLanding() {
  const { isSignedIn } = useAuth();
  const router = useRouter();
  const { openSignIn } = useClerk();

  const handleClick = () => {
    if (isSignedIn) {
      router.push("/product-category");
    } else {
      openSignIn(); // or Clerk's modal version if needed
    }
  };

  return (
    <div className="min-h-screen overflow-hidden rounded-xl bg-blue-50 pt-20 dark:bg-black">
      <div className="flex flex-col items-center md:flex-row">
        <div className="flex w-full justify-center p-6 md:w-1/2 md:p-12">
          <div className="relative h-[300px] w-full max-w-md md:h-[400px]">
            <img
              src="/product-scanning 1.png"
              alt="History reports illustration"
              className="object-contain"
            />
          </div>
        </div>
        <div className="w-full p-6 md:w-1/2 md:p-12">
          <h2 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl dark:text-white">
            Scan, Analyse, Choose Better
          </h2>
          <p className="mb-6 text-lg text-gray-600 dark:text-gray-100">
            Upload product labels and get AI-powered insights in seconds.
          </p>
          <div className="flex flex-wrap gap-3">
            <Button
              onClick={handleClick}
              className="bg-blue-500 text-white cursor-pointer hover:bg-blue-600 dark:text-white"
            >
              Scan Now
            </Button>
            <Button
              variant="outline"
              className="flex items-center gap-2 border-gray-300 text-gray-800 dark:border-gray-700 dark:bg-slate-900 dark:text-gray-200"
            >
              See in action <ArrowUpRight size={16} />
            </Button>
            <Button variant="link" className="text-blue-600 dark:text-blue-400">
              Enter ingredient manually
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
