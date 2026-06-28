"use client";

import { LazyMotion, domAnimation, m } from "framer-motion";

export default function Reveal({ children }: { children: React.ReactNode }) {
  return (
    <LazyMotion features={domAnimation}>
      <m.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        {children}
      </m.div>
    </LazyMotion>
  );
}