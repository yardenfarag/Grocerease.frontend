import React from 'react'
import { TailSpin } from 'react-loader-spinner'

interface Props {
    height: string
    width: string
}

export const Loader: React.FC<Props> = (props) => {
    const { height, width } = props
    return (
        <>
            <TailSpin
                height={height}
                width={width}
                color="#9dcc61"
                radius="1"
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
            />
        </>
    )
}
