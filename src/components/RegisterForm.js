import React from 'react'
import toast from 'react-hot-toast'

export default function RegisterForm() {

    const handleSubmit = (event) => {
        event.preventDefault()
       const { firstName, lastName, email, password } = event.target.elements
        const body = {
            email: email.value,
            password: password.value,
            firstname: firstName.value,
            lastname: lastName.value

        }
        fetch('http://localhost:3001/user/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify(body),
        }).then(response => {
            console.log(response)
            if (response.ok) {
                toast.success('Registration successful!')
            }
            else {
                toast.error('Registration failed!')
            }
        })
            .catch((error) => {
                toast.error('Server error!')
            })
    }

    return (
        <form onSubmit={handleSubmit} className="rounded-lg border bg-card text-card-foreground shadow-sm max-w-md mx-auto mt-10" data-v0-t="card">
            <div className="flex flex-col space-y-1.5 p-6">
                <h3 className="font-semibold tracking-tight text-3xl text-center">Register</h3>
                <p className="text-muted-foreground text-lg text-center">Please enter your credentials to login.</p>
            </div>
            <div className="p-6 space-y-4">\
                <div className="space-y-2">
                    <label className="font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-lg" htmlFor="email">
                        FirstName
                    </label>
                    <input type="text" className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50" id="firstName" placeholder="john" required />
                </div>
                <div className="space-y-2">
                    <label className="font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-lg" htmlFor="email">
                        LastName
                    </label>
                    <input type="text" className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50" id="lastName" placeholder="doe" required />
                </div>
                <div className="space-y-2">
                    <label className="font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-lg" htmlFor="email">
                        Email Address
                    </label>
                    <input type="email" className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50" id="email" placeholder="email@example.com" required />
                </div>
                <div className="space-y-2">
                    <label className="font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-lg" htmlFor="password">
                        Password
                    </label>
                    <input type="password" className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50" id="password" required />
                </div>
            </div>
            <div className="flex items-center p-6">
                <button type="submit" className="inline-flex items-center justify-center rounded-md font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 w-full py-2 text-lg">
                    Create Account
                </button>
            </div>
        </form>

    )
}
