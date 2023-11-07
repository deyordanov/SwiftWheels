"use client";

//next-image
import Image from "next/image";

//motion
import { motion } from "framer-motion";

//variants
import { fadeIn } from "../../../../variants";

//icons
import { MdHandshake, MdKey, MdTrendingUp } from "react-icons/md";

export default function Why() {
  return (
    <section className="section flex items-center" id="why">
      <div className="container mx-auto">
        <motion.h2
          variants={fadeIn("up", 0.2)}
          initial="hidden"
          whileInView={"show"}
          viewport={{ once: false, amount: 0.6 }}
          className="h2 text-center"
        >
          Unparalleled Expertise in Car Tuning
        </motion.h2>
        <motion.p
          variants={fadeIn("up", 0.4)}
          initial="hidden"
          whileInView={"show"}
          viewport={{ once: false, amount: 0.6 }}
          className="max-w-[680px] text-center mx-auto mb-2"
        >
          At Swift Wheels, we don`t just sell cars - we deliver dreams on four
          wheels. Our team of certified technicians is driven by a single
          passion: transforming standard vehicles into extraordinary machines.
          With decades of combined experience and a relentless pursuit of
          perfection, we`ve honed our skills to ensure every car that leaves our
          garage is a masterpiece of performance and style.
        </motion.p>
        <motion.div
          variants={fadeIn("up", 0.6)}
          initial="hidden"
          whileInView={"show"}
          viewport={{ once: false, amount: 0.6 }}
          className="hidden md:flex justify-center mb-6 xl:mb-2"
        >
          <Image
            src={"/images/why/urus.png"}
            width={1060}
            height={420}
            alt=""
          />
        </motion.div>

        <motion.div
          variants={fadeIn("up", 0.8)}
          initial="hidden"
          whileInView={"show"}
          viewport={{ once: false, amount: 0.4 }}
          className="flex flex-wrap justify-center xl:grid xl:grid-cols-3 gap-16 xl:gap-y-0 xl:gap-x-[30px]"
        >
          <div className="flex flex-col items-center text-center max-w-[160px] xl:max-w-none p-2 xl:p-0">
            <MdKey className="text-[50px] text-accent-default mb-4" />
            <h3 className="h3">Expertly Curated Selection</h3>
            <p className="hidden xl:flex">
              Our website offers a handpicked selection of high-performance
              tuned cars, each thoroughly vetted by automotive experts for
              optimal performance, reliability, and safety. Customers can trust
              in the quality of our inventory, knowing that they`re choosing
              from the best-tuned vehicles available on the market.
            </p>
          </div>
          <div className="flex flex-col items-center text-center max-w-[160px] xl:max-w-none p-2 xl:p-0">
            <MdTrendingUp className="text-[50px] text-accent-default mb-4" />
            <h3 className="h3">Tailored Customer Experience</h3>
            <p className="hidden xl:flex">
              We provide a personalized shopping experience that caters to the
              unique preferences and needs of car enthusiasts. Our intuitive
              website design and dedicated customer service team ensure a
              seamless journey from browsing to buying, making it easier for
              customers to find and purchase their dream tuned car without
              hassle.
            </p>
          </div>
          <div className="flex flex-col items-center text-center max-w-[160px] xl:max-w-none p-2 xl:p-0">
            <MdHandshake className="text-[50px] text-accent-default mb-4" />
            <h3 className="h3">After-Sale Support and Community</h3>
            <p className="hidden xl:flex">
              The purchase of a tuned car from our website is just the
              beginning. We offer comprehensive after-sale support, including
              maintenance tips, tuning advice, and access to an exclusive
              community of fellow tuned car owners. This ongoing commitment to
              our customers ensures they enjoy not just a product, but a
              full-service experience that extends well beyond the initial sale.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
