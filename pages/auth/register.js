import React, { useState } from 'react'
import Link from 'next/link'
import { unauthPage } from '../../middlewares/authorizationPage'

//Get server side rendering
export async function getServerSideProps(context) {
    await unauthPage(context)

    return { props: {} }
}

export default function Register() {
    const [fields, setFields] = useState({
        email: '',
        password: ''
    })

    const [status, setStatus] = useState('normal')

    async function registerHandler(e) {
        e.preventDefault() // mencegah event tersebut melakukan nilai default
        // dikarenakan form memiliki event default / load

        setStatus('loading')
        
        const registeredReq = await fetch('/api/auth/register', {
            method: 'POST',
            body: JSON.stringify(fields),
            headers: {
                'Content-Type': 'application/json'
            }
        })

        if(!registeredReq.ok) return setStatus('error' + registeredReq.status)

        const registeredRespond = await registeredReq.json()

        setStatus('success')
        console.log('registeredRespond', registeredRespond)

    }

    function fieldHandler(e) {
        const name = e.target.getAttribute('name')

        setFields({
            ...fields, //spread
            [name]: e.target.value
        })
    }

    return(
        <div>
            <h1>Register :</h1>

            <form onSubmit={registerHandler.bind(this)}>
                <input 
                    onChange={fieldHandler.bind(this)}
                    name="email"
                    type="text" 
                    placeholder="Email" 
                /><br />
                <input 
                    onChange={fieldHandler.bind(this)}
                    name="password"
                    type="password" 
                    placeholder="Password" 
                /><br />
                <button type="submit">
                    Register
                </button>
                <div>{`Output: ${status}`}</div>
            </form>

            <Link href="/auth/login"><a>Login</a></Link>
        </div>
    )
}