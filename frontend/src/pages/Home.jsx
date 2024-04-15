import React from 'react'
import { BsArrowRight } from 'react-icons/bs'
import { Link } from 'react-router-dom'
import faqImg from '../assets/images/faq-img.png'
import featureImg from '../assets/images/feature-img.png'
import heroImg01 from '../assets/images/hero-img01.png'
import heroImg02 from '../assets/images/hero-img02.png'
import heroImg03 from '../assets/images/hero-img03.png'
import icon01 from '../assets/images/icon01.png'
import icon02 from '../assets/images/icon02.png'
import icon03 from '../assets/images/icon03.png'
import About from '../components/About/About'
import DoctorsList from '../components/Doctors/DoctorList'
import FaqList from '../components/Faq/FaqList'
import ServiceList from '../components/Services/ServiceList'

const Home = () => {
  return (
    <>
      <section className='hero_section pt-[60px] 3xl:h-[800px]'>
        <div className='container'>
          <div className='flex flex-col lg:flex-row gap-[90px] items-center justify-between'>
            {/* == hero content == */}

            <div>
              <div className='lg:w-[570px]'>
                <h1 className='text-[36px] leading-[46px] text-headingColor font-[800] md:text-[60px] md:leading-[70px] '>
                  We help patients live a healthy, longer life
                </h1>
                <p className='text_para'>
                  Lorem ipsum dolor sit, amet consectetur adipisicing elit. Magnam natus sed quos nostrum pariatur. Velit laboriosam nisi veritatis animi nam, ullam odit nulla nihil nesciunt possimus id beatae, obcaecati nostrum.
                </p>

                <button className='btn'>
                  Request an Appointment
                </button>
              </div>
              
              {/* HERO COUNTER */}

              <div className='mt-[30px] lg:mt-[70px] flex flex-col lg:flex-row lg:items-center gap-5 lg:gap-[30px]'>
                <div>
                  <h2 className='text-[36px] leading-[56px] lg:text-[44px] lg:leading-[54px] font-[700] text-headingColor'>
                    30+
                  </h2>
                  {/* yellow line */}
                  <span className='w-[100px] h-2 bg-yellowColor rounded-full block mt-[-14px]'></span>
                  <p className='text_para'>Years of Experience</p>
                </div> 

                <div>
                  <h2 className='text-[36px] leading-[56px] lg:text-[44px] lg:leading-[54px] font-[700] text-headingColor'>
                    10+
                  </h2>
                  {/* yellow line */}
                  <span className='w-[100px] h-2 bg-purpleColor rounded-full block mt-[-14px]'></span>
                  <p className='text_para'>Hospitals</p>
                </div>  

                <div>
                  <h2 className='text-[36px] leading-[56px] lg:text-[44px] lg:leading-[54px] font-[700] text-headingColor'>
                    100%
                  </h2>
                  {/* yellow line */}
                  <span className='w-[100px] h-2 bg-irisBlueColor rounded-full block mt-[-14px]'></span>
                  <p className='text_para'>Patient Satisfaction</p>
                </div>  
              </div>
              
            </div>

            <div className='flex gap-[30px] justify-end'>
              <div>
                <img src={heroImg01} alt="img" className='w-full' />
              </div>
              <div className='mt-[30px]'>
                <img src={heroImg02} alt="img" className='w-full mb-[30px]'/>
                <img src={heroImg03} alt="img" className='w-full'/>
              </div>
            </div>
          </div>
        </div>

      </section>

      {/* == hero section end == */}
      <section>
        <div className="container">
          <div className='lg:w-[470px] mx-auto'>
            <h2 className='heading text-center'>
              Providing the best medical services
            </h2>
            <p className='text_para text-center'>
              World-class care for everyone. Our health systems offer unmatched, expert health care.
            </p>
          </div>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-[30px] mt-[30px] lg:mt-[55px]'>
          {/* == 1 == */}
          <div className='py-[30px] px-5'>

            <div className='flex items-center justify-center'>
              <img src={icon01} alt="" />
            </div>

            <div className='mt-[30px]'>
              <h2 className='text-[26px] leading-9 text-headingColor font-[700] text-center'>Find A Doctor</h2>
              <p className='text-[16px] leading-7 text-textColor font-[400] mt-4 text-center'>World-class care for everyone. Our health systems offer unmatched, expert health care. From the lab to the clinic.</p>

              <Link to='/doctors' className='w-[44px] h-[44px] rounded-full border border-solid border-[#181A1E] mt-[30px] mx-auto flex items-center justify-center group hover:bg-primaryColor hover:border-none'>
                <BsArrowRight className='group-hover:text-white w-6 h-5' />
              </Link>

            </div>
          </div>

          {/* == 2 == */}

          <div className='py-[30px] px-5'>

            <div className='flex items-center justify-center'>
              <img src={icon02} alt="" />
            </div>

            <div className='mt-[30px]'>
              <h2 className='text-[26px] leading-9 text-headingColor font-[700] text-center'>Find A Location</h2>
              <p className='text-[16px] leading-7 text-textColor font-[400] mt-4 text-center'>World-class care for everyone. Our health systems offer unmatched, expert health care. From the lab to the clinic.</p>

              <Link to='/doctors' className='w-[44px] h-[44px] rounded-full border border-solid border-[#181A1E] mt-[30px] mx-auto flex items-center justify-center group hover:bg-primaryColor hover:border-none'>
                <BsArrowRight className='group-hover:text-white w-6 h-5' />
              </Link>

            </div>
          </div>

          {/* == 3 == */}

          <div className='py-[30px] px-5'>

          <div className='flex items-center justify-center'>
            <img src={icon03} alt="" />
          </div>

          <div className='mt-[30px]'>
            <h2 className='text-[26px] leading-9 text-headingColor font-[700] text-center'>Book Appointment</h2>
            <p className='text-[16px] leading-7 text-textColor font-[400] mt-4 text-center'>World-class care for everyone. Our health systems offer unmatched, expert health care. From the lab to the clinic.</p>

            <Link to='/doctors' className='w-[44px] h-[44px] rounded-full border border-solid border-[#181A1E] mt-[30px] mx-auto flex items-center justify-center group hover:bg-primaryColor hover:border-none'>
              <BsArrowRight className='group-hover:text-white w-6 h-5' />
            </Link>

          </div>
          </div>
        </div>

      </section>

      {/* == services section == */}

      <section>
        <div className="container">
          <div className='xl:w-[470px] mx-auto'>
            <h2 className='heading text-center'>Our medical services</h2>
            <p className='text_para text-center'>World-class care for everyone. Our health systems offer unmatched, expert health care.</p>
          </div>
          
          <ServiceList />
        </div>
      </section>

      {/* == feature section ==  */}

      <section>
        <div className="container">
          <div className="flex items-center justify-between flex-col lg:flex-row">
            <div className='xl:w-670px'>
              <h2 className="heading">Get virtual treatment <br /> anytime.</h2>
              <ul className="pl-6">
                <li className="text_para">1. Schedule the appointment directly.</li>
                <li className="text_para">2. Search for your physician here, and contact their office.</li>
                <li className="text_para">3. View our physicians who are accepting new patients, use online scheduling tool to select an appointment time.</li>
              </ul>
              <Link to={'/'}><button className='btn'>Learn More</button></Link>
            </div>

            {/* == feature image == */}
            <div className='relative z-10 xl:w-[770px] flex justify-end mt-[50px] lg:mt-0'>
              <img src={featureImg} alt="img"  className='w-3/4'/>
            </div>
          </div>
        </div>
      </section>
    </>
    )
}

export default Home