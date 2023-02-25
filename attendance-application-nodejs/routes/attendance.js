const express = require("express")
const { ObjectId } = require("mongoose")
const router = express.Router()

const Attendance = require("../models/attendance")
const Data = require("../models/data")

router.get("/", async (req, res) => {
    res.redirect("/")
})

router.get("/show/:id", async (req, res) => {
    res.render("show.ejs", { attendance: new Attendance(), id : req.params.id})
})

router.get("/add", (req, res) => {
    res.redirect("/")
    // res.render("add", { attendance: new Attendance()})
})

router.post("/add", async (req, res, next) => {
    req.attendance = new Attendance()
    next()
}, saveAndRedirect("add"))

router.get("/new", (req, res) => {
    res.render("new", { data: new Data()})
})

router.post("/new", async (req, res, next) => {
    req.data = new Data()
    next()
}, saveAndRedirectNew("new"))

router.get("/view/:id", async (req, res) => {
    const data = await Data.findOne({ id: req.params.id})
    const users = await Attendance.find({ att_id: req.params.id }).sort({ sanitizedname: "asc"})
    res.render("view", { users: users, data: data})
})

router.post("/delete/:id", async (req, res) => {
    const id_ = req.params.id
    
    await Data.findByIdAndRemove({ _id: id_ })

    await Attendance.deleteMany({ att_id: req.params.id }).then(function(){
        console.log("")
    }).catch(function(error){
        console.log(error)
    });
    
    res.redirect("/")
})

function saveAndRedirect(path) {
    return async (req, res) => {
        let attendance = req.attendance
        attendance.name = req.body.name
        attendance.batch = req.body.batch
        attendance.att_id = req.body.id

        try{
            attendance = await attendance.save()
            res.redirect("/")
        } catch(e) {
            console.log(e)
            res.render(`${path}`, { attendance : attendance })
        }
    }
}

function saveAndRedirectNew(path) {
    return async (req, res) => {
        let data = req.data
        data.subject = req.body.subject

        try{
            data = await data.save()
            res.redirect("/")
        } catch(e) {
            console.log(e)
            res.render(`${path}`, { data : data })
        }
    }
}

module.exports = router