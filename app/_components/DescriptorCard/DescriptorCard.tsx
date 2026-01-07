'use client'

import { useEffect, useState } from "react"
import { Descriptor } from "./DescriptorCard.types"
import { ChevronUp } from 'lucide-react';
import { motion, useAnimation } from "motion/react";
import { useMediaQuery } from "react-responsive";


export default function DescriptorCard({title, list}: Descriptor){
    const isTailwindLg = useMediaQuery({
        query: '(min-width: 64rem)'
    })
    const [ isOpen, setIsOpen ] = useState<boolean>(false)

    useEffect(()=>{
        if(isTailwindLg){
            setIsOpen(true)
        }
    }, [])



    return (
            <div className="border-cardStroke border-2 rounded-2xl relative overflow-hidden cursor-pointer" onClick={()=>setIsOpen(!isOpen)}>
                <div className="absolute bg-cardBackground opacity-50 inset-0 w-full "></div>
                <div className="relative z-10 p-5 flex-col gap-5 text-[0.9rem] font-chivoMonoMedium text-white">
                    <div className="flex flex-col gap-7">
                        <div className="flex justify-between">  
                            <span>{title}</span>
                            <motion.div animate={{rotate: isOpen ? 180 : 0}}>
                                < ChevronUp />
                            </motion.div>
                        </div>
                        <div className={`flex-col gap-3 text-[0.88rem] ${isOpen ? "flex" : "hidden"}`}>
                            {
                                Object.entries(list).map(([key, value], index)=>{
                                    return (
                                        <div key={index}>
                                            <span>→ {key}: </span>
                                            <span className="text-textGray">{value}</span>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>
            </div>
    )
}