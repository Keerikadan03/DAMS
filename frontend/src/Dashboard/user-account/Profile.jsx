import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import uploadImageToCloudinary from '../../utils/uploadCloudinary'
import { BASE_URL, token } from '../../config'
import { toast } from 'react-toastify'
import HashLoader from 'react-spinners/HashLoader'

const Profile = ({user}) => {
  const [selectedFile, setSelectedFile] = useState(null)
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'patient',
    photo: null,
  })

  const navigate = useNavigate()

  useEffect(()=> {
    console.log(user)
    setFormData({name: user.name, email: user.email,photo:user.photo})
  },[user])

  const handleInputChange = (e) => {
    setFormData({...formData,[e.target.name]:e.target.value})
  }

  const handleFileInputChange = async(e) => {
    //use cloudinary to upload image later
    const file = e.target.files[0]
    const data = await uploadImageToCloudinary(file)
    console.log(data.url)
    setSelectedFile(data.url)
    setFormData({...formData, photo:data.url})
  }

  const submitHandler = async(e) => {
    // console.log(formData)
    e.preventDefault();
    setLoading(true)

    try{
      const res = await fetch(`${BASE_URL}/users/${user._id}`, {
        method: 'put',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer: ${token}`
        },
        body: JSON.stringify(formData)
      })

      const { message } = await res.json()
      console.log("message is =>",message)

      if(!res.ok){
        throw new Error(message)
      }

      setLoading(false);
      toast.success(message)
      navigate('/users/profile/me')
    }catch(e){
      toast.error(e.message)
      setLoading(false)
      console.log("Error at signup is =>", e);
    }
  }

  return (
    <div className='mt-10'>
            <form action="" onSubmit={submitHandler}>
              <div className='mb-5'>
                <input 
                type="text" 
                placeholder='Full Name' 
                name='name'
                value={formData.name}
                onChange={handleInputChange}
                className='w-full pr-4 py-3 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-primaryColor text-[16px] leading-7 text-headingColor placeholder:text-textColor cursor-pointer' required
                />
              </div>
              
              <div className='mb-5'>
                <input 
                type="email" 
                placeholder='Email' 
                name='email'
                value={formData.email}
                onChange={handleInputChange}
                className='w-full pr-4 py-3 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-primaryColor text-[16px] leading-7 text-headingColor placeholder:text-textColor cursor-pointer' 
                aria-readonly
                readOnly
                />
              </div>

              <div className='mb-5'>
                <input 
                type="password" 
                placeholder='Password' 
                name='password'
                value={formData.password}
                onChange={handleInputChange}
                className='w-full pr-4 py-3 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-primaryColor text-[16px] leading-7 text-headingColor placeholder:text-textColor cursor-pointer'
                />
              </div>

              <div className='mb-5 flex items-center gap-3'>
                {formData.photo && <figure className='w-[60px] h-[60px] rounded-full border-2 border-solid border-primaryColor flex items-center justify-center'>
                  <img src={formData.photo} alt="" className='w-full rounded-full'/>
                </figure>}
                <div className='relative w-[130px] h-[50px]'>
                  <input
                  type="file"
                  name='photo'
                  id='customFile'
                  onChange={handleFileInputChange}
                  accept='.jpg,.png'
                  className='absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer'
                  />
                  <label htmlFor="customFile" className='absolute top-0 left-0 h-full w-full flex items-center px-[0.75rem] py-[0.375rem] text-[15px] leading-6 overflow-hidden bg-[#0066ff46] text-headingColor cursor-pointer font-semibold rounded-lg truncate'>
                    {selectedFile?selectedFile.name : 'Upload Photo'}
                  </label>
                </div>
              </div>

              <div className='mt-7'>
                <button 
                disabled={loading && true} 
                type='submit' 
                className='w-full btn rounded-lg'>
                  {loading? <HashLoader size={25} color='#ffffff'/>: 'Update'}
                </button>
              </div>
            </form>
    </div>
  )
}

export default Profile