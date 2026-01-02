'use client'
import Lottie from "lottie-react";
import Folders from "../_components/Icons/Folders";
import typeAnimation from "../_config/LottieAnimation";
import { motion, useAnimation } from "motion/react";
import { useEffect, useRef, useState } from "react";


export default function Home() {
  const controlsFolders = useAnimation();
  const lottieRef = useRef(null);
  const [lottieComplete, setLottieComplete ] = useState(false)
  const [file, setFile] = useState()

  const lottieVariants = {
    hidden: {
      transform: 'translateX(0px)'
    },
    visible: {
      transform: 'translateY(-6rem)',
      transition: {
        type: 'tween',
        duration: 0.3
      }
    }
  }

  const inputFileVariants = {
    hidden: {
      opacity: 0
    },
    visible: {
      opacity: 1,
      transition: {
        delay: 0.5
      }
    }
  }

  useEffect(()=>{
    if(lottieRef.current){
      lottieRef.current.setSpeed(2)
    }
  }, [])

  return (
    <div 
      className="w-screen h-screen bg-linear-to-bl from-[#03140B] to-[#151123] flex justify-center items-center flex-col relative"
      >
      <motion.div className="lg:w-3xl absolute flex justify-center" variants={lottieVariants} initial={"hidden"} animate={lottieComplete && "visible"}>
        <Lottie lottieRef={lottieRef} onComplete={()=> setLottieComplete(true)} animationData={typeAnimation} loop={false}/>
      </motion.div>
      <motion.div variants={inputFileVariants} initial={'hidden'} animate={lottieComplete && 'visible'}>
        <div className="z-40 backdrop-blur-xs lg:backdrop-blur-sm rounded-lg shadow-[0px_0px_24px_0px_rgba(0,0,0,0.4)] overflow-hidden border-cardStroke border-2 cursor-pointer" onMouseEnter={() => controlsFolders .start("animate")} onMouseLeave={() => controlsFolders .start("normal")}>
          <div className="bg-black/50 gap-5 flex flex-col p-8 lg:pr-32 lg:pl-32">
            <Folders controls={controlsFolders}/>
            <div className="flex flex-col font-chivoMonoMedium text-white items-center">
              <input type="file" className="border-2 border-amber-50 hidden"/>
              <span className="text-[1.1rem]">Click to Upload</span>
              <span className="text-[1rem] opacity-30">MP4, AVI, WEBM</span>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
