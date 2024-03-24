import React from 'react'
import Header from '../components/Header/Header'
import Routers from '../routes/Routers'

const Layout = () => {
  return (
    <div>
        <Header/>
        <main>
            <Routers/>
        </main>
    </div>
  )
}

export default Layout