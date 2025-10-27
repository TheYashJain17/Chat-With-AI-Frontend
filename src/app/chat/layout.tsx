import React from 'react'

const Layout = ({children}: {children: React.ReactNode}): React.JSX.Element => {
  return (
    <div>{children}</div>
  )
}

export default Layout