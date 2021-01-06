import React from 'react'
import Footer from './Footer'
import Navi from './Navi'

const Layout = ({children}) => {
    return (
        <>
            <Navi />
            {children}
            <Footer />
        </>
    )
}

export default Layout