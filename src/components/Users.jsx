import React from 'react'
import { useNavigate } from 'react-router-dom';
export default function Users({ firstName, lastName, email, id }) {
    const navigate = useNavigate();
    return (
        <div className="w-full mb-2 rounded overflow-hidden shadow-lg bg-white">
            <div className='flex  justify-center items-center'>
            <div class="w-16 h-16 flex items-center justify-center rounded-full bg-gray-200 overflow-hidden">
                <img class="w-full h-full object-cover" src={`https://ui-avatars.com/api/?name=${firstName}+${lastName}`} alt="User Profile" />
            </div>
            </div>
            
            <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2 text-center">{firstName} {lastName}</div>
                <p className="text-gray-700 text-base text-center">
                    Email: {email}
                </p>
                <button onClick={()=>{
                    navigate(`/user/${id}`)
                }}  className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full mt-2'>
                    View Profile
                </button>
            </div>
        </div>

    )
}
