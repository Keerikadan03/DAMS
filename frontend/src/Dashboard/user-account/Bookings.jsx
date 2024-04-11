import useFetchdata from "../../hooks/useFetchdata"
import { BASE_URL } from "../../config"
import DoctorCard from "../../components/Doctors/DoctorCard"
import { token } from "../../config"
import { useState,useEffect } from "react"
import Loading from "../../components/Loader/Loading"
import Error from "../../components/Error/Error"

// const getBookingdata = (url) => {

//   const [data,setData] = useState([])

//   useEffect(() => {
//       const fetchData = async() => {
//           try{
//               const response = await fetch(url, {
//                   headers: {
//                       Authorization: `Bearer ${token}`
//                   }
//               })
  
//               const result = await response.json();
  
//               if(!response.ok){
//                   throw new Error(result.message)
//               }

//               setData(result.data)
//           }catch(e){
//               console.log("error at fetching data hook is => ", e)
//           }
//       }

//       fetchData()
//   },[url])
// return { data}
// }

const Bookings = () => {
  const {data: appointments, loading, error} = useFetchdata(`${BASE_URL}/users/appointments/my-appointments`)
  console.log("appointments data =>", appointments)
  return (
    <div>
        {loading && !error && <Loading/>}
        {error && !loading && <Error errorMessage={error}/>}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {
          appointments.map(doctor => <DoctorCard doctor={doctor} key={doctor._id}/>)
        }
      </div>
      {!loading&& !error && appointments.length === 0 && 
        <h3 className="mt-5 text-center leading-7 text-[20px] font-semibold text-primaryColor">No appointments</h3>}
    </div>
  )
}

export default Bookings