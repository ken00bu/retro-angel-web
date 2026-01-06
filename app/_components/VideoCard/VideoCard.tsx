import InputCard from "../InputCard"
import { InputHandleChange } from "../InputCard/InputCard.type"
import { useRouter } from "next/navigation"

export default function VideoCard({src, setSrc}: Record<string, any>){
    const router = useRouter()
    const handleChange: InputHandleChange = (e: any) => {
        
        const inputFile = e.target.files?.[0]
        const fileFormat = inputFile.type.split("/")[1]
        const fileURL = URL.createObjectURL(inputFile)
        
        const params = new URLSearchParams({
          file: fileURL.split("/").pop() ?? "",
          format: fileFormat
        })
        
        router.push('/editor?' + params)
        return
      }

    return (
        <>
            {
                src !== 'failed' && src ? 
                <div className="">
                    <video src={src} autoPlay={true} muted={true} loop={true} className="max-h-120"></video>
                </div> 
                : 
                <div>
                    <InputCard handleChange={handleChange} />
                </div> 
            }
        </>
    )
}