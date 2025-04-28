// import { useContext, useEffect } from 'react'
// import { AdminContext } from '../../context/AdminContext'

// const DoctorList = () => {
//   const {doctors, aToken, getAllDoctors, changeAvailability} = useContext(AdminContext)
//   useEffect (()=>{
//     if (aToken) {
//       getAllDoctors()
//     }
//   },[aToken])
//   return (
//     <div className='m-5 max-h-[90vh] overflow-y-scroll'>
//         <h1 className='text-lg font-medium'>All Doctors</h1>
//         <div className='w-full flex flex-wrap gap-4 pt-5 gap-y-6'>
//           {
//             doctors.map((item,index)=>(
//               <div className='border border-indigo-200 rounded-xl max-w-56 overflow-hidden cursor-pointer group' key={index}> 
//                 <img className='bg-indigo-50 group-hover:bg-primary transition-all duration-500' src={item.image} alt="" />
//                 <div className='p-4'>
//                   <p className='text-neutral-800 text-lg font-medium'>{item.name}</p>
//                   <p className='text-zinc-600 text-sm'>{item.speciality}</p>
//                   <div className='mt-2 flex items-center gap-1 text-sm'>
//                     <input onChange={() => changeAvailability(item._id)} type="checkbox" checked={item.available}/>
//                     <p>Available</p>
//                   </div>
//                 </div>
//               </div>
//             ))
//           }
//         </div>
//     </div>
//   )
// }

// export default DoctorList

import { useContext, useEffect, useState } from 'react'
import { AdminContext } from '../../context/AdminContext'
import { toast } from 'react-toastify'

const DoctorList = () => {
  const { doctors, aToken, getAllDoctors, changeAvailability, deleteDoctor } = useContext(AdminContext)
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    if (aToken) {
      getAllDoctors()
    }
  }, [aToken])

  const handleDelete = async (doctorId, doctorName) => {
    if (!window.confirm(`Are you sure you want to delete Dr. ${doctorName}?`)) {
      return
    }

    setIsDeleting(true)
    try {
      const response = await deleteDoctor(doctorId)
      if (response.success) {
        toast.success(`Dr. ${doctorName} deleted successfully`)
        getAllDoctors()
      } else {
        toast.error(response.message || 'Failed to delete doctor')
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message || 'Failed to delete doctor')
    } finally {
      setIsDeleting(false)
    }
  }

  return (
    <div className='m-5 max-h-[90vh] overflow-y-auto'>
      <h1 className='text-lg font-medium mb-4'>All Doctors</h1>
      {doctors.length === 0 ? (
        <p className='text-gray-500'>No doctors found</p>
      ) : (
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
          {doctors.map((doctor) => (
            <div 
              key={doctor._id}
              className='border border-indigo-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200 relative'
            >
              <button
                onClick={() => handleDelete(doctor._id, doctor.name)}
                disabled={isDeleting}
                className={`absolute top-2 right-2 p-1 rounded-full ${isDeleting ? 'bg-gray-400' : 'bg-red-500 hover:bg-red-600'} text-white transition-colors`}
                title="Delete doctor"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>

              <img 
                src={doctor.image || '/default-doctor.jpg'} 
                alt={doctor.name}
                className='w-full h-48 object-cover bg-gray-100'
                onError={(e) => {
                  e.target.src = '/default-doctor.jpg'
                }}
              />

              <div className='p-4'>
                <h3 className='text-lg font-semibold text-gray-800'>{doctor.name}</h3>
                <p className='text-sm text-gray-600 mb-2'>{doctor.speciality}</p>
                
                <div className='flex items-center'>
                  <input
                    type="checkbox"
                    id={`availability-${doctor._id}`}
                    checked={doctor.available}
                    onChange={() => changeAvailability(doctor._id)}
                    className='mr-2'
                  />
                  <label htmlFor={`availability-${doctor._id}`} className='text-sm text-gray-700'>
                    {doctor.available ? 'Available' : 'Not Available'}
                  </label>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default DoctorList
