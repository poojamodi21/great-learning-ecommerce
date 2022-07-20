const mongoose = require('mongoose')
const User = mongoose.model("Users")
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { JWT_KEY } = require('../keys')

const register = (req, res) => {
    const { name, password } = req.body
    if (!name || !password) {
        return res.status(422).json({ error: "please add all the fields" })
    }
    User.findOne({ name: name })
        .then((savedUser) => {
            if (savedUser) {
                return res.status(422).json({ error: "user already exists" })
            }
            bcrypt.hash(password, 12)
                .then(hashedpassword => {
                    const user = new User({
                        name,
                        password: hashedpassword,
                    })
                    user.save()
                        .then(user => {
                            res.json({ message: "saved successfully" })
                        })
                        .catch(error => {
                            console.log(error)
                        })
                })
        })
        .catch(error => {
            console.log(error)
        })
}

const login = async (req, res) => {
    const { name, password } = req.body
    if (!name || !password) {
        return res.status(422).json({ error: "Please enter Name and Password" })
    }
    const savedUser = await User.findOne({ name: name })
    if (!savedUser) {
        return res.status(422).json({ error: "Invalid name or Password" })
    }
    const isValidPassword = await bcrypt.compare(password, savedUser.password)
    if (!isValidPassword) {
        return res.status(422).json({ error: "Invalid name or Password" })
    }
    const token = jwt.sign({ id: savedUser._id }, JWT_KEY)
    res.json({ token: token })
}
const allUsers = async (req, res) => {
    try {
        if (!req.user.isAdmin) return res.status(401).json({ error: "You must be admin" })
        const users = await User.find({})
        res.json(users)

    }
    catch (error) {
        console.log(error)
    }
}

const deleteUser = async (req, res) => {
    const { id } = req.params
    try {
        if (!req.user.isAdmin) return res.status(401).json({ error: "You must be admin" })
        const user = await User.findById(id)
        if (!user) return res.status(404).json({ error: "User not found" })
        await User.findByIdAndDelete(id).exec((error, result) => {
            if (error) {
                return res.status(422).json({ error: error })
            }
            else {
                res.json({ message: "User deleted successfully" })
            }
        }
        )
    }
    catch (error) {
        console.log(error)
    }
}
const convertAdmin = async (req, res) => {
    const { id } = req.params
    const { name} = req.body
    try {
        if (!req.user.isAdmin) return res.status(401).json({ error: "You must be admin" })
        const user = await User.findByIdAndUpdate(id, { name,isAdmin }, { new: true })
        if (!user) return res.status(404).json({ error: "User not found" })
        res.json({ message: "User updated successfully" })
    }
    catch (error) {
        console.log(error)
    }
}
const updateUser = async (req, res) => {
    const { id } = req.params
    const { name, password } = req.body
    try {
        const user = await User.findByIdAndUpdate(id, { name, password }, { new: true })
        if (!user) return res.status(404).json({ error: "User not found" })
        res.json({ message: "User updated successfully" })
    }
    catch (error) {
        console.log(error)
    }
}





module.exports = {
    register,
    login,
    allUsers,
    deleteUser,
    convertAdmin,
    updateUser
}
