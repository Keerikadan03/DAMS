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
          "Authorization" : "Bearer g2J7W_GMAIL_COM_AUT:U6HqXW6LjT+u8L4M6ZePAQ==",
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

        const token = await fetchToken();

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