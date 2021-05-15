import db from '../../../libs/db'
import bcrypt from 'bcryptjs'

export default async function handler(req, res) {
    if(req.method !== 'POST') return res.status(405).end()

    const { email, password } = req.body

    const salt = bcrypt.genSaltSync(10) //random string long 10 is default
    const passwordHash = bcrypt.hashSync(password, salt) //string password + salt -> combine
    
    const register = await db('users').insert({
        email,
        password: passwordHash
    })

    const alreadyRegistered = await db('users').where({ id: register }).first()

    res.status(200)
    res.json({
        success: true,
        data: alreadyRegistered,
        message: "Berhasil register !"
    })
}