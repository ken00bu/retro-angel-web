'use client'
import Slider from "./Slider"
import InputBox from "./InputBox"
import { useEffect } from "react"

export default function ConfigurationCard({slider, setSlider, scale, setScale, sliderConfig}: any){
    

    const handleSlider = ({newValue, index}: Record<string, number>) =>{
        setSlider((prev: number[]) => {
            const copy = [...prev]
            copy[index] = newValue
            return copy
        })
    }

    // index = width or Heigth
    const handleInputBox = ({newValue, index }: any) => {
        const max = 4000

        console.log('check input box')
        // if newValue larger than max, then set newValue into max
        if (newValue > max){
            console.log('input box lebih besar dari max!')
            setScale((prev: Record<string, number>) =>({
                ...prev,
                [index]: max
            }))

            return
        }

        setScale((prev: number[]) => ({
            ...prev,
            [index]: newValue
        }))
    }

    return (
        <div className="border-cardStroke border-2 rounded-2xl relative overflow-hidden shadow-[0px_0px_24px_0px_rgba(0,0,0,0.4)] pb-5">
            <div className="absolute bg-cardBackground opacity-50 inset-0 w-full"></div>
            <div className="relative z-10 p-5 flex-col flex gap-10 text-[0.9rem] font-chivoMonoMedium text-white">
                <div className="flex flex-col gap-3">
                    <span>SCALE</span>
                    <div className="flex items-center gap-3 font-chivoMonoMedium">
                        <InputBox value={scale.height} onChange={handleInputBox} index={'height'}/> x <InputBox value={scale.width} onChange={handleInputBox} index={'width'}/> px
                    </div>
                </div>
                <div className="flex flex-col gap-2">
                   {
                    sliderConfig.map((value: any, index: number)=>{
                        return (
                            <div key={index} className="flex flex-col gap-3">
                                <span>{value.title}</span>
                                <div key={index}>
                                    <Slider value={slider[index]} onChange={handleSlider} maxValue={value.Slider.max} index={index} width={20}/>
                                </div>
                            </div>
                        )
                    })
                   }
                </div>
            </div>
        </div>
    )
}