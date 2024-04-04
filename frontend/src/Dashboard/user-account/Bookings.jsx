import useFetchdata from "../../hooks/useFetchdata"
import { BASE_URL } from "../../config"
import DoctorCard from "../../components/Doctors/DoctorCard"
import Loading from "../../components/Loader/Loading"
import Error from "../../components/Error/Error"


const Bookings = () => {
  const {data: appointments, loading, error} = useFetchdata(`${BASE_URL}/users/appointments/my-appointments`)
  return (
    <div>
      {loading && !error && <Loading />}
      {error && !loading && <Error errorMessage={error}/>}
      {!loading && !error && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {
          appointments.map(doctor => <DoctorCard doctor={doctor} key={doctor._id}/>)
        }
      </div>
      )}
      {
        !loading && !error && appointments.length === 0 && 
        <h3 className="mt-5 text-center leading-7 text-[20px] font-semibold text-primaryColor">No appointments</h3>
      }
    </div>
  )
}

export default Bookings