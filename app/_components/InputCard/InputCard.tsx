import { useAnimation } from "motion/react";
import { useRef } from "react";
import Folders from "../Icons/Folders";
import { InputHandleChange } from "./InputCard.type";

export default function InputCard({handleChange}: Record<string, InputHandleChange>){
    const controlsFolders = useAnimation();
    const inputFilesRef = useRef<HTMLInputElement>(null)
    const handleClick = () => {
        inputFilesRef.current?.click()
    }

    return (
        <div 
          className="z-40 backdrop-blur-xs lg:backdrop-blur-sm rounded-lg shadow-[0px_0px_24px_0px_rgba(0,0,0,0.4)] overflow-hidden border-cardStroke border-2 cursor-pointer" 
          onMouseEnter={() => controlsFolders.start("animate")} 
          onMouseLeave={() => controlsFolders.start("normal")}
          onClick={handleClick}
          onChange={handleChange}  
          >
          <div className="bg-black/50 gap-5 flex flex-col p-8 lg:pr-32 lg:pl-32">
            <Folders controls={controlsFolders}/>
            <div className="flex flex-col font-chivoMonoMedium text-white items-center">
              <input type="file" className="border-2 border-amber-50 hidden" accept="video/mp4, video/avi, video/webm" ref={inputFilesRef}/>
              <span className="text-[1.1rem]">Click to Upload</span>
              <span className="text-[1rem] opacity-30">MP4, AVI, WEBM</span>
            </div>
          </div>
        </div>
    )
}