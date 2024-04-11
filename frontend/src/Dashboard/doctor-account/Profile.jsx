import React, { useState } from 'react'

const Profile = () => {

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        specialization:'',
        ticketPrice: 0,
        qualifications: [],
        experiences: [],
        timeSlots:[]
    })

    const handleInputChange = () => {
        setFormData({...formData, [e.target.name]:e.target.value})
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
                <div className='grid grid-cols-2 gap-5 mb-[30px]'>
                    <div>
                        <p className='form_label'>Specialization</p>
                        <select name="specialization"
                        id=""
                        value={formData.specialization}
                        onChange={handleInputChange}
                        >
                            <option value="">Select</option>
                            <option value="surgery">Surgery</option>
                            <option value="neurology">Neurology</option>
                            <option value="dermatology">Dermatology</option>
                            <option value="pulmonology">Pulmonology</option>
                            <option value="urology">Urology</option>
                            <option value="rheumatology">Rheumatology</option>
                            <option value="nephrology">Nephrology</option>
                            <option value="gastroenterology">Gastroenterology</option>
                            <option value="general-practice">General practice</option>
                            <option value="internal-medicine">Internal medicine</option>
                        </select>
                    </div>

                    <div>
                        <p className='form_label'>Ticket Price</p>
                        <input type="number" 
                        placeholder='100' 
                        name='ticketPrice'
                        value={formData.ticketPrice}
                        />
                    </div>
                </div>
            </div>
        </form>
    </div>
  )
}

export default Profile