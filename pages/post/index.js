import React, { useState } from 'react'
import Router from 'next/router'
import { authPage } from '../../middlewares/authorizationPage'

import Nav from '../../components/Nav'

export async function getServerSideProps(context){
    const { token } = await authPage(context)
    console.log('token', token)

    const postRequest = await fetch('http://localhost:3000/api/post', {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })

    const post = await postRequest.json()

    console.log('post', post)

    return { 
        props: { 
            token, 
            post: post.data 
        }
    }
}

export default function PostIndex(props) {
    console.log('props post index', props.post)
    const [posted, setPosted] = useState(props.post)

    console.log('props post xxxxxxxxx =>', posted)

    async function deleteHandler(id, e) {
        e.preventDefault()

        const { token } = props

        const asking = confirm(`Apakah data ${id} ini akan dihapus ?`)

        if(asking) {
            const postFiltered = posted.filter(filtered => {
                return filtered.id !== id && posted
            })

            setPosted(postFiltered)
        }
    }

    function editHandler(id) {
        Router.push(`/post/edit/${id}`)
    }

    return(
        <div>
            <h1>This is PostIndex</h1>
            <Nav />

            {
                posted.map((item) => (
                    <div key={item.id}>
                        <h3>{`${item.title}`}</h3>
                        <p>{item.content}</p>

                        <div>
                            <button onClick={editHandler.bind(this, item.id)}>Edit</button>
                            <button onClick={deleteHandler.bind(this, item.id)}>
                                Delete
                            </button>
                        </div>
                        <hr />
                    </div>
                ))
            }
        </div>
    )
}