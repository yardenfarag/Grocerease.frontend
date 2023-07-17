import React from 'react'
import { TailSpin } from 'react-loader-spinner'

export const Loader = () => {
    return (
        <>
            <TailSpin
                height="23px"
                width="23px"
                color="#fff"
                ariaLabel="tail-spin-loading"
                radius="1"
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
            />
        </>
    )
}
