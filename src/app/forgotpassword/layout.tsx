import React from 'react'

const layout = ({children}: {children: React.ReactNode}): React.JSX.Element => {
  return (
    <div>{children}</div>
  )
}

export default layout