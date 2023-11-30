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
    image:{
        type: Number,
        default:0
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

let User = mongoose.model("users", userSchema);
let Easy_score = mongoose.model("easy_scores", scoreSchema);
let Normal_score = mongoose.model("normal_scores", scoreSchema);
let Hard_score = mongoose.model("hard_scores", scoreSchema);

let Scores = {
    "easy": Easy_score,
    "normal": Normal_score,
    "hard": Hard_score
};

function registerNewUser(user) {
    user.password = bcrypt.hashSync(user.password, 10);
    let new_user = User(user);
    new_user.scores = {
        "easy": [{"score": 0}],
        "normal": [{"score": 0}],
        "hard": [{"score": 0}]
    }
    new_user.save().then((doc) => {console.log("Usuario creado: " + doc)});
}

function registerNewScore(score, difficulty) {
    let new_score;
    switch (difficulty) {
        case "easy": new_score = Easy_score(score); break;
        case "normal": new_score = Normal_score(score); break;
        case "hard": new_score = Hard_score(score); break;
    }
    new_score.save().then((doc) => {console.log("Score creado: " + doc)});
}

function decryptPwd(pwd1, pwd2) {
    return bcrypt.compareSync(pwd1, pwd2);
}

exports.Users = User;
exports.Easy_scores = Easy_score;
exports.Normal_scores = Normal_score;
exports.Hard_scores = Hard_score;
exports.Scores = Scores;
exports.registerNewUser = registerNewUser;
exports.registerNewScore = registerNewScore;
exports.decryptPwd = decryptPwd;