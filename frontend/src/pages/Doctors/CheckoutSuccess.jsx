import React from 'react'
import { Link } from 'react-router-dom'

const CheckoutSuccess = () => {
  return (
    <div className=' h-screen'>
        <div className='bg-white p-6 md:mx-auto'>
            <div className='text-center'>
                <h3 className='md:text-2xl text-base text-gray-900 font-semibold text-center'>Payment Done</h3>
                <p className='text-gray-600 my-2'>
                    Thank you for completing payment
                </p>
                <div>
                    <button className='px-12 btn bg-primaryColor text-white font-semibold py-3 my-2'>
                    <Link to={'/'}>
                        Go back Home
                    </Link>
                    </button>
                    
                </div>
            </div>
        </div>
    </div>
  )
}

export default CheckoutSuccess