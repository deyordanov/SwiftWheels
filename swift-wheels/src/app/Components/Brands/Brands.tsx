"use client";

//next-image
import Image from "next/image";

//motion
import { motion } from "framer-motion";

//variants
import { fadeIn } from "../../../../variants";

export default function Brands() {
  return (
    <section className="xl:pt-16 xl:h-[200px] bg-white flex flex-col justify-center">
      <motion.div
        variants={fadeIn("up", 0.4)}
        initial={"hidden"}
        whileInView={"show"}
        viewport={{ once: false, amount: 0.6 }}
        className="container mx-auto"
      >
        <div className="grid grid-cols-3 gap-6 place-items-center xl:flex xl:flex-wrap xl:gap-x-6 xl:justify-between">
          <span>
            <Image
              src={"icons/brands/audi.svg"}
              width={85}
              height={32}
              alt="audi logo"
            />
          </span>
          <span>
            <Image
              src={"icons/brands/bmw.svg"}
              width={85}
              height={32}
              alt="bmw logo"
            />
          </span>
          <span>
            <Image
              src={"icons/brands/lambo.svg"}
              width={85}
              height={32}
              alt="lambo logo"
            />
          </span>
          <span>
            <Image
              src={"icons/brands/mazda.svg"}
              width={85}
              height={32}
              alt="mazda logo"
            />
          </span>
          <span>
            <Image
              src={"icons/brands/mercedes.svg"}
              width={85}
              height={32}
              alt="mercedes logo"
            />
          </span>
          <span>
            <Image
              src={"icons/brands/porsche.svg"}
              width={85}
              height={32}
              alt="porsche logo"
            />
          </span>
          <span>
            <Image
              src={"icons/brands/toyota.svg"}
              width={85}
              height={32}
              alt="toyota logo"
            />
          </span>
        </div>
      </motion.div>
    </section>
  );
}
