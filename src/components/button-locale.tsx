import React from 'react'
import { useLocale } from '@/hooks/use-locale'

const ButtonLocale = () => {

    const {locale, toggleLocale} = useLocale();
  return (
    <button onClick={toggleLocale} className='w-12 h-12 transition-all duration-300 ease-in-out shadow-sm hover:shadow-lg '>
        {locale}
    </button>
  )
}

export default ButtonLocale