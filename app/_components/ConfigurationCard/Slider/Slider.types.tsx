import React from "react"

export type Slider = {
    value: number,
    onChange: ({}: Record<string, number>) => void,
    maxValue: number,
    width?: number,
    index: number,
    setValue?: React.Dispatch<React.SetStateAction<number>>
}