"use client";
import { motion } from "framer-motion";

const variants = {
    hidden: {
        opacity: 0,
        scale: 0.8,
        x: -50,
        transition: { duration: 5, ease: "easeInOut" },
    },
    enter: {
        opacity: 1,
        rotate: 0,
        scale: 1,
        x: 0,
        transition: {
            duration: 1.2,
            delay: 0.2,
            ease: "bounceOut",
            stiffness: 200, // Spring stiffness
            type: "spring", // Spring animation type
            damping: 10, // Spring damping
            mass: 0.8, // Spring mass
        },
    },
};

export default function Template({ children }: { children: React.ReactNode }) {
    return (
        <motion.main
            variants={variants}
            initial="hidden"
            animate="enter"
            transition={{ type: "linear" }}
        >
            {children}
        </motion.main>
    );
}
