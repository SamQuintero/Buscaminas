const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

let mongoConnection = "mongodb+srv://admin:dorx123@myapp.8yzr4bk.mongodb.net/Minesweeper";
let db = mongoose.connection;

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
    scores: {
        easy: [
            {
                score: {
                    type: Number
                },
                date: {
                    type: Date,
                    default: Date.now
                }
            }
        ],
        normal: [
            {
                score: {
                    type: Number
                },
                date: {
                    type: Date,
                    default: Date.now
                }
            }
        ],
        hard: [
            {
                score: {
                    type: Number
                },
                date: {
                    type: Date,
                    default: Date.now
                }
            }
        ]
    },
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

function registerNewUser(user) {
    let new_user = User(user);
    new_user.scores = {
        "easy": [{"score": 0}],
        "normal": [{"score": 0}],
        "hard": [{"score": 0}]
    }
    new_user.save().then((doc) => {console.log("Usuario creado: " + doc)});
}

exports.Users = User;
exports.registerNewUser = registerNewUser;