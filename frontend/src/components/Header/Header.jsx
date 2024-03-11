import { useEffect, useRef } from 'react'
import {NavLink, Link} from 'react-router-dom'
import logo from '../../assets/images/logo.png'
import userImg from '../../assets/images/avatar-icon.png';

const navLinks = [
  {
    path: '/home',
    display: 'Home'
  },
  {
    path: '/doctors',
    display: 'Find A Doctor'
  },
  {
    path: '/services',
    display: 'Services'
  },
  {
    path: '/contact',
    display: 'Contact'
  },
]

const Header = () => {
  return (
    <header className='header flex items-center'>
      <div className="container">
        <div className='flex items-center justify-between'>


          {/* LOGO */}
          <div>
            <img
              src={logo}
              alt="logo"
            />
          </div>


          {/* MENU */}
          <div className="navigation">
            <ul className="menu flex items-center gap-[2.7rem]">
              {
                navLinks.map((link, index) => 
                  <li key={index}>
                    <NavLink to={link.path} className={navClass => navClass.isActive?'text-primaryColor text-[16px] leading-7 font-[600]': 
                    'text-textColor text-[16px] leading-7 font-[600] hover:text-primaryColor'
                  }>
                    {link.display}
                  </NavLink>
                  </li>
                )
              }
            </ul>
          </div>

          {/* NAV-RIGHT */}
          <div className='flex items-center gap-4'>
              <div>
                <Link to='/'>
                  <figure className='w-[35px] h-[35px] rounded-full'>
                    <img src={userImg} className='w-full rounded-full' alt="avatar"/>
                  </figure>
                </Link>
              </div>
          </div>

          <Link to='/login'>
            <button>Login</button>
          </Link>
        </div>
      </div>
    </header>
    )
}

export default Header