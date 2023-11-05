"use client";

//next-image
import Image from "next/image";

//icons
import {
  MdOutlineHomeWork,
  MdOutlineBuildCircle,
  MdOutlineMapsHomeWork,
} from "react-icons/md";

import { BsFillPersonFill } from "react-icons/bs";

//react count up
import CountUp from "react-countup";

//react intersection observer
import { useInView } from "react-intersection-observer"; //tells us when an element enters/leaves viewport

//motion
import { motion } from "framer-motion";

//variants
import { fadeIn } from "../../../../variants";

export default function About() {
  const [ref, inView] = useInView({
    threshold: 0.5,
  });
  return (
    <section className="section flex items-center" id="about" ref={ref}>
      <div className="container mx-auto">
        <header className="flex flex-col xl:flex-row xl:justify-between gap-x-14 items-center">
          <motion.figure
            variants={fadeIn("up", 0.2)}
            initial="hidden"
            whileInView={"show"}
            viewport={{ once: false, amount: 0.6 }}
            className="flex-2 mb-8 xl:mb-0"
          >
            <Image
              className="rounded-[20px]"
              src={"/images/about/car.jpg"}
              width={1000}
              height={448}
              alt="Custom tuned performance car"
            />
          </motion.figure>
          <div className="flex-1 flex items-center xl:justify-center">
            <div className="xl:max-w-[600px] flex flex-col items-center">
              <motion.h2
                variants={fadeIn("up", 0.4)}
                initial="hidden"
                whileInView={"show"}
                viewport={{ once: false, amount: 0.6 }}
                className="h2"
              >
                Tuning Your Car Has Never Been Easier.
              </motion.h2>
              <motion.p
                variants={fadeIn("up", 0.6)}
                initial="hidden"
                whileInView={"show"}
                viewport={{ once: false, amount: 0.6 }}
                className="mb-[42px] max-w-md text-center"
              >
                Experience supreme performance with our expertly tuned vehicles.
                Customization, power, and style - your dream ride awaits!
              </motion.p>
              <motion.div
                variants={fadeIn("up", 0.8)}
                initial="hidden"
                whileInView={"show"}
                viewport={{ once: false, amount: 0.6 }}
                className="flex items-center gap-x-8 mb-12"
              >
                <div className="flex flex-col w-[100px] items-center">
                  <MdOutlineBuildCircle className="text-5xl text-accent-default mb-2" />
                  <div className="text-3xl font-black md-2">
                    {inView && (
                      <CountUp start={0} end={425} duration={3} delay={1} />
                    )}
                    +
                  </div>
                  <div className="uppercase text-[13px] font-semibold text-secondary text-center">
                    performance <br /> upgrades
                  </div>
                </div>

                <div className="flex flex-col w-[100px] items-center">
                  <MdOutlineMapsHomeWork className="text-5xl text-accent-default mb-2" />
                  <div className="text-3xl font-black md-2">
                    {inView && (
                      <CountUp start={0} end={20} duration={3} delay={1} />
                    )}
                    +
                  </div>
                  <div className="uppercase text-[13px] font-semibold text-secondary text-center">
                    car tuning <br /> shops
                  </div>
                </div>

                <div className="flex flex-col w-[100px] items-center">
                  <BsFillPersonFill className="text-5xl text-accent-default mb-2" />
                  <div className="text-3xl font-black md-2">
                    {inView && (
                      <CountUp start={0} end={800} duration={2} delay={1} />
                    )}
                    +
                  </div>
                  <div className="uppercase text-[13px] font-semibold text-secondary text-center">
                    happy <br /> customers
                  </div>
                </div>
              </motion.div>
              <motion.button
                variants={fadeIn("up", 1)}
                initial="hidden"
                whileInView={"show"}
                viewport={{ once: false, amount: 0.6 }}
                className="hidden xl:block bg-accent-default hover:bg-accent-hover rounded-[10px] w-full h-16 uppercase font-medium text-white tracking-[2px] text-[13px] max-w-[184px]"
              >
                See All Cars
              </motion.button>
            </div>
          </div>
        </header>
      </div>
    </section>
  );
}
