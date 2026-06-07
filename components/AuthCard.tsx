"use client";

import { motion } from "framer-motion";
import React from "react";

interface AuthCardProps {
  children: React.ReactNode;
  title: string;
  subtitle: string;
}

export const AuthCard = ({ children, title, subtitle }: AuthCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="w-full max-w-md bg-[#1A1D21]/80 backdrop-blur-md border border-[#363A3D] rounded-3xl p-8 md:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.4)] relative"
    >
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">{title}</h1>
        <p className="text-dark-600">{subtitle}</p>
      </div>

      {children}
    </motion.div>
  );
};
