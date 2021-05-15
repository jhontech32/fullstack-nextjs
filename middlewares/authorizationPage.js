import cookies from 'next-cookies'

export function unauthPage(context) {
    return new Promise (resolve => {
        const allCookies = cookies(context)

        if(allCookies.token)
        return context.res.writeHead(302, {
            Location: '/post'
        }).end()

        return resolve('Unauthorized !')
    })
}

export function authPage(context) {
    return new Promise(resolve => {
        const allCookies = cookies(context)

        // jika tidak login arahkan ke login page
        if(!allCookies.token)
        return context.res.writeHead(302, {
            Location: '/auth/login'
        }).end()

        // jika sudah login maka berikan token nya
        return resolve({
            token: allCookies.token
        })
    })
}