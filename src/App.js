import React from 'react'
import CurrencyConverter from './component/CurrencyConverter'
import './index.css'
import Footer from './component/Footer'

const App = () => {
  return (

    <div>
      <CurrencyConverter/>
      <div className='fixed bottom-0 left-0 w-screen'>
        <Footer/>
      </div>
    </div>
  )
}

export default App