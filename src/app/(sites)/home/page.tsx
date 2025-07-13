"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import ProductScannerLanding from "./productscannerlanding";
import IngredientScanner from "./ingredientscanner";
import Revolitizing from "./revolitizing";
import ScanUpload from "./upload";
import Customer from "./customer";
import SPotlight from "./spoltlight";

function AnimatedSection({
  children,
  delay = 0,
}: {
  children: React.ReactNode;
  delay?: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.3 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      animate={
        isInView
          ? {
              opacity: 1,
              y: 0,
              transition: { duration: 0.6, ease: "easeOut", delay },
            }
          : {}
      }
      className="w-full"
    >
      {children}
    </motion.div>
  );
}

function Homepage() {
  return (
    <div className="no-scrollbar overflow-hidden">
      {[
        <ProductScannerLanding key="product-scanner-landing" />,
        <IngredientScanner key="ingredient-scanner" />,
        <Revolitizing key="revolitizing" />,
        <SPotlight key="spotlight" />,
        <Customer key="customer" />,
        <ScanUpload key="scan-upload" />,
      ].map((Component, index) => (
        <AnimatedSection key={index} delay={index * 0.2}>
          {Component}
        </AnimatedSection>
      ))}
    </div>
  );
}

export default Homepage;
