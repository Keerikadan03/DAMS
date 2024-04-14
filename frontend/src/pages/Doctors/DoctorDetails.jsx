import React, { useState } from 'react';
import starIcon from '../../assets/images/Star.png';
import doctorImg from '../../assets/images/doctor-img02.png';
import DoctorAbout from './DoctorAbout';
import Feedback from './Feedback';
import SidePanel from './SidePanel';
import Loading from "../../components/Loader/Loading";
import Error from "../../components/Error/Error";
import { useEffect } from "react";
import { BASE_URL, token } from '../../config';
import { useParams } from 'react-router-dom';

const useFetchdata = (url) => {

  const [data,setData] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
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

const DoctorDetails = () => {

  const {id} = useParams()
  const {data:doctor, loading, error} = useFetchdata(`${BASE_URL}/doctors/${id}`)
  // console.log("doctor detils at =>",doctor)
  const [tab,setTab] = useState('feedback');

  const {
    name,
    email,
    phone,
    photo,
    specialization,
    ticketPrice,
    timeSlots,
    reviews,
    averageRating,
    totalRating,

  } = doctor
  console.log(doctor)
  return (
    <section>
      <div className='max-w-[1170px] px-5 mx-auto'>

        {loading && <Loading />}
        {error && <Error />}
        {!error && !loading &&
          (<div className='grid md:grid-cols-3 gap-[50px]'>
          <div className='md:col-span-2'>
            <div className='flex item-center gap-5'>
              <figure className='max-w-[200px] max-h-[200px]'>
                <img src={photo} alt='' className='w-full' />
              </figure>
              <div>
                <span className='bg-[#ccf0f3] text-irisBlueColor py-1 px-6 lg:py-2 lg:px-6 text-[12px] leading-4 lg:text-[16px] lg:leading-7 font-semibold rounded'>
                  {specialization}
                </span>
                <h3 className='text-headingColor text-[22px] leading-9 mt-3 font-bold'>{name}</h3>
                <div className='flex items-center gap-[6px]'>
                  <span className='flex items-center gap-[6px] text-[14px] leading-5 lg:text-[16px] lg:leading-7 font-semibold text-headingColor'>
                  <img src={starIcon} alt=""/>{averageRating}
                  </span>
                  <span className='text-[14px] leading-5 lg:text-[16px] lg:leading-7 font-[400px] text-textColor'>
                    ({totalRating})
                  </span>
                </div>
              </div>
            </div>
            <div className='mt-[50px] border-b border-solid border-[#0066ff34]'>
              <button onClick={() => setTab('feedback')} className={`${tab == 'feedback' && 'border-b border-solid border-primaryColor'} py-2 px-5 mr-5 text-[16px] leading-7 text-headingColor font-semibold`}>Feedback</button>
            </div>
            
            <div className='mt-[50px]'>             
              <Feedback reviews={reviews} totalRating={totalRating}/>   
            </div>

          </div>
          <div> 
            <SidePanel 
              doctorId={doctor._id}
              ticketPrice={ticketPrice}
              timeSlots={timeSlots}
            />  
          </div>
        </div>)}
      </div>
    </section>
  )
}

export default DoctorDetails