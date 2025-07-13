
import { ArrowRight, Mail, Phone, MapPin, Instagram, Facebook, Linkedin, Twitter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link  from "next/link";

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-white">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-4">
          {/* Newsletter section */}
          <div className="md:col-span-1">
            <h2 className="mb-6 text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              Stay Updated
            </h2>
            <p className="mb-6 text-gray-300">
              Get the latest updates and exclusive content delivered to your inbox.
            </p>
            
            <form className="relative mb-6">
              <Input
                type="email"
                placeholder="Enter your email"
                className="w-full rounded-full border-gray-600 bg-slate-800 pr-12 text-white placeholder:text-gray-400 focus:border-blue-500 focus:ring-blue-500"
              />
              <Button 
                type="submit"
                size="sm"
                className="absolute right-1 top-1/2 -translate-y-1/2 rounded-full bg-blue-600 hover:bg-blue-700"
              >
                <ArrowRight size={16} />
              </Button>
            </form>

            <div className="flex gap-3">
              {[
                { icon: Instagram, href: "https://www.instagram.com/", label: "Instagram" },
                { icon: Facebook, href: "https://www.facebook.com/", label: "Facebook" },
                { icon: Linkedin, href: "https://www.linkedin.com/", label: "LinkedIn" },
                { icon: Twitter, href: "https://x.com/", label: "Twitter" }
              ].map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  className="group rounded-full bg-slate-800 p-3 transition-all duration-300 hover:bg-blue-600 hover:scale-110"
                  aria-label={label}
                >
                  <Icon size={20} className="group-hover:text-white" />
                </a>
              ))}
            </div>
          </div>

          {/* Company column */}
          <div className="md:col-span-1">
            <h3 className="mb-6 text-xl font-semibold">Company</h3>
            <ul className="space-y-3">
              {[
                { name: "About Us", path: "/about-us" },
                { name: "Contact Us", path: "/contact-us" },
                { name: "Careers", path: "#" },
                { name: "Blog", path: "#" },
                { name: "News", path: "#" },
                { name: "Press Kit", path: "#" }
              ].map((item) => (
                <li key={item.name}>
                  {item.path.startsWith('#') ? (
                    <a
                      href={item.path}
                      className="text-gray-300 transition-colors duration-300 hover:text-white hover:underline"
                    >
                      {item.name}
                    </a>
                  ) : (
                    <Link
                      href={item.path}
                      className="text-gray-300 transition-colors duration-300 hover:text-white hover:underline"
                    >
                      {item.name}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Services column */}
          <div className="md:col-span-1">
            <h3 className="mb-6 text-xl font-semibold">Services</h3>
            <ul className="space-y-3">
              {[
                "Web Development",
                "Mobile Apps",
                "Cloud Solutions",
                "Digital Marketing",
                "Consulting",
                "Support"
              ].map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="text-gray-300 transition-colors duration-300 hover:text-white hover:underline"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info column */}
          <div className="md:col-span-1">
            <h3 className="mb-6 text-xl font-semibold">Get In Touch</h3>
            <ul className="space-y-4">
              <li className="flex items-center gap-3">
                <Mail size={18} className="text-blue-400" />
                <a 
                  href="mailto:hello@company.com"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  hi@lumovateintelligence.com
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={18} className="text-blue-400" />
                <a 
                  href="tel:+1234567890"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin size={18} className="text-blue-400 mt-1" />
                <span className="text-gray-300">
                  Sikar, Rajasthan-332406
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 border-t border-gray-700 pt-8">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <p className="text-sm text-gray-400">
              © 2024 teklume. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm">
              <a href="/privicy-policy" className="text-gray-400 hover:text-white transition-colors">
                Privacy Policy
              </a>
              <a href="/term-conditions" className="text-gray-400 hover:text-white transition-colors">
                Terms of Service
              </a>
              <a href="/shipping-delivery" className="text-gray-400 hover:text-white transition-colors">
                Shipping & Delivery
              </a>
              <a href="/term-conditions" className="text-gray-400 hover:text-white transition-colors">
                Terms & Conditions
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
