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

import { useContext, useEffect } from 'react'
import { AdminContext } from '../../context/AdminContext'
import { toast } from 'react-toastify'

const DoctorList = () => {
  const { doctors, aToken, getAllDoctors, changeAvailability, deleteDoctor } = useContext(AdminContext)
  
  useEffect(() => {
    if (aToken) {
      getAllDoctors()
    }
  }, [aToken])

  const handleDelete = async (doctorId) => {
    if (window.confirm('Are you sure you want to delete this doctor?')) {
      try {
        await deleteDoctor(doctorId)
        toast.success('Doctor deleted successfully')
        getAllDoctors() // Refresh the list after deletion
      } catch (error) {
        toast.error(error.message || 'Failed to delete doctor')
      }
    }
  }

  return (
    <div className='m-5 max-h-[90vh] overflow-y-scroll'>
      <h1 className='text-lg font-medium'>All Doctors</h1>
      <div className='w-full flex flex-wrap gap-4 pt-5 gap-y-6'>
        {doctors.map((item, index) => (
          <div className='border border-indigo-200 rounded-xl max-w-56 overflow-hidden cursor-pointer group relative' key={index}>
            {/* Delete button */}
            <button 
              onClick={() => handleDelete(item._id)}
              className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600 transition-colors"
              title="Delete doctor"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
            
            <img className='bg-indigo-50 group-hover:bg-primary transition-all duration-500 w-full h-40 object-cover' src={item.image} alt={item.name} />
            <div className='p-4'>
              <p className='text-neutral-800 text-lg font-medium'>{item.name}</p>
              <p className='text-zinc-600 text-sm'>{item.speciality}</p>
              <div className='mt-2 flex items-center gap-1 text-sm'>
                <input 
                  onChange={() => changeAvailability(item._id)} 
                  type="checkbox" 
                  checked={item.available}
                  id={`availability-${item._id}`}
                />
                <label htmlFor={`availability-${item._id}`}>Available</label>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default DoctorList
