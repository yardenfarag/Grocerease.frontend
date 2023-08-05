import React from 'react'
import { Toaster } from 'react-hot-toast'

export const Toast = () => {
    return (
        <Toaster
            position="top-right"
            reverseOrder={false}
            gutter={8}
            containerClassName=""
            containerStyle={{}}
            toastOptions={{
                // Define default options
                className: '',
                duration: 1750,
                style: {
                    background: '#363636',
                    color: '#fff',
                },

                // Default options for specific types
                success: {
                    duration: 1750,
                    // theme: {
                    //     primary: 'green',
                    //     secondary: 'black',
                    // },
                },
                error: {
                    duration: 1750,
                    // theme: {
                    //     primary: 'green',
                    //     secondary: 'black',
                    // },
                },
            }}
        />
    )
}
