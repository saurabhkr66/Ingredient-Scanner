"use client";

import Image from "next/image";
import { Mail, Phone, MapPin } from "lucide-react";

export default function ContactPage() {
  return (
    <div className="bg-gray-100 text-gray-900 dark:bg-black dark:text-gray-100">
      {/* Fixed Navbar */}

      {/* Main Content with padding to avoid overlap */}
      <div className="flex min-h-screen flex-col items-center p-6 pt-20">
        {" "}
        {/* Adjust pt-20 based on navbar height */}
        {/* Header Section */}
        <div className="w-full max-w-6xl rounded-lg bg-blue-500 p-8 text-center text-white shadow-lg dark:bg-blue-700">
          <button className="mb-4 rounded-full bg-white px-6 py-2 font-medium text-blue-500 dark:bg-gray-800 dark:text-white">
            WRITE TO US
          </button>
          <h1 className="text-4xl font-semibold">Get In Touch</h1>
        </div>
        {/* Main Content */}
        <div className="mt-8 grid w-full max-w-6xl gap-8 md:grid-cols-2">
          {/* Form Section */}
          <div className="rounded-lg bg-white p-8 shadow-lg dark:bg-gray-800">
            <h2 className="mb-2 text-2xl font-semibold">Let’s Talk!</h2>
            <p className="mb-6 text-gray-600 dark:text-gray-300">
              Get in touch with us using the enquiry form or contact details below.
            </p>

            <form className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">First Name</label>
                  <input
                    type="text"
                    placeholder="Shasanko"
                    className="mt-1 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 dark:border-gray-600"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Last Name</label>
                  <input
                    type="text"
                    placeholder="Das"
                    className="mt-1 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 dark:border-gray-600"
                  />
                </div>
              </div>

              <div>
                <label className="text-sm font-medium">Email</label>
                <input
                  type="email"
                  placeholder="yourname@example.com"
                  className="mt-1 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 dark:border-gray-600"
                />
              </div>

              <div>
                <label className="text-sm font-medium">Message</label>
                <textarea
                  placeholder="Type something..."
                  rows={4}
                  className="mt-1 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 dark:border-gray-600"
                ></textarea>
              </div>

              {/* Checkboxes */}
              <div className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                <label className="flex items-center">
                  <input type="checkbox" className="mr-2" />I agree to receive other communication
                  messages.
                </label>
                <label className="flex items-center">
                  <input type="checkbox" className="mr-2" />I give my consent to store my data.
                </label>
              </div>

              <button
                type="submit"
                className="w-full rounded-md bg-blue-500 py-3 text-white hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700"
              >
                Submit
              </button>
            </form>
            <div className="py-12 text-gray-600 dark:text-gray-300">
              <p>
                ROI7 Presenter, a project of ROIFORCIO GmbH, is committed to protecting and
                respecting your privacy according to our Privacy Policy. From time to time we would
                like to contact you about our products and services that may be of your interest.
              </p>
            </div>
          </div>

          {/* Contact Info & Image */}
          <div className="space-y-3">
            <Image
              src="/customer.png"
              alt="Person looking at phone"
              width={200}
              height={200}
              className="h-auto w-full rounded-lg border-4 border-gray-300 dark:border-gray-600"
            />
            <div className="space-y-6 rounded-lg bg-white p-6 shadow-lg dark:bg-gray-800">
              <div className="flex items-center space-x-4">
                <Mail className="h-6 w-6 text-blue-500 dark:text-blue-400" />
                <div>
                  <h3 className="text-lg font-semibold">Quick Contact</h3>
                  <p className="text-gray-600 dark:text-gray-300">hi@lumovateintelligence.com</p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <Phone className="h-6 w-6 text-blue-500 dark:text-blue-400" />
                <div>
                  <h3 className="text-lg font-semibold">Phone Number</h3>
                  <p className="text-gray-600 dark:text-gray-300">phone number</p>
                  <p className="text-gray-600 dark:text-gray-300">phone number</p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <MapPin className="h-6 w-6 text-blue-500 dark:text-blue-400" />
                <div>
                  <h3 className="text-lg font-semibold">Headquarters</h3>
                  <p className="text-gray-600 dark:text-gray-300">Sikar, Rajasthan-332406</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
