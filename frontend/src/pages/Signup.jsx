import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import avatar from '../assets/images/doctor-img01.png'
import signUpImage from '../assets/images/signup.gif'
import uploadImageToCloudinary from '../utils/uploadCloudinary'
import { BASE_URL } from '../config'
import { toast } from 'react-toastify'
import HashLoader from 'react-spinners/HashLoader'

const Signup = () => {

  const [selectedFile, setSelectedFile] = useState(null)
  const [previewURL, setPreviewURL] = useState('')
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'patient',
    gender: '',
    photo: selectedFile,
  })

  const [strength,setStrength] = useState("");

  const evaluatePasswordStrength = (password) => {
    
    let score = 0;

    if(!password)return "";
    if(password.length > 8)score+=1;  

    if(/[a-z]/.test(password))score+=1;

    if(/[A-Z]/.test(password))score+=1;

    if(/\d/.test(password))score+=1;

    if(/[^A-Za-z0-9]/.test(password))score+=1;
    console.log(score)

    switch(score){
      case 0:
      case 1:
      case 2:
        return "Weak";
      case 3:
        return "Medium";
      case 4:
      case 5:
        return "Strong";
    }
  }

  const navigate = useNavigate()

  const handleInputChange = (e) => {
    setFormData({...formData,[e.target.name]:e.target.value})
  }

  const handleFileInputChange = async(e) => {
    //use cloudinary to upload image later
    const file = e.target.files[0]
    const data = await uploadImageToCloudinary(file)
    console.log(data.url)
    setPreviewURL(data.url)
    setSelectedFile(data.url)
    setFormData({...formData, photo:data.url})
  }

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
  
    try {
       // Check password streng th
      if (strength !== 'Strong') {
        throw new Error('Use a stronger password');
      }

      const res = await fetch(`${BASE_URL}/auth/register`, {
        method: 'post',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
  
      const { message } = await res.json();
  
      if (!res.ok) {
        throw new Error(message);
      }
  
      toast.success(message);
      navigate('/login');
    } catch (e) {
      toast.error(e.message);
      console.log("Error at signup is =>", e);
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <section className='px-5 xl:px-0'>
      <div className='max-w-[1170px] mx-auto '>
        <div className='grid grid-cols-1 lg:grid-cols-2'>

          <div>
            <div className='hidden lg:block bg-primaryColor rounded-l-lg'>
              <figure className='rounded-l-lg'>
                <img src={signUpImage} alt="img" className='w-full rounded-l-lg'/>
              </figure>
            </div>
          </div>

          <div className='rounded-l-lg lg:pl-16 py-10'>
            <h3 className='text-headingColor text-[22px] leading-9 font-bold mb-10'>
              Create an<span className='text-primaryColor '> account</span>
            </h3>
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
                className='w-full pr-4 py-3 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-primaryColor text-[16px] leading-7 text-headingColor placeholder:text-textColor cursor-pointer' required
                />
              </div>

              <div className='mb-5'>
                <input 
                type="password" 
                placeholder='Password' 
                name='password'
                value={formData.password}
                onChange={(e) => {
                  handleInputChange(e);
                  setStrength(evaluatePasswordStrength(e.target.value))
                }}
                className='w-full pr-4 py-3 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-primaryColor text-[16px] leading-7 text-headingColor placeholder:text-textColor cursor-pointer' required
                />
                <small className={strength === 'Weak' ? 'text-red-600' :
                                strength === 'Medium' ? 'text-orange-500' : 
                                strength === 'Strong' && 'text-green-500'}>
                               { strength && `Password strength: ${strength}`}
                </small>

              </div>

              <div className='mb-4 flex items-center justify-between'>
                <label className='text-headingColor font-bold text-[16px] leadnig-7'>
                  Are you a: <select name='role' 
                  className='text-textColor font-semibold text-[15px] px-4 py-3 leading-7 focus:outline-none' 
                  value={formData.role}
                  onChange={handleInputChange}
                  >
                    <option value='patient'>Patient</option>
                    <option value='doctor'>Doctor</option>
                  </select>
                </label>

                <label className='text-headingColor font-bold text-[16px] leadnig-7'>
                  Are you a: <select name='gender' 
                  className='text-textColor font-semibold text-[15px] px-4 py-3 leading-7 focus:outline-none' 
                  value={formData.gender}
                  onChange={handleInputChange}
                  >
                    <option value=''>Select</option>
                    <option value='male'>Male</option>
                    <option value='female'>Female</option>
                  </select>
                </label>
              </div>

              <div className='mb-5 flex items-center gap-3'>
                {selectedFile && <figure className='w-[60px] h-[60px] rounded-full border-2 border-solid border-primaryColor flex items-center justify-center'>
                  <img src={previewURL} alt="" className='w-full rounded-full'/>
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
                  <label htmlFor="customFile" className='absolute top-0 left-0 h-full w-full flex items-center px-[0.75rem] py-[0.375rem] text-[15px] leading-6 overflow-hidden bg-[#0066ff46] text-headingColor cursor-pointer font-semibold rounded-lg truncate'>Upload Photo</label>
                </div>
              </div>

              <div className='mt-7'>
                <button 
                disabled={loading && true} 
                type='submit' 
                className='w-full btn rounded-lg'
                onClick={submitHandler}
                >
                  {loading? <HashLoader size={35} color='#ffffff'/>: 'Sign Up'}
                </button>
              </div>
              <p className=' mt-5 text-center text-textColor'>Already have an account?
                <Link to='/login' className='text-primaryColor font-medium ml-1'>Login</Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Signup