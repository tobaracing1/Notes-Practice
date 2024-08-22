import React from 'react'
import { ToastPosition } from 'react-toastify'

const toastOptions = {
    position: "top-right" as ToastPosition,
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
}

const useToastOptions = () => {
    return toastOptions
}

export default useToastOptions