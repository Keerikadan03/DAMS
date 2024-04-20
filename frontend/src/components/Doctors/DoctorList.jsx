import { useState, useEffect } from 'react';
import { BASE_URL, token } from '../../config';
import DoctorCard from './DoctorCard';
import Loading from '../Loader/Loading';
import Error from '../Error/Error';

const useFetchData = (url) => {
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(url, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                const result = await response.json();

                if (!response.ok) {
                    throw new Error(result.message);
                }

                setData(result.data);
            } catch (e) {
                console.log("error at fetching data hook is => ", e);
            }
        };

        fetchData();
    }, [url]);
    
    return { data };
};

const DoctorsList = () => {
    const { data: doctors, loading, error } = useFetchData(`${BASE_URL}/doctors`);

    // Sort doctors by averageRating in descending order
    const sortedDoctors = doctors.slice().sort((a, b) => b.averageRating - a.averageRating);

    return (
        <>
            {loading && <Loading />}
            {error && <Error errorMessage={error} />}
            {!loading && !error && (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 lg:gap-[30px] mt-[30px] lg:mt-[50px]">
                    {sortedDoctors.map(doctor => (
                        <DoctorCard key={doctor.id} doctor={doctor} />
                    ))}
                </div>
            )}
        </>
    );
};

export default DoctorsList;
