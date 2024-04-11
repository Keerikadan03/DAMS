import {useState,useEffect} from 'react';

import { doctors } from '../../assets/data/doctors';
import DoctorCard from './DoctorCard';
import { BASE_URL } from '../../config';
import Loading from '../Loader/Loading';
import Error from '../Error/Error';

const useFetchData = (url) => {

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


const DoctorsList = () => {
    const {data:doctors,loading,error} = useFetchData(`${BASE_URL}/doctors`)
    return (
        <>
        {loading && <Loading />}
        {error && <Error errorMessage={error}/>}
        
        {!loading && !error && <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 lg:gap-[30px] mt-[30px] lg:mt-[50px]">
        {doctors.map(doctors=> (<DoctorCard key={doctors.id} doctor={doctors}/>))}</div>}
        </>
    )
}

export default DoctorsList