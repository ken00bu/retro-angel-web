'use client'
import { useEffect, useRef, useState } from "react"
import { useSearchParams } from "next/navigation"
import { FFmpeg } from "@ffmpeg/ffmpeg"
import { fetchFile, toBlobURL } from '@ffmpeg/util';

import sliderConfig from '@/app/_config/ConfigurationCard/sliderConfig.js'
import DescriptorString from "@/app/_config/DescriptorCard"
import VideoCard from "@/app/_components/VideoCard"
import MetadataCard from "@/app/_components/MetadataCard"
import ConfigurationCard from "@/app/_components/ConfigurationCard"
import DescriptorCard from "@/app/_components/DescriptorCard"

export default function Editor(){
    const [slider, setSlider] = useState(Array(sliderConfig.length).fill(0))
    const [ scale, setScale ] = useState({ height: 0, width: 0 })
    const [ videoSrc, setVideoSrc ] = useState<string>("")
    const [ coreIsDownloaded, setCoreIsDownloaded ] = useState<boolean>(false)
    const ffmpegRef = useRef(new FFmpeg())
    const params = useSearchParams()
    let videoFormat: string | null
    const fileFormat = params.get('format')
    videoFormat = fileFormat
 

    useEffect(()=>{
        const fileURL = 'blob:http://' + window.location.host + '/' + params.get('file')

        const checkVideo = async() => {
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

    useEffect(()=>{
        const loadFFmpeg = async() =>{
            const baseURL = 'https://cdn.jsdelivr.net/npm/@ffmpeg/core@0.12.10/dist/umd'
            const ffmpeg = ffmpegRef.current;
            ffmpeg.on('log', ({ message }) => {
                console.log('log ffmpeg: ', message);
            });

            await ffmpeg.load({
                coreURL: await toBlobURL(`${baseURL}/ffmpeg-core.js`, 'text/javascript'),
                wasmURL: await toBlobURL(`${baseURL}/ffmpeg-core.wasm`, 'application/wasm'),
            });
            setCoreIsDownloaded(true)
        }
        loadFFmpeg()
    }, [])

    const renderVideo = async() => {
        const bitrate = slider[0]
        const noise = slider[1]
        const fps = slider[2]
        const delay = slider[3]

        const width = scale.width
        const height = scale.height

        const ffmpeg = ffmpegRef.current
        const videoPath = `input.${videoFormat}` 

        const res = await fetch(videoSrc)
        const buffer = await res.arrayBuffer()
        ffmpeg.writeFile(videoPath, new Uint8Array(buffer))

        let vf: boolean[]  = [false]
        let args: string[] = [
            '-y', 
            '-flags', 'output_corrupt',
            '-i', videoPath,
        ]
        
        const generateArgs = [
            [bitrate, (args: string[], value: number, vf: boolean[])=> generateBitrate(args, value, vf)],
            [noise, (args: string[], value: number, vf: boolean[])=> generateNoise(args, value, vf)],
            [fps, (args: string[], value: number, vf: boolean[])=> generateFps(args, value, vf)],
            [delay, (args: string[], value: number, vf: boolean[])=> generateDelay(args, value, vf)]
        ]

        if(width !== 0 && height !== 0 ){
            generateScale(args, height, width, vf)
        }

        generateArgs.forEach((arr, index)=>{
            const value = arr[0]
            const generate = arr[1] 

            if(value != 0){
                generate(args, value, vf) 
                return
            }

        })
        args.push('output.mp4')


        await ffmpeg.exec(args);
        const dataVideo = await ffmpeg.readFile('output.mp4') as any;
        const newSrc = URL.createObjectURL(new Blob([dataVideo.buffer], {type: 'video/mp4'}));
        console.log('sukses!')
        setVideoSrc(newSrc)
        console.log(args)

    }

    
    return (
        <div className="bg-linear-to-bl from-[#03140B] to-[#151123] min-h-screen h-full flex items-center flex-col gap-10 pt-5 lg:pt-20 pb-28">
            <div className="flex flex-col gap-3">
                <div className="bg-black rounded-2xl h-120 w-[90vw] lg:w-[50vw] flex justify-center items-center text-white">
                    <VideoCard src={videoSrc}/>
                </div>
                <div className="w-[90vw] lg:w-[50vw]">
                    <MetadataCard scale={scale} bitrate={slider[0]} fps={slider[2]} delay={slider[3]} noise={slider[1]}/>
                </div>
            </div>
            <div className="flex flex-col justify-center lg:flex-row gap-14 lg:gap-10">
                <div className="w-[90vw] lg:w-140 flex flex-col gap-3">
                    <ConfigurationCard slider={slider} setSlider={setSlider} scale={scale} setScale={setScale} sliderConfig={sliderConfig}/>
                    <button onClick={renderVideo} className="lg:hidden group flex h-14 items-center justify-center rounded-md border border-orange-600 bg-linear-to-b from-orange-400 via-orange-400 to-orange-500 px-4 text-neutral-50 shadow-[inset_0_1px_0px_0px_#fdba74] active:[box-shadow:none]"><span className="block group-active:transform-[translate3d(0,1px,0)]">Render Video</span></button>
                </div>
                <div className="w-[90vw] lg:w-100 flex flex-col gap-7">
                    <DescriptorCard title={DescriptorString.title} list={DescriptorString.list}/>
                    <button onClick={renderVideo} className="group hidden lg:flex h-14 items-center justify-center rounded-md border border-orange-600 bg-linear-to-b from-orange-400 via-orange-500 to-orange-500 px-4 text-neutral-50 shadow-[inset_0_1px_0px_0px_#fdba74] active:[box-shadow:none]"><span className="block group-active:transform-[translate3d(0,1px,0)]">Render Video</span></button>
                </div>
            </div>
        </div>
    )
}

const generateScale = (args: string[], height: number, width: number, vf: boolean[]) =>{
    if (vf[0]){
        const indexOfVf = args.findIndex(item => item == "-vf")
        const newVf = args[indexOfVf + 1] + `, scale=${height}:${width}`
        args.splice(indexOfVf + 1, 1, newVf)
    }else{
        vf[0] = true
        args.push(
            '-vf', `scale=${height}:${width}`
        )
    }
}

const generateBitrate = (args: string[], bitrate: number, vf: boolean[]) =>{

    args.push(
        '-c:v', 'libx264', 
        '-b:v ', `${bitrate}k`
    )
}

const generateNoise = (args: string[], noise: number, vf: boolean[]) =>{

    args.push(
        '-bsf:v', `noise=amount=${noise}`
    )
}

const generateFps = (args: string[], fps: number, vf: boolean[]) =>{

    if (vf[0]){
        const indexOfVf = args.findIndex(item => item == "-vf")
        const newVf = args[indexOfVf + 1] + `, fps=${fps}`
        args.splice(indexOfVf + 1, 1, newVf)
    }else{
        vf[0] = true
        args.push(
            '-vf', `fps=${fps}`
        )
    }
}

const generateDelay = (args: string[], delay: number, vf: boolean[]) =>{

    if (vf[0]){
        const indexOfVf = args.findIndex(item => item == "-vf")
        const newVf = args[indexOfVf + 1] + `, tmix=frames=${delay}:weights='1 0.6 0.3 0.15`
        args.splice(indexOfVf + 1, 1, newVf)
    }else{
        vf[0] = true
        args.push(
            '-vf', `tmix=frames=${delay}:weights='1 0.6 0.3 0.15`
        )
    }
}