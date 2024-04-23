import {useState} from 'react'
import { useSymtomContext } from '../../context/SymptomContext';

const Specialisations = ({ onSpecializationSelect }) => {
  const [searchTerm, setSearchTerm] = useState({
    yearOfBirth: '',
    gender: '',
  })

  const handleSpecializationClick = (specializationName) => {
    console.log(specializationName)
    onSpecializationSelect(specializationName)
  }


  const fetchToken = async() => {
    const url = "https://authservice.priaid.ch/login";
    //apimedic.com
    try{
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          "Authorization" : "Bearer Wy4e9_GMAIL_COM_AUT:JRzk5q6r+r4EfLBxL1oO/A==",
        }
      })

      const result = await response.json();
      // console.log(result.Token);
      return result.Token;
    }catch(e){
      console.log("Error while fetching token => ", e);
    }
  }



  const [specialisations, setSpecialisations] = useState([]);

    const handleInputChange = (e) => {
      setSearchTerm({...searchTerm, [e.target.name]: e.target.value})
      // console.log(searchTerm.yearOfBirth);
    }

    const { data } = useSymtomContext();

    const callSpecialisations = async(searchTerm) => {
      try{

        // const token = await fetchToken();
        const token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6ImZlbnNlcmFqdWFsdEBnbWFpbC5jb20iLCJyb2xlIjoiVXNlciIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL3NpZCI6IjExMjIzIiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy92ZXJzaW9uIjoiMTA5IiwiaHR0cDovL2V4YW1wbGUub3JnL2NsYWltcy9saW1pdCI6IjEwMCIsImh0dHA6Ly9leGFtcGxlLm9yZy9jbGFpbXMvbWVtYmVyc2hpcCI6IkJhc2ljIiwiaHR0cDovL2V4YW1wbGUub3JnL2NsYWltcy9sYW5ndWFnZSI6ImVuLWdiIiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy9leHBpcmF0aW9uIjoiMjA5OS0xMi0zMSIsImh0dHA6Ly9leGFtcGxlLm9yZy9jbGFpbXMvbWVtYmVyc2hpcHN0YXJ0IjoiMjAyNC0wNC0yMyIsImlzcyI6Imh0dHBzOi8vYXV0aHNlcnZpY2UucHJpYWlkLmNoIiwiYXVkIjoiaHR0cHM6Ly9oZWFsdGhzZXJ2aWNlLnByaWFpZC5jaCIsImV4cCI6MTcxMzg1Nzk5MiwibmJmIjoxNzEzODUwNzkyfQ.aYQzYjji9bQ9SUW_7lz9xrYd5LWFFaYBu5Ka2AhAK_o"

        const url = `https://healthservice.priaid.ch/diagnosis/specialisations?token=${token}&symptoms=[${data}]&language=en-gb&gender=${searchTerm.gender}&year_of_birth=${searchTerm.yearOfBirth}`;
        console.log(url)
        const response = await fetch(url, {
          method: 'GET'
        });
        const result = await response.json();
        console.log(result);
        setSpecialisations(result);
      }catch(e){
        console.log("Error at fetching specialisations => ", e);
      }
    }

  

  return (<>
    <div className='mt-4 flex items-center justify-start'>
        <input type="text" 
        name='yearOfBirth'
        placeholder='Year of Birth'
        onChange={handleInputChange}
        value={searchTerm.yearOfBirth}
        className='px-4 py-3 border border-solid border-[#0066ff61] focus:outline-none focus:border-primaryColor text-[16px] leading-7 text-headingColor
        placeholder:text-textColor cursor-pointer rounded-md'
        required
        />

    <div className=' ml-4 px-2 py-1 border border-solid rounded-md border-[#0066ff61] focus:outline-none focus:border-primaryColor'>
      <label className='text-headingColor font-bold text-[16px] leadnig-7 ml-4'>
        Are you a: <select name='gender' 
        className='text-textColor font-semibold text-[15px] px-4 py-3 leading-7 focus:outline-none' 
        value={searchTerm.gender}
        onChange={handleInputChange}
        >
          <option value=''>Select</option>
          <option value='male'>Male</option>
          <option value='female'>Female</option>
        </select>
      </label>
    </div>

    <button className='btn mt-[1px] ml-4' onClick={()=> callSpecialisations(searchTerm)}>Find Specialisations</button>
    </div>
    <div>
    {Object.values(specialisations).map(el => 
    <button 
    className='btn mr-2 bg-pink-600' 
    key={el.ID}
    onClick={() => {
      handleSpecializationClick(el.Name)
      console.log(el)
    }
    }
    >
      {el.Name}
    </button>)}
    </div>
    </>
  )
}

export default Specialisations