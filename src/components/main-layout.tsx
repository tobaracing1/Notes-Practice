import React from 'react'
import Navigation from './navigation'

interface Props{
    children : React.ReactNode;
}

const MainLayout: React.FC<Props> = ({children}) => {
  return (
    <div className='min-h-screen w-full p-4'>
      <Navigation />
      {children}
    </div>
  )
}

export default MainLayout