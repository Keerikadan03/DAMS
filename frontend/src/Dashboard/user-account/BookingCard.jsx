import React from 'react';
import { BsArrowRight } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import starIcon from '../../assets/images/Star.png';
import { BASE_URL,token } from '../../config';
import { useState,useEffect } from 'react';

const BookingCard = ({doctor,doctorId,appointments,index}) => {
    const useFetchdata = (url) => {

        const [data,setData] = useState([])
        const [loading, setLoading] = useState(false)
        const [error, setError] = useState(null)
      
        useEffect(() => {

            appointments.map((app)=> console.log(app.timeSlots))
            const fetchData = async() => {
                setLoading(true);
                try{
                    const response = await fetch(url, {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    })
        
                    const result = await response.json();
        
                    if(!response.ok){
                        throw new Error(result.message)
                    }
      
                    setData(result.data)
                    setLoading(false)
                }catch(e){
                    setLoading(false);
                    setError(e.message)
                    console.log("error at fetching data hook is => ", e)
                }
            }
      
            fetchData()
        },[url])
      return { data, loading, error}
      }

      const {data:doctorDetails} = useFetchdata(`${BASE_URL}/doctors/${doctorId}`)

      const {data:timeSlots} = useFetchdata(`${BASE_URL}/users/appointments/timeslots`);
      console.log("timeSlots are =>",timeSlots)
      console.log("doctor details are =>",doctorDetails);
      const {_id} = doctorDetails;
      console.log("doctor id is =>",_id)
    const {name, totalRating, photo, specialization} = doctor


    const bookingDetails = timeSlots.filter(timeSlot => timeSlot.doctor === _id);
    const selectedIndex = bookingDetails.length > 0 ? bookingDetails[0].selectedIndex : undefined;
    console.log("selected index is =>", selectedIndex, appointments[0].timeSlots[1], appointments[0].timeSlots[selectedIndex]);
    
    const timeSlot = appointments[0].timeSlots[selectedIndex]

    console.log("timeslot is ", timeSlot)

    return (
    <div className='p-3 lg:p-5'>
        <div>
            <img src={photo} className='w-full' alt=''/>
        </div>
        <h2 className='text-[18px] leading-[30px] lg:text-[26] lg:leading-9 text-headingColor font-[700] mt-3 lg:mt-5'>{name}</h2>
        <div className='mt-2 lg:mt-2 flex items-center justify-between'>
            <span className='bg-[#CCF0F3] text-irisBlueColor py-1 px-2 lg:py-1.5 lg:px-3 text-[12px] leading-4 lg:text-[16px] lg:leading-7 font-semibold rounded'>
                {specialization}
            </span>
            <div className='flex items-center gap-[6px]'>
                <span className='flex items-center gap-[6px] text-[14px] leading-6 lg:text-[16px] lg:leading-7 font-semibold text-headingColor'>
                    <img src={starIcon} alt=""/> {parseFloat(doctorDetails.averageRating).toFixed(2)}
                </span>
                <span className='text-[14px] leading-6 lg:text-[16px] lg:leading-7 font-[400] text-textColor'>
                    ({totalRating})
                </span>
            </div>
        </div>
        <div className='mt=[18px] lg:mt-3 flex items-center justify-between gap-4'>
            <p className='text-[15px] leading-6 text-textColor font-semibold'>
                {timeSlot?.day && timeSlot.day}
            </p>
            <p className='text-[15px] leading-6 text-textColor font-semibold'>
                {timeSlot?.startingTime && timeSlot.startingTime} - {timeSlot?.endingTime && timeSlot.endingTime}
            </p>
            <Link to={`/doctors/${doctor._id}`}className='w-[44px] h-[44px] rounded-full border border-solid border-[#181A1E] mx-auto flex items-center justify-center group hover:bg-primaryColor hover:border-none'>
                <BsArrowRight className='group-hover:text-white w-6 h-5' />
            </Link>
        </div>
    </div>
    )
}

export default BookingCard