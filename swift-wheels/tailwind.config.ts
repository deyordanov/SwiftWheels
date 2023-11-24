import type { Config } from "tailwindcss";

import { withUt } from "uploadthing/tw";

const withMT = require("@material-tailwind/react/utils/withMT");

const config: Config = withUt(
    withMT({
        content: [
            "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
            "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
            "./src/app/**/*.*",
            "./src/**/*.{ts,tsx,mdx}",
            "./node_modules/flowbite/**/*.js",
        ],
        theme: {
            container: {
                padding: {
                    DEFAULT: "15px",
                },
            },
            screens: {
                sm: "640px",
                md: "768px",
                lg: "1024px",
                xl: "1300px",
            },
            extend: {
                colors: {
                    primary: "#101828",
                    secondary: "#667085",
                    accent: {
                        default: "#ed1d24",
                        hover: "#dd242a",
                    },
                    body: "dedede",
                },
                backgroundImage: {
                    "gradient-radial":
                        "radial-gradient(var(--tw-gradient-stops))",
                    "gradient-conic":
                        "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
                },
            },
        },
        plugins: [],
    })
);
export default config;
