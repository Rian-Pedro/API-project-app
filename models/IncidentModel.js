const mongoose = require("mongoose");
const { Schema } = mongoose;

const IncidentSchema = new Schema({
    location: String,
    imgPath: String,
    creatorId: String,
    description: String,
    incidentStatus: String
});

const Incident = mongoose.model("incident", IncidentSchema);

class IncidentModel {

    constructor(body) {
        this.body = body;
    }

    async createIncident() {
        try {
            if(Object.keys(this.body).length <= 0) throw new Error("Corpo de objeto vazio");

            const newIncident = new Incident(this.body);
            await newIncident.save();
        } catch(err) {
            console.log(err);
        }
    }

}

module.exports = IncidentModel;