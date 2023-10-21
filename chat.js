const express = require("express");
const bodyparser = require("body-parser");
const moment = require("moment");
const user = require("./js/user");
const Frequent_questions = require("./js/Frequent_questions");
const Admin = require("./js/Admin");
const app = express();
app.use(express.static("public"));
app.use(bodyparser.urlencoded({ extended: true }));
user.user(app, __dirname)
Frequent_questions.Frequent_questions(app, __dirname)
Admin.Admin(app, __dirname)
app.get("/", function (req, res) {
    res.sendFile(__dirname + "/home.html");
});
app.get("/user_home", (req, res) => {
    res.sendFile(__dirname + "/html/User's_home.html")
})

app.listen(2002, function (req, res) {
    console.log("server started on port 2002");
});