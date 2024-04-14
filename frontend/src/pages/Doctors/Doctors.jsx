import DoctorCard from "../../components/Doctors/DoctorCard";
import Loading from "../../components/Loader/Loading";
import Error from "../../components/Error/Error";
import { useState, useEffect } from "react";
import { BASE_URL, token } from '../../config';
import Specialisations from '../../components/Specialisations/Specialisations.jsx'
import SymptomSearch from '../../components/Symptoms/SymptomSearch.jsx'
import { symptoms } from '../../components/Symptoms/Symptoms'
import { symptomContext } from '../../context/SymptomContext.jsx'

const Doctors = () => {
  const [searchInput, setSearchInput] = useState('');
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const handleSpecializationSelect = (specializationName) => {
    console.log(specializationName)
    setSearchInput(specializationName)
  }

  const handleSearch = (e) => {
    setSearchInput(e.target.value.trim());
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${BASE_URL}/doctors`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }

        const data = await response.json();
        setDoctors(data.data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const filteredDoctors = doctors.filter((doctor) => {
    const name = doctor.name ? doctor.name.toLowerCase() : '';
    const specialization = doctor.specialization ? doctor.specialization.toLowerCase() : '';
    return name.includes(searchInput.toLowerCase()) || specialization.includes(searchInput.toLowerCase());
  });

  const [data, setData] = useState([]);

  const addData = newData => {
    setData(prevData => [...prevData, newData])
  }

  return (
    <>
      <section className="bg-[#fff9ea]">
        <div className="container text-center">
          <h2 className='heading'>Find a Doctor</h2>
          <div className="max-w-[570px] mt-[30px] mx-auto bg-[#0066ff2c] rounded-md flex items-center justify-between">
            <input type="search"
              className="py-4 pl-4 pr-2 bg-transparent w-full focus:outline-none cursor-pointer placeholder-textColor"
              placeholder="Search Doctor"
              value={searchInput}
              onChange={handleSearch}
            />
          </div>
        </div>
      </section>
      <section className="container">
        <symptomContext.Provider value={{data,addData}}>
          <SymptomSearch database={symptoms}/>
          <hr />
          <Specialisations onSpecializationSelect={handleSpecializationSelect}/>
        </symptomContext.Provider>
      </section>
      <section>
        <div className="container">
          {loading && <Loading />}
          {error && <Error />}
          {!loading && !error && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
              {filteredDoctors.map(doctor => (
                <DoctorCard key={doctor.id} doctor={doctor} />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}

export default Doctors;
