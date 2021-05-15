import React, { useState } from 'react'
import { authPage } from '../../middlewares/authorizationPage'
import Router from 'next/router'

export async function getServerSideProps(context) {
    const { token } = await authPage(context)
    console.log('token', token)

    return {
        props: {
            token
        }
    }
}

export default function PostCreate(props) {
    const [fields, setField] = useState({
        title: '',
        content: ''
    })

    const [status, setStatus] = useState('normal')

    async function createHandler(e) {
        e.preventDefault()

        setStatus('loading')

        const { token } = props

        const create = await fetch('/api/post/create', {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(fields)
        })

        if(!create.ok) return setStatus('Error')

        const res = await create.json()

        setStatus('Success')

        Router.push('/post')
    }

    function fieldHandler(e) {
        const name = e.target.getAttribute('name')

        console.log(name, e.target.value)
        setField({
            ...fields,
            [name]: e.target.value
        })
    }

    return(
        <div>
            <h1>Create Post</h1>

            <form onSubmit={createHandler.bind(this)}>
                <input 
                    onChange={fieldHandler.bind(this)}
                    type="text" 
                    name="title" 
                    placeholder="Title"
                />
                <br />
                <textarea
                    onChange={fieldHandler.bind(this)}
                    type="text" 
                    name="content" 
                    placeholder="Content"
                ></textarea>
                <br />

                <button type="submit">
                    Create Post
                </button>
                <div>{`Outpout: ${status}`}</div>
            </form>
        </div>
    )
}