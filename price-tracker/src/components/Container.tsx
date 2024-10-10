import React from 'react'

interface ContainerProps {
    children: React.ReactNode
}

const Container: React.FC<ContainerProps> = ({children}) => {
  return (
    <div className = 'px-10'>{children}</div>
  )
}

export default Container