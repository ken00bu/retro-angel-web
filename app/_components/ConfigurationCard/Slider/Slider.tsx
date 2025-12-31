import { Slider as SliderMUI } from "@mui/material"
import { Slider as SliderProps } from './Slider.types'


export default function Slider({value, onChange, maxValue, index, setValue, width}: SliderProps){
    const Width = width ? width : 24

    const handleChange = (event: Event, newValue: number) => {
        if (index !== undefined){
            onChange({newValue, index})
            return
        }

        if(setValue){
            setValue(newValue)
            return
        }
    }

    
    return (
        <SliderMUI max={maxValue} value={value} onChange={handleChange} sx={(t) => ({
                color: '#FFFFFF',
                '& .MuiSlider-rail': {
                    height: Width,
                    border: 3,
                    borderColor: '#6D6D6D',
                },
                '& .MuiSlider-track': {
                    backgroundColor: '#0A1716',
                    border: 3,
                    borderColor: '#6D6D6D',
                    height: Width
                },
                '& .MuiSlider-thumb': {
                    border: 3,
                    borderColor: '#A3A3A3',
                    width: Width,
                    height: Width,
                    backgroundColor: '#fff',
                    '&:hover, &.Mui-focusVisible, &.Mui-active': {
                        boxShadow: 'none',
                    },
                },
                ...t.applyStyles('dark', {
                    color: '#fff',
                }),
                })}/>
    )
}