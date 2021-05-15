import db from '../../../libs/db'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken' //synchronus function without wait

export default async function handler(req, res) {
    if(req.method !== 'POST') return res.status(405).end()

    const { email, password } = req.body

    const checkUser = await db('users').where({ email }).first()
    console.log('checkuser', checkUser)

    if(!checkUser) return res.status(401).end() //unauthorized 401

    const checkPassword = await bcrypt.compare(password, checkUser.password)

    if(!checkPassword) return res.status(401).end() //unauthorized

    const token = jwt.sign({
        id: checkUser.id,
        email: checkUser.email
    }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRED
    })

    res.status(200)
    res.json({
        success: true,
        data: { token },
        message: "Berhasil login !"
    })
}