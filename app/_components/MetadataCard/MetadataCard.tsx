import { VideoMetadata } from "./MetadataCard.types"

export default function MetadataCard({scale, bitrate, fps, delay, noise}: VideoMetadata){
    return(
        <div className="rounded-lg relative overflow-hidden pl-10 pr-10 p-3 font-chivoMonoMedium text-textGray shadow-[0px_0px_24px_0px_rgba(0,0,0,0.4)]">
            <div className="absolute bg-cardBackground opacity-50 inset-0 w-full "></div>
            <div className="flex justify-between">
                <div className="gap-2 flex">
                    <span>{scale.height}x{scale.width}</span>
                    <span>{bitrate}kbps</span>
                    <span>{fps}FPS</span>
                </div>
                <div className="gap-2 flex">
                    <span>Delay: {delay} Frame</span>
                    <span>Noise: {noise}</span>
                </div>
            </div>
        </div>
    )
}