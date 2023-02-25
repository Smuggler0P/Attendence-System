const express = require("express")

const mongoose = require("mongoose")
const app = express()

const attendanceRouter = require("./routes/attendance")

mongoose.connect("mongodb://localhost/attendance", { useNewUrlParser: true })

app.set("view engine", "ejs")

app.use(express.static("static"))
app.use(express.urlencoded({ extended: false}))

app.use("/attendance", attendanceRouter)

const Attendance = require("./models/attendance")
const Data = require("./models/data")

app.get("/", async (req, res) => {
    const data = await Data.find().sort({ date: "desc"})
    res.render("index.ejs", { data : data })
})

app.listen(80)