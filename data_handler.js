const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

let mongoConnection = "mongodb+srv://admin:dorx123@myapp.8yzr4bk.mongodb.net/Minesweeper";
let db = mongoose.connection;

let userScoresSchema = new mongoose.Schema({
    easy: {
        type: Array,
        default: [0],
    },
    normal: {
        type: Array,
        default: [0],
    },
    hard: {
        type: Array,
        default: [0],
    }
})

let userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    scores: userScoresSchema,
})

let scoreSchema = new mongoose.Schema({
    score: {
        type: Number,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
})

let User = mongoose.model("Users", userSchema);
let Score = mongoose.model("Scores", scoreSchema);

function getUsers() {
    return User;
}

function getScores() {
    return Score;
}

exports.getUsers = getUsers;
exports.getScores = getScores;