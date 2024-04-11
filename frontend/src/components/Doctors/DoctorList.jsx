import React from 'react';

import { doctors } from '../../assets/data/doctors';
import DoctorCard from './DoctorCard';
import { BASE_URL } from '../../config';
import Loading from '../Loader/Loading';
import Error from '../Error/Error';


const DoctorsList = () => {
    return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 lg:gap-[30px] mt-[30px] lg:mt-[50px]">
        {doctors.map(doctors=> (<DoctorCard key={doctors.id} doctor={doctors}/>))}</div>
    )
}

export default DoctorsList