"use client";

//react-motion
import { motion } from "framer-motion";

//types
import React from "react";

const variants = {
    hidden: {
        opacity: 0,
        x: "-100vw", // Start off-screen to the left
        transition: { duration: 0.5, ease: "easeInOut" },
    },
    enter: {
        opacity: 1,
        x: 0, // Enter to original position
        transition: { duration: 0.5, ease: "easeInOut" },
    },
    exit: {
        opacity: 0,
        x: "100vw", // Exit off-screen to the right
        transition: { duration: 0.5, ease: "easeInOut" },
    },
};

export default function Template({ children }: { children: React.ReactNode }) {
    return (
        <motion.main
            variants={variants}
            initial="hidden"
            animate="enter"
            exit="exit"
            className=""
        >
            {children}
        </motion.main>
    );
}
