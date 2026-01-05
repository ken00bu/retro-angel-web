'use client'
import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import sliderConfig from '@/app/_config/ConfigurationCard/sliderConfig.js'
import DescriptorString from "@/app/_config/DescriptorCard"
import VideoCard from "@/app/_components/VideoCard"
import MetadataCard from "@/app/_components/MetadataCard"
import ConfigurationCard from "@/app/_components/ConfigurationCard"
import DescriptorCard from "@/app/_components/DescriptorCard"

export default function Editor(){
    const [slider, setSlider] = useState(Array(sliderConfig.length).fill(0))
    const [ scale, setScale ] = useState({
        height: 0,
        width: 0
    })
    const [ videoSrc, setVideoSrc ] = useState<string | null | Blob>("")
    const [ videoFormat, setVideoFormat ] = useState<string | null>("")
    const [ inputBox, setInputBox ] = useState({
        height: 0,
        width: 0
    })
    const params = useSearchParams()

    useEffect(()=>{
        console.log('start check')
        
        const fileURL = 'blob:http://' + window.location.host + '/' + params.get('file')
        const fileFormat = params.get('format')

        setVideoFormat(fileFormat)

        const checkVideo = async() => {
            console.log('proses check...')
            try {
                const response = await fetch(fileURL)
                if (!response.ok){
                    throw new Error('Response Status: ' + response.status)
                    return
                }

                setVideoSrc(response.url);
            } catch (error) {
                setVideoSrc('failed');
            }

        }
        checkVideo()
    }, [params])

    
    return (
        <div className="bg-linear-to-bl from-[#03140B] to-[#151123] min-h-screen h-full flex items-center flex-col gap-10 pt-5 lg:pt-20 pb-28">
            <div className="flex flex-col gap-3">
                <div className="bg-black rounded-2xl h-120 w-[90vw] lg:w-[50vw] flex justify-center items-center text-white">
                    <VideoCard src={videoSrc} format={videoFormat}/>
                </div>
                <div className="w-[90vw] lg:w-[50vw]">
                    <MetadataCard scale={scale} bitrate={slider[0]} fps={slider[2]} delay={slider[3]} noise={slider[1]}/>
                </div>
            </div>
            <div className="flex flex-col justify-center lg:flex-row gap-3 lg:gap-10">
                <div className="w-[90vw] lg:w-[35rem]">
                    <ConfigurationCard slider={slider} setSlider={setSlider} scale={scale} setScale={setScale} sliderConfig={sliderConfig}/>
                </div>
                <div className="w-[90vw] lg:w-[25rem]">
                    <DescriptorCard title={DescriptorString.title} list={DescriptorString.list}/>
                </div>
            </div>
        </div>
    )
}