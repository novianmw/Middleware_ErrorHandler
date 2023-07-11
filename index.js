const express = require("express");
const morgan = require("morgan");
const app = express();

const ErrorHandler = require("./ErrorHandler")

app.use(morgan('dev')) // if use morgan middleware

// basic middleware
// app.use((req, res, next) => {
//     console.log("This is my first middleware")
//     next()
//     console.log("This is my first middleware after next")
// })
// app.use((req, res, next) => {
//     console.log("This is my second middleware")
//     next()
// })

// middleware for all route
app.use((req, res, next) => {
    // req.requestTime = Date.now()
    console.log(req.method, req.url)
    next()
})

// site route
app.get("/", (req, res) => {
    res.send("Hello World!")
})
app.get("/blog", (req, res) => {
    // console.log(`Request Date: ${req.requestTime}`)
    res.send("Hello Blog!")
})
app.use('/hello', (req, res) => {
    res.send("Hello...")
})
app.get('/general/error', (req, res) => {
    throw new ErrorHandler()
})


// const for middleware auth password
const auth = (req, res, next) => {
    const { password } = req.query
    if (password === 'chickennugget') {
        next()
    }
    // res.send("Masukkan PASSWORD (BELI CHIKEN NUGGET DULUUUUU)")
    throw new ErrorHandler('Masukkan PASSWORD (BELI CHIKEN NUGGET DULUUUUU)', 401)
}
// middleware for password in admin route (use const auth)
app.use('/admin', auth, (req, res) => {
    res.send("MANTAPPPPP, MAKAN NUGGET GIHHHHH")
})

// middleware error handling
app.use((err, req, res, next) => {
    const { status = 500, message = "something went wrong" } = err
    res.status(status).send(message)
})

// jika site route tidak ditemukan
app.use((req, res) => {
    res.status(404).send("404 SITE GA KETEMU WOY")
})

app.listen(3000, () => {
    console.log("Server is running on http://localhost:3000")
})