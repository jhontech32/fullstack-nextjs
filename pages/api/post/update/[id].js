import db from '../../../../libs/db'
import authorization from '../../../../middlewares/authorization'

export default async function handler(req, res) {
    // console.log('query', req.query) // query

    if(req.method !== 'PUT') return res.status(405).end()

    // Authorization header required
    const auth = await authorization(req, res)

    const { id } = req.query
    const { title, content } = req.body

    const update = await db('posts').where({ id }).update({
        title,
        content
    })

    const updatedData = await db('posts').where({ id })

    res.status(200)
    res.json({
        success: true,
        data: updatedData,
        message: 'Berhasil update postingan !'
    })
}