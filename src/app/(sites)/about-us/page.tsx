"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
// import Navbar from "../components/navbar"
import { motion } from "framer-motion";
import { useEffect } from "react";

export default function AboutUsPage() {
  // Add a check for reduced motion preference
  useEffect(() => {
    // This will be used by framer-motion automatically
    const _prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }, []);

  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  const staggerChildren = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const scaleUp = {
    hidden: { scale: 0.95, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: { duration: 0.5 },
    },
  };

  return (
    <div className="bg-blue-50 dark:bg-black">
      {/* <Navbar /> */}
      {/* <nav className="fixed top-0 w-full z-50 bg-white dark:bg-black shadow-md">
            <Header/>
         </nav> */}
      <div className="mx-auto max-w-6xl px-4">
        {/* About Us Header */}
        <motion.section
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          className="mb-16 pt-25 text-center"
        >
          <h1 className="text-foreground mb-4 text-3xl font-bold">About us</h1>
          <p className="text-muted-foreground mx-auto max-w-3xl">
            As a Web Development Service, we are Committed to Building Custom Web Solutions that
            Drive Business Success.
          </p>
        </motion.section>

        {/* Main About Section */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ amount: 0.3 }}
          variants={staggerChildren}
          className="mb-20 grid items-center gap-8 md:grid-cols-2"
        >
          <motion.div variants={scaleUp}>
            <Image
              src="/collabation.jpg?height=400&width=600"
              width={600}
              height={400}
              alt="Our team collaborating on web projects"
              className="rounded-lg object-cover"
            />
          </motion.div>
          <motion.div variants={fadeIn} className="space-y-4">
            <p className="text-muted-foreground">
              As your web development service agency, we specialize in creating custom websites and
              web applications that address your unique business needs, organizational and marketing
              challenges, and digital strategies. Our experienced team is dedicated to delivering
              high-quality, user-friendly solutions that meet our clients' precise needs and deliver
              results.
            </p>
            <p className="text-muted-foreground">
              Our mission is to provide our clients with the tools they need to succeed in today's
              digital landscape. We stay at the forefront of web development, utilizing cutting-edge
              technologies and trends to ensure that we are always delivering the highest quality
              work. We believe that every business deserves a website that not only looks great but
              also functions flawlessly and delivers your message to your target audience.
            </p>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button variant="outline" className="mt-4">
                Get in touch
              </Button>
            </motion.div>
          </motion.div>
        </motion.section>

        {/* Why Choose Us Section */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ amount: 0.2 }}
          variants={fadeIn}
          className="mb-20"
        >
          <h2 className="text-foreground mb-4 text-center text-3xl font-bold">Why choose us</h2>
          <p className="text-muted-foreground mb-12 text-center">
            Thank you for considering our web development services. We bring experience, skills, and
            dedication, and we don't just make-do the ideal choice for your project.
          </p>

          <motion.div variants={staggerChildren} className="grid gap-6 md:grid-cols-2">
            {/* Expertise */}
            <motion.div
              variants={scaleUp}
              whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
              className="dark:bg-card rounded-lg border bg-gray-200 p-6 transition-shadow"
            >
              <div className="bg-primary/10 mb-4 flex h-10 w-10 items-center justify-center rounded-full">
                <motion.span
                  animate={{ rotate: [0, 10, 0] }}
                  transition={{ repeat: Number.POSITIVE_INFINITY, duration: 2, ease: "easeInOut" }}
                  className="text-primary text-xl"
                >
                  ✦
                </motion.span>
              </div>
              <h3 className="text-card-foreground mb-2 text-xl font-semibold">Expertise</h3>
              <p className="text-muted-foreground">
                We have extensive experience in designing and developing websites for businesses
                across various industries.
              </p>
            </motion.div>

            {/* Attention to Detail */}
            <motion.div
              variants={scaleUp}
              whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
              className="dark:bg-card rounded-lg border bg-gray-200 p-6 transition-shadow"
            >
              <div className="bg-primary/10 mb-4 flex h-10 w-10 items-center justify-center rounded-full">
                <motion.span
                  animate={{ rotate: [0, 360] }}
                  transition={{ repeat: Number.POSITIVE_INFINITY, duration: 8, ease: "linear" }}
                  className="text-primary text-xl"
                >
                  ⚙
                </motion.span>
              </div>
              <h3 className="text-card-foreground mb-2 text-xl font-semibold">
                Attention to Detail
              </h3>
              <p className="text-muted-foreground">
                No detail is too small, and I pay close attention to every detail to ensure that the
                end product is of highest quality.
              </p>
            </motion.div>

            {/* Communication */}
            <motion.div
              variants={scaleUp}
              whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
              className="dark:bg-card rounded-lg border bg-gray-200 p-6 transition-shadow"
            >
              <div className="bg-primary/10 mb-4 flex h-10 w-10 items-center justify-center rounded-full">
                <motion.span
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ repeat: Number.POSITIVE_INFINITY, duration: 2, ease: "easeInOut" }}
                  className="text-primary text-xl"
                >
                  💬
                </motion.span>
              </div>
              <h3 className="text-card-foreground mb-2 text-xl font-semibold">Communication</h3>
              <p className="text-muted-foreground">
                We believe that clear and consistent communication is crucial for the success of any
                project.
              </p>
            </motion.div>

            {/* Customer Service */}
            <motion.div
              variants={scaleUp}
              whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
              className="dark:bg-card rounded-lg border bg-gray-200 p-6 transition-shadow"
            >
              <div className="bg-primary/10 mb-4 flex h-10 w-10 items-center justify-center rounded-full">
                <motion.span
                  animate={{ y: [0, -3, 0] }}
                  transition={{ repeat: Number.POSITIVE_INFINITY, duration: 2, ease: "easeInOut" }}
                  className="text-primary text-xl"
                >
                  👥
                </motion.span>
              </div>
              <h3 className="text-card-foreground mb-2 text-xl font-semibold">Customer Service</h3>
              <p className="text-muted-foreground">
                As a web developer/team, We understand the importance of building long-term
                relationships with our clients.
              </p>
            </motion.div>
          </motion.div>
        </motion.section>

        {/* Process Section */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ amount: 0.2 }}
          variants={fadeIn}
          className="mb-20"
        >
          <h2 className="text-foreground mb-12 text-center text-3xl font-bold">Process</h2>

          {/* Main Flex Container */}
          <div className="grid gap-12 md:grid-cols-2">
            {/* Left Side: Image and Intro */}
            <motion.div variants={fadeIn} className="space-y-3">
              <p className="text-muted-foreground text-justify">
                As a web developer, I follow a comprenshive and structured working process to ensure
                that every project is delievered on time, within budget and meets that specific need
                of my clients. Here is overview of my working progress.
              </p>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button variant="outline">See recent work</Button>
              </motion.div>
              <div></div>
              <motion.div whileHover={{ scale: 1.02 }} transition={{ duration: 0.3 }}>
                <Image
                  src="/pexels-fauxels-3183150.jpg"
                  width={600}
                  height={600}
                  alt="Development process gears"
                  className="rounded-lg object-cover"
                />
              </motion.div>
            </motion.div>

            {/* Right Side: Bullet Points */}
            <motion.div variants={staggerChildren} className="space-y-8 text-sm">
              {[
                {
                  step: "1",
                  title: "Discovery",
                  desc: "I take the time to understand your business, goals, and requirements to define the project scope.",
                },
                {
                  step: "2",
                  title: "Planning",
                  desc: "A detailed roadmap is created, outlining project structure, features, and functionality.",
                },
                {
                  step: "3",
                  title: "Design",
                  desc: "User-friendly prototypes and visually appealing designs are created, aligning with your brand identity.",
                },
                {
                  step: "4",
                  title: "Development",
                  desc: "Using the latest technologies, I build a responsive and optimized web application.",
                },
                {
                  step: "5",
                  title: "Testing",
                  desc: "The project is rigorously tested across different devices and browsers to ensure smooth functionality.",
                },
                {
                  step: "6",
                  title: "Launch",
                  desc: "The final product is deployed, ensuring a fully operational and optimized website.",
                },
              ].map(({ step, title, desc }) => (
                <motion.div
                  key={step}
                  variants={fadeIn}
                  whileHover={{ x: 5 }}
                  className="flex items-start gap-4"
                >
                  <motion.div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-300 dark:bg-white">
                    <span className="text-black">{step}</span>
                  </motion.div>
                  <div>
                    <h3 className="text-foreground mb-2 text-xl font-semibold">{title}</h3>
                    <p className="text-muted-foreground">{desc}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.section>

        {/* Contact Section */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ amount: 0.2 }}
          variants={fadeIn}
          className="mb-16 text-center"
        >
          <h2 className="text-foreground mb-4 text-3xl font-bold">That's all about me</h2>
          <h3 className="text-foreground mb-6 text-2xl">feel free to say Hi!</h3>
          <p className="text-muted-foreground mx-auto mb-6 max-w-3xl">
            We are excited about the opportunity to learn more about your business and how we can
            help you achieve your goals in the digital world.
          </p>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button variant="outline">
              <Link href="/contact-us">Get in touch</Link>
            </Button>
          </motion.div>
        </motion.section>
      </div>
    </div>
  );
}
