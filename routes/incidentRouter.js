const express = require("express");
const incidentRouter = express.Router();

const multer = require("multer");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./uploads");
    },
    filename: (req, file, cb) => {
        const name = Date.now() + "-" + file.originalname;
        cb(null, name);
        req.body.imgURL = `./uploads/${name}`
    }
});

const upload = multer({ storage: storage });

incidentRouter.post("/createIncident", upload.single("teste"), (req, res) => {
    res.json({...req.body, situation: true});
});

incidentRouter.get("/getImg", (req, res) => {
    res.sendFile(req.query.name, {root: "./"})
});

module.exports = incidentRouter;