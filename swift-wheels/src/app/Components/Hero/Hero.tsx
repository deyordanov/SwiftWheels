"use client";

//Components
import Search from "../Search/Search";

//Contexts
import { useSearchContext } from "@/app/Contexts/searchContext";

//next-image
import Image from "next/image";

//motion
import { motion, easeInOut } from "framer-motion";

//varaints
import { fadeIn } from "../../../../variants";

export default function Hero() {
  const { searchActive } = useSearchContext();
  return (
    <section className="h-screen xl:h-[90vh] bg-[#b2b7c2]/10" id="home">
      {/* <div className="container mx-auto h-full xl:pt-10"> */}
      <div className="container mx-auto h-full xl:pt-10">
        <div className="flex flex-col xl:flex-row justify-center items-center xl:justify-start h-full">
          {/* Feel the Power, Feel the Prestige! */}
          <div className="text-center xl:max-w-xl xl:text-left mt-16 xl:mt-0">
            <motion.h1
              variants={fadeIn("down", 0.2)} //fade in down with a delay of 0.2 sec
              initial={"hidden"} //use the 'hidden' state in the start ('hidden' from the fadeIn variant)
              whileInView={"show"} //use the 'show' state when the element comes into view ('show' from the fadeIn variant)
              viewport={{ once: false, amount: 0.6 }} //once: false -> the animation will run each time the element enters the viewport; amout:0.6 -> the animation should start when 60% of the element is visible
              className="h1"
            >
              Embrace the <span className=" text-accent-default">Power</span>,
              Feel the <span className="text-accent-default">Prestige</span>!
            </motion.h1>
            <motion.p
              variants={fadeIn("down", 0.4)}
              initial={"hidden"}
              whileInView={"show"}
              viewport={{ once: false, amount: 0.6 }}
              className="description max-w-[550px] mx-auto xl:mx-0 mb-6 xl:mb-10"
            >
              Unleash the road`s thrill! We offer exclusive, high-performance
              tuned cars that define your drive and desire.
            </motion.p>
            <motion.div
              variants={fadeIn("down", 0.6)}
              initial={"hidden"}
              whileInView={"show"}
              viewport={{ once: false, amount: 0.8 }}
              className="flex gap-x-3 justify-center xl:justify-start"
            >
              <button className="btn-cta">
                <a
                  href="https://play.google.com"
                  target="_blank" //Opens link in a new tab
                  rel="noopener noreferrer" //Will not pass the referrer (URL of the current page) to the new page (prevent attacks)
                >
                  <Image
                    src="/icons/buttons/google-play.svg"
                    width={132}
                    height={36}
                    alt="google-play button"
                  />
                </a>
              </button>
              <button className="btn-cta">
                <a
                  href="https://apps.apple.com"
                  target="_blank" //Opens link in a new tab
                  rel="noopener noreferrer" //Will not pass the referrer (URL of the current page) to the new page (prevent attacks)
                >
                  <Image
                    src="/icons/buttons/app-store.svg"
                    width={132}
                    height={36}
                    alt="google-play button"
                  />
                </a>
              </button>
            </motion.div>
          </div>
          <motion.div
            variants={fadeIn("up", 0.6)}
            initial={"hidden"}
            whileInView={"show"}
            viewport={{ once: false, amount: 0.6 }}
            className="relative w-full h-full max-h-[50vh] md:max-w-[70vw] xl:max-w-[860px] xl:max-h-[542px] xl:absolute xl:-right-[100px] min-[1680px]:right-[120px] xl:top-48"
          >
            <Image
              src={"/images/hero/E63.png"}
              width={750}
              height={750}
              alt="E 63 AMG"
              style={{ objectFit: "contain" }}
              priority
            />
          </motion.div>
        </div>
      </div>
      {searchActive ? (
        <motion.div
          initial={{ y: "-100%" }}
          animate={{ y: 0 }}
          transition={{ ease: easeInOut }}
          className={"fixed top-[110px] z-10 w-full max-w-[1920px]"}
        >
          <Search />
        </motion.div>
      ) : (
        <div className={"-mt-12 w-full max-w-[1300px] mx-auto"}>
          <motion.div
            variants={fadeIn("up", 1)}
            initial={"hidden"}
            whileInView={"show"}
            viewport={{ once: false, amount: 0.2 }}
          >
            <Search />
          </motion.div>
        </div>
      )}
    </section>
  );
}
