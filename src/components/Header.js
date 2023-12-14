import React, { useEffect } from 'react'
import { useState } from 'react'
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
export default function Header() {

    const navigate = useNavigate();


    const [userData, setUserData] = useState({
        "id": 1,
        "firstname": "",
        "lastname": "",
        "email": "",
        "created_at": "",
        "updated_at": ""
    });

    useEffect(() => {
        fetch('https://openapi-ncb5.onrender.com/user/profile', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',

            },
            credentials: 'include',
        }).then(response => {
            return response.json()

        }).then(data => {

            setUserData(data)
        })
    }, [])


    const handleDeleteAccount = () => {
        fetch('https://openapi-ncb5.onrender.com/user/deleteAccount', {
            method: 'DELETE',

            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
        }).then(response => {
            return response.json()

        }).then((data) => {

            toast.success("Deleted Account Successfully");
            navigate('/login');

        }).catch((err) => {
            toast.error("Error in deleting account");
        })
    }
    


    return (
        <header className="flex items-center justify-between p-4 bg-blue-500 text-white">
            <div className="flex items-center gap-3">
                <span className="relative flex shrink-0 overflow-hidden rounded-full h-9 w-9">
                    <span className="flex h-full w-full items-center justify-center rounded-full bg-muted">
                        UN
                    </span>
                </span>
                <div className="grid gap-0.5 text-xs">
                    <div className="font-medium">{userData.firstname + " " + userData.lastname}</div>
                    <div className="text-gray-200">{userData.email}</div>
                </div>
            </div>
            <div className="flex items-center gap-4">

                <button onClick={handleDeleteAccount} className="text-white hover:bg-red-600 border border-light-400 p-3 bg-red-700 rounded-lg" href="#">
                    Delete Account
                </button>
            </div>
        </header>
    )
}
