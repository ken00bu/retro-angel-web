import { VideoMetadata } from "./MetadataCard.types"

export default function MetadataCard({scale, bitrate, fps, delay, noise}: VideoMetadata){
    return(
        <div className="rounded-lg relative overflow-hidden pl-3 pr-3 lg:pl-10 lg:pr-10 p-3 font-chivoMonoMedium text-textGray shadow-[0px_0px_24px_0px_rgba(0,0,0,0.4)] text-[0.75rem] lg:text-[1rem]">
            <div className="absolute bg-cardBackground opacity-50 inset-0 w-full "></div>
            <div className="lg:flex justify-between gap-3 hidden">
                <div className="gap-2 flex">
                    <span>{scale.height}x{scale.width}</span>
                    <span>{bitrate}kbps</span>
                    <span>{fps}FPS</span>
                </div>
                <div className="gap-2 flex">
                    <span className="text-right">Delay: {delay} Frame</span>
                    <span className="text-right">Noise: {noise}</span>
                </div>
            </div>
            <div className="lg:hidden flex flex-wrap gap-3 justify-center">
                <span className="">{scale.height}x{scale.width}</span>
                <span className="">{bitrate}kbps</span>
                <span className="">{fps}FPS</span>
                <span className="">Delay: {delay} Frame</span>
                <span className="">Noise: {noise}</span>
            </div>
        </div>
    )
}