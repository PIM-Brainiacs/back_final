import { validationResult } from "express-validator";
import User from '../models/user.js'



export function getAllDoctors(req, res) {
    User
        .find({role:"DOCTOR"})
        .then(docs => {
            res.status(200).json(docs);
        })
        .catch(err => {
            res.status(500).json({ error: err })
        });
}

export function getAllAutistes(req, res) {
    User
        .find({role:"AUTISTE"})
        .then(docs => {
            res.status(200).json(docs);
        })
        .catch(err => {
            res.status(500).json({ error: err })
        });
}

export function getUserById(req, res) {
    User
        .findById(req.params.id)
        .then(docs => {
            res.status(200).json(docs);
        })
        .catch(err => {
            res.status(500).json({ error: err })
        });
}


export function getUserByUsername(req, res) {
    User
        .findOne({ "username": req.params.username })
        .then(docs => {
            res.status(200).json(docs);
        })
        .catch(err => {
            res.status(500).json({ error: err })
        });
}



export function updatedUser(req, res) {
    const id  = req.params.id; // Assuming you receive the updated data
    console.log(id)
    const newData =req.body;
    User.findOneAndUpdate(
        { "_id": id },
        { $set: newData }, // Use $set to update specific fields
        { new: true } // Return the updated document
    )
    .then(updatedUser => {
        if (!updatedUser) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json(updatedUser);
    })
    .catch(err => {
        res.status(500).json({ error: err });
    });
}
export function deleteUser(req, res) {
    const id  = req.params.id; // Assuming you receive the updated data
    console.log(id)
    const newData =req.body;
    User.findOneAndDelete(
        { "_id": id },    
    )
    .then(deleteUser => {
        if (!deleteUser) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json(deleteUser);
    })
    .catch(err => {
        res.status(500).json({ error: err });
    });}



export function deleteOnce(req, res) {
    User
        .findOneAndRemove({ "username": req.params.username })
        .then(doc => {
            res.status(200).json(doc)
        })
        .catch(err => {
            res.status(500).json({ error: err })
        })
}



