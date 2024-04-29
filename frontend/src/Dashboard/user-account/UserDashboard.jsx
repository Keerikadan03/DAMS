import userimg from "../../assets/images/doctor-img01.png"
import { useContext,useState,useEffect } from "react"
import { authContext } from '../../context/AuthContext'
// import { getUserData } from "../../hooks/useFetchdata"
import { token } from "../../config"
import { BASE_URL } from "../../config"
import Bookings from "./Bookings"
import Profile from "./Profile"


const getUserData = (url) => {

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

const UserDashboard = () => {
  const { dispatch } = useContext(authContext);
  const [tab,setTab] = useState('bookings');
  const { data:userData} = getUserData(`${BASE_URL}/users/profile/me`)
  console.log('userdata => ',userData._id);
  const userId = userData._id;

  const handleLogout = () => {
    dispatch({type: 'LOGOUT'});
  }

  const handleUserDelete = async(userId) => {

    try{
      const res = await fetch(`${BASE_URL}/users/${userId}`, {
        method: 'delete',
        headers: {
          Authorization: `Bearer ${token}`
        }
      })

      const data = await res.json()
      console.log("data is => ", data)
      if(!res.ok){
        throw new Error(data.message)
      }

      dispatch({type: 'LOGOUT'})
    }catch(e){
      console.log("error at user delete => ", e)
    }
  }

  return (
    <div className="max-w-[1170px] px-5 mx-auto">
        <div className="grid md:grid-cols-3 gap-10">
          <div className="pb-[50px] px-[30px] rounded-md">
            <div className="flex items-center justify-center">
            <figure className="w-[100px] h-[100px] rounded-full border-2 border-solid border-primaryColor">
              <img src={userData.photo} alt=""  className="w-full h-full rounded-full"/>
            </figure>
            </div>

            <div className="text-center mt-4">
              <h3 className="text-[18px] leading-[30px] text-headingColor font-bold">{userData.name}</h3>
              <p className="text-textColor text-[15px] leading-6 font-medium">{userData.email}</p>
            </div>

            <div className="mt-[50px] md:mt-[100px]">
              <button onClick={handleLogout} className="w-full bg-primaryColor text-white p-3 text-[16px] leading-7 rounded-md">Logout</button>
              <button onClick={() => handleUserDelete(userId)}
              className="w-full bg-red-600 text-white mt-4 p-3 text-[16px] leading-7 rounded-md">Delete</button>
            </div>
          </div>

          <div className="md:col-span-2 md:px-[30px]">
            <div>
              <button onClick={() => setTab('bookings')} className={`${tab === 'bookings' && 'bg-primaryColor text-white font-normal'} p-2 mr-5 px-5 rounded-md text-headingColor font-semibold text-[16px] leading-7 border border-solid border-primaryColor`}>My Bookings</button>

              <button onClick={() => setTab('settings')} className={`${tab === 'settings' && 'bg-primaryColor text-white font-normal'} py-2 mr-5 px-5 rounded-md text-headingColor font-semibold text-[16px] leading-7 border border-solid border-primaryColor`}>Profile Settings</button>
            </div>

            {
              tab === 'bookings' && <Bookings />
            }
            {
              tab === 'settings' && <Profile user={userData}/>
            }
          </div>
        </div>
    </div>
  )
}

export default UserDashboard