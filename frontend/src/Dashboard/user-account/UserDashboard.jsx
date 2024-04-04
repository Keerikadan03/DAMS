import userImg from '../../assets/images/doctor-img01.png'
import { useContext } from 'react'
import { authContext } from './../../context/AuthContext'

const UserDashboard = () => {

  const { dispatch } = useContext(authContext);
  const handleLogout = () => {
    dispatch({type: 'LOGOUT'})
  }

  return (
    <div className="max-w-[1170px] px-5 mx-auto">
      <div className="grid md:grid-cols-3 gap-10">
        <div className="pb-[50px] px-[30px] rounded-md">
          <div className="flex items-center justify-center">
            <figure className='w-[100px] h-[100px] rounded-full border-2 border-solid border-primaryColor'>
              <img src={userImg} alt="" className='w-full h-full rounded-full'/>
            </figure>
          </div>

          <div className='text-center mt-4'>
            <h3 className='text-[18px] leading-[30px] text-headingColor font-bold'>
              George Shajan
            </h3>
            <p className='text-textColor text-[15px] leading-6 font-medium'>
              george@example.com
            </p>
          </div>

          <div className='mt-[50px] md:mt-[100px]'>
            <button onClick={handleLogout} className='w-full bg-primaryColor p-3 text-white text-[16px] leading-7 rounded-md'>Logout</button>
            <button className='w-full bg-red-600 mt-4 p-3 text-white text-[16px] leading-7 rounded-md'>Delete Account</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserDashboard