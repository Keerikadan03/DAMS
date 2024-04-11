import React, { useState,useEffect } from 'react'
import { BASE_URL } from '../../config'
import Loading from '../../components/Loader/Loading'
import Error from '../../components/Error/Error'
import Tabs from './Tabs'
import { token } from '../../config'

const useGetProfile = (url) => {

  const [data,setData] = useState([])

  useEffect(() => {
      const fetchData = async() => {
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
          }catch(e){
              console.log("error at fetching data hook is => ", e)
          }
      }

      fetchData()
  },[url])
return { data}
}

const DoctorDashboard = () => {

  const { data, loading, error } = useGetProfile(`${BASE_URL}/doctors/profile/me`) 
  console.log(data)
  const [tab,setTab] = useState('overview')
  return (
    <section>
      <div className='max-w-[1170px] px-5 mx-auto'>
        {loading && !error && <Loading/>}
        {error && !loading && <Error errorMessage={error}/>}
        {
          !loading && !error &&(
          <div className='grid lg:grid-cols-3 gap-[30px] lg:gap-[50px]'>
            <Tabs tab={tab} setTab={setTab}/>
            
          </div>
        )}
      </div>
    </section>
  )
}

export default DoctorDashboard