import db from '../../../libs/db'
import authorization from '../../../middlewares/authorization'

export default async function handler(req, res) {
    // Insert
    // db -> namaTabel

    if(req.method !== 'POST') return res.status(405).end() //Code 405 is method not allowed

    // Authorization header required
    const auth = await authorization(req, res)

    const { title, content } = req.body //Using restructuring

    const create = await db('posts').insert({
        title,
        content
    })

    const createdData = await db('posts').where('id', create)
    
    res.status(200)
    res.json({ 
        status: true,
        data: createdData,
        message: "status respond 200 OK." 
    })
}