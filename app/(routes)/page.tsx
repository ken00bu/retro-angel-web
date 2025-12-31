'use client'
import Lottie from "lottie-react";
import Folders from "../_components/Icons/Folders";
import typeAnimation from "../_config/LottieAnimation";
import { motion, useAnimation } from "motion/react";

export default function Home() {
  const controlsFolders = useAnimation();

  return (
    <div className="w-screen h-screen bg-linear-to-bl from-[#03140B] to-[#151123] flex justify-center items-center flex-col relative">
      <div className="z-40 backdrop-blur-sm rounded-lg shadow-[0px_0px_24px_0px_rgba(0,0,0,0.4)] overflow-hidden border-cardStroke border-2 cursor-pointer" onMouseEnter={() => controlsFolders .start("animate")} onMouseLeave={() => controlsFolders .start("normal")}>
        <div className="bg-black/50 p-8 lg:pr-32 lg:pl-32">
          <Folders controls={controlsFolders}/>
          <div className="flex flex-col font-chivoMonoMedium text-white items-center">
            <span className="text-[1.1rem]">Click to Upload</span>
            <span className="text-[1rem] opacity-30">MP4, AVI, WEBM</span>
          </div>
        </div>
      </div>
      <motion.div className="lg:w-3xl -translate-y-24 absolute flex justify-center" animate={{}}>
        <Lottie animationData={typeAnimation} loop={false}/>
      </motion.div>
    </div>
  );
}
