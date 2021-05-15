import db from '../../../libs/db'
import authorization from '../../../middlewares/authorization'

export default async function handler(req, res) {
    if(req.method !== 'GET') return res.status(405).end()

    // Authorization header required
    const auth = await authorization(req, res)

    const posts = await db('posts')

    res.status(200);
    res.json({
        data: posts,
        message: 'Berhasil ambil data !'
    });
}