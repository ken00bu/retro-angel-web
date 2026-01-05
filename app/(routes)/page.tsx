'use client'
import Lottie from "lottie-react";
import typeAnimation from "../_config/LottieAnimation";
import InputCard from "../_components/InputCard";
import { motion, useAnimation } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { LottieRefCurrentProps } from "lottie-react";
import { useRouter } from "next/navigation";
import { InputHandleChange } from "../_components/InputCard/InputCard.type";

export default function Home() {
  const [lottieComplete, setLottieComplete ] = useState(false)
  const [ inputAlert, setInputAlert ] = useState<boolean>(false)
  
  const lottieRef = useRef<LottieRefCurrentProps>(null);
  const router = useRouter()
  let inputFile
  let fileURL
  let fileFormat

  const lottieVariants = {
    hidden: {
      transform: 'translateX(0px)'
    },
    visible: {
      transform: 'translateY(-6rem)',
      transition: {
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


  const handleChange: InputHandleChange = (e: any) => {
    if (e.target.files.length > 1){
      setInputAlert(true)
      return 
    }

    inputFile = e.target.files?.[0]
    fileFormat = inputFile.type.split("/")[1]
    fileURL = URL.createObjectURL(inputFile)
    console.log(fileURL)
    const params = new URLSearchParams({
      file: fileURL.split("/").pop() ?? "",
      format: fileFormat
    })
    
    router.push('/editor?' + params)
    return
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
        <div className={`absolute text-white font-chivoMonoMedium top-0 left-0 bg-black/30 backdrop-blur-2xl w-full h-16 flex justify-center items-center ${inputAlert ? '' : 'hidden'}`}>You can only upload one video</div>
      <motion.div className="lg:w-3xl absolute flex justify-center" variants={lottieVariants} initial={"hidden"} animate={lottieComplete && "visible"}>
        <Lottie lottieRef={lottieRef} onComplete={()=> setLottieComplete(true)} animationData={typeAnimation} loop={false}/>
      </motion.div>
      <motion.div variants={inputFileVariants} initial={'hidden'} animate={lottieComplete && 'visible'}>
        <InputCard handleChange={handleChange}/>
      </motion.div>
    </div>
  );
}
