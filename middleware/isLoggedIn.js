import jwt from 'jsonwebtoken'

export const isLoggedIn = async (req, res, next) => {
    try {
        // console.log(req.headers.authorization);
        // console.log(req.cookies)

        const token = req.cookies.authToken
        if (!token) {
            return res.status(401).json({
                message: "login required"
            })
        }
        const decoded = await jwt.verify(token, 'thisissecretpassword')
        req.user = decoded

        next()

        // return res.send(decoded)

    } catch (error) {
        res.status(402).json({
            message: "Error ccured in middleware of isloggedIn.",
            error: error.message
        })

    }
}