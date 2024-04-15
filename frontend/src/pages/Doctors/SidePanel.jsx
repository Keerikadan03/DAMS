import React from 'react'
import { BASE_URL, token } from '../../config'
import { toast } from 'react-toastify'

const SidePanel = ({doctorId,ticketPrice, timeSlots}) => {
    console.log("timeSlots are => ", timeSlots)

    const bookingHandler = async() => {
        try{
            const res  = await fetch(`${BASE_URL}/bookings/checkout-session/${doctorId}`, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`
                },
            })

            const data = await res.json()

            if(!res.ok){
                throw new Error("Please try again, sidepanel fetch => ",data.message)
            }

            if(data.session.url){
                window.location.href = data.session.url
            }

        }catch(e){
            toast.error(e.message)
            console.log("error at booking handler => ", e)
        }
    }

    return (
    <div className='shadow-panelShadow p-3 lg:p-5 rounded-md'>
        <div className='flex-item-center justify-between'>
            <p className='text__para mt-0 font-semibold'>Ticket Price</p>
            <span className='text-[16px] leading-7 lg:text-[22px] lg:leading-8 text-headingColor'>{ticketPrice}</span>
        </div>
        <div className='mt-[30px]'>
            <p className='text__para mt-0 font-semibold text-headingColor'>
                Available Time Slots:
            </p>
            <ul className=''>
                {
                    timeSlots && timeSlots.map((timeSlot, index) => (
                        <li key={index} className='flex items-center justify-between mb-2'>
                        <p className='text-[15px] leading-6 text-textColor font-semibold'>
                            {timeSlot.day && timeSlot.day}
                        </p>
                        <p className='text-[15px] leading-6 text-textColor font-semibold'>
                            {timeSlot.startingTime && timeSlot.startingTime} - {timeSlot.endingTime && timeSlot.endingTime}
                        </p>
                    </li>
                    ))
                }
            </ul>
        </div>
        <button 
        onClick={() => bookingHandler()}
        className='btn px-2 w-full rounded-md'>
            Book Appointment
        </button>
    </div>
    )
}

export default SidePanel