import React, { useState } from 'react'

const Profile = () => {

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',

    })

    const handleInputChange = () => {

    }
  return (
    <div>
        <h2 className='text-headingColor font-bold text-[24px] leading-9 mb-10'>Profile Information</h2>

        <form action="">
            <div className="mb-5">
                <p className="form_label">Name*</p>
                <input type="text" 
                name='name' 
                value={formData.name} 
                onChange={handleInputChange}
                placeholder='Full Name'
                className='form_input'
                />
            </div>
            <div className="mb-5">
                <p className="form_label">Email*</p>
                <input type="email" 
                name='email' 
                value={formData.email} 
                onChange={handleInputChange}
                placeholder='Email'
                className='form_input'
                readOnly
                aria-readonly
                disabled
                />
            </div>
            <div className="mb-5">
                <p className="form_label">Phone*</p>
                <input type="number" 
                name='phone' 
                value={formData.phone} 
                onChange={handleInputChange}
                placeholder='Phone Number'
                className='form_input'
                />
            </div>
            <div className="mb-5">
                <div className='grid grid-cols-3 gap-5 mb-[30px]'>
                    <div>
                        <p className='form_label'>Specialization</p>
                    </div>
                </div>
            </div>
        </form>
    </div>
  )
}

export default Profile