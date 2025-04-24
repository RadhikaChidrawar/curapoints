// import React from 'react'
import CuraLogo from '../assets/CuraLogo.png'
const Footer = () => {
  return (
    <div className='md:mx-10'>
        <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm'>
            {/* left section */}
            <div>
                <img src={CuraLogo} alt="" className="w-14 h-auto cursor-pointer mb-5 " />
                <p className='w-full md:w-2/3 text-gray-600 leading-6'>
                    Cura is a trusted platform connecting you with over 100+ certified doctors.
                    Book your appointments quickly and easily with us to ensure your health and well-being.
                </p>
            </div>

            {/* center section */}
            <div>
                <p className='text-xl font-medium mb-5'>COMPANY</p>
                <ul className='flex flex-col gap-2 text-gray-600'>
                    <li>Home</li>
                    <li>About Us</li>
                    <li>Contact Us</li>
                    <li>Privacy Policy</li>
                </ul>
            </div>

            {/* right section */}
            <div>
                <p className='text-xl font-medium mb-5'>GET IN TOUCH</p>
                <ul className='flex flex-col gap-2 text-gray-600'>
                    <li>+91 9075877037</li>
                    <li>Curapoint11@gmail.com</li>
                </ul>
            </div>
        </div>

        {/* copyright */}
        <div>
            <hr />
            <p className='py-5 text-sm text-center'> © {new Date().getFullYear()} CuraPoint. Transforming healthcare with innovation. All Rights Reserved.</p>
        </div>
    </div>
  )
}

export default Footer