'use client'
import { useState } from "react"
import sliderConfig from "@/app/_config/ConfigurationCard/sliderConfig"

export default function Editor(){
    const [slider, setSlider] = useState(Array(sliderConfig.length).fill(0))
    const [ inputBox, setInputBox ] = useState({
        height: 0,
        width: 0
    })
    return (
        <div className="bg-linear-to-bl from-[#03140B] to-[#151123] min-h-screen">
            <div>editor</div>
        </div>
    )
}