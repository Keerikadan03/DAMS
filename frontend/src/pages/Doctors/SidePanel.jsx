import {useState,useEffect} from 'react'
import { BASE_URL, token } from '../../config'
import { toast } from 'react-toastify'

const SidePanel = ({doctorId,ticketPrice, timeSlots}) => {
        const bookingHandler = async() => {
        try{
            const requestData = {
                selectedIndex: selectedTimeSlot
            };

            const res  = await fetch(`${BASE_URL}/bookings/checkout-session/${doctorId}`, {
                method: 'post',
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body:JSON.stringify(requestData)
            })

            console.log("selected timeslot details => ", timeSlots[selectedTimeSlot])

            const data = await res.json()

            if(!res.ok){
                console.log("data message =>",data.message)
                throw new Error("Doctors cannot book appointments",data.message)
            }

            if(data.session.url){
                window.location.href = data.session.url
            }

        }catch(e){
            toast.error(e.message)
            console.log("error at booking handler => ", e)
        }
    }


    const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);

    const handleTimeSlotSelection = (timeSlotId) => {
        setSelectedTimeSlot(timeSlotId === selectedTimeSlot ? null : timeSlotId);
    };

    // useEffect(()=>{
    //     timeSlots.map((timeSlot,index) => {
    //         console.log("timeSlot details ->", timeSlot.isBooked)
    //     })
    // },[handleTimeSlotSelection])

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
                        !timeSlot.isBooked && 
                        <li key={index} className='flex items-center justify-between mb-2'>
                        
                        <p className='text-[15px] leading-6 text-textColor font-semibold'>
                            {timeSlot.day && timeSlot.day}
                        </p>
                        <p className='text-[15px] leading-6 text-textColor font-semibold'>
                            {timeSlot.startingTime && timeSlot.startingTime} - {timeSlot.endingTime && timeSlot.endingTime}
                        </p>
                        <input
                            type='checkbox'
                            value={index}
                            checked={selectedTimeSlot === index}
                            onChange={() => handleTimeSlotSelection(index)}
                        />
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