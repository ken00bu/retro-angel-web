export default function InputBox({width, height, index, value, onChange, setValue, max, min}: any){
    const Width = width ? `w-[${width}]` : 'w-[50]'
    const Heigth = height ? `h-[${height}]` : 'h-[50]'

    const handleChange = (e: any) => {
        if(index !== undefined){
            onChange({
                newValue: e.target.value, 
                index
            })
        }

        if(setValue){
            setValue(e.target.value)
        }
    }
    
    return (
        <div className="rounded-[0.3rem] border-[3px] border-[#6D6D6D] flex w-fit overflow-hidden">
            <input type="number" className={`${Width} ${Heigth} text-center bg-white focus:outline-none text-black no-spin`} value={value} onChange={handleChange} />
        </div>
)}