import { Descriptor } from "./DescriptorCard.types"

export default function DescriptorCard({title, list}: Descriptor){
    return (
            <div className="border-cardStroke border-2 rounded-2xl relative overflow-hidden">
                <div className="absolute bg-cardBackground opacity-50 inset-0 w-full "></div>
                <div className="relative z-10 p-5 flex-col gap-5 text-[0.9rem] font-chivoMonoMedium text-white">
                    <div className="flex flex-col gap-7">
                        <div >{title}</div>
                        <div className="flex flex-col gap-3 text-[0.88rem]">
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