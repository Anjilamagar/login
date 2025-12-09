import user from "../models/user.js"


export const createuser = async (req, res) => {

    try {
        const email = req.body.email
        const password = req.body.password
        const fullname = req.body.fullname
        const result = await user.create({
            email: email,
            phone: "9845689988",
            password: password,
            fullname: fullname
        })
        res.json({
            message: "user created",
            data: result
        })
    } catch (error) {
        console.log("error occured to create", error.message);
        res.status(400).json({
            message: "Failed to create",
            error: error.message
        })
    }
}



export const finduser = async (req, res) => {
    try {
        const result = await user.find()
        res.status(200).json({
            message: "user found successful",
            user: result
        })


    } catch (error) {
        console.log("error occured to create", error.message);
        res.status(400).json({
            message: "Failed to find",
            error: error.message
        })


    }



}