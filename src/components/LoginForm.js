import React from 'react'
import {toast} from 'react-hot-toast'
import  Cookies from 'js-cookie'
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";


export default function LoginForm() {
    const navigate = useNavigate();

    function handleSubmit(event) {
        event.preventDefault()
        
        const { email, password } = event.target.elements
        const body = {
            email: email.value,
            password: password.value
        }
        fetch('http://localhost:3001/auth/authenticate', {
            method: 'POST',
            headers: {
               
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            
        
            body: JSON.stringify(body),
        }).then(response => {
            console.log(response)
            if(response.ok) {
                toast.success('Login successful!')
                console.log(response.headers)
                //set cookie
                Cookies.set('uniqueSessionID', response.headers.get('uniqueSessionID'))

                //redirect to dashboard

                
                navigate("/dashboard");


            }
            else {
                toast.error('Login failed!')
            }
        })
        .catch((error) => {
            toast.error('Server error!')
        })
    }


    return (
        <div className='flex justify-end'>
        <div className='1/3 pl-12 self-center'>
          <h1 className='text-5xl md:text-9xl r font-bold text-violet-800'>FeedFrenzy</h1>  
        </div>
        <div className='w-2/3'>
            
        <form onSubmit={handleSubmit} className="rounded-lg border bg-card text-card-foreground shadow-sm max-w-md mx-auto mt-10 bg-zinc-800 text-white" data-v0-t="card">
            <div className="flex flex-col space-y-1.5 p-6">
                <h3 className="font-semibold tracking-tight text-3xl text-center">Login</h3>
                <p className="text-muted-foreground text-lg text-center">Please enter your credentials to login.</p>
            </div>
            <div className="p-6 space-y-4">
                <div className="space-y-2">
                    <label className="font-normal peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-lg" htmlFor="email" >
                        Email Address
                    </label>
                    <input name='email' type="email" className="flex text-black h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50" id="email" placeholder="email@example.com" required />
                </div>
                <div className="space-y-2">
                    <label className="font-normal peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-lg" htmlFor="password">
                        Password
                    </label>
                    <input name='password' type="password" className=" text-black flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50" id="password" required />
                </div>
            </div>
            <div className="flex  justify-center p-2 w-50">
                <button className="flex  text-black items-center hover:bg-slate-200 bg-white rounded shadow-md justify-center rounded-md font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 w-full py-2 text-lg">
                    Login
                </button>
            </div>
            <div className='flex justify-center p-6'>
                <p className='text-s px-2'> Not registered?</p>
                <Link to="/register" className='text-s text-red-400 underline'> Create an account</Link>
               
            </div>

        </form>
        </div>
        </div>
    )
}
