"use client";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import CTA from "./components/CTA";
import Testimonials from "./components/Testimonials";
import About from "./components/About";
import React from "react";

export default function Home() {
  return (
    <>
      <Header />
      <CTA />
      <Testimonials />
      <About />
      <Footer />
    </>
  );
}
