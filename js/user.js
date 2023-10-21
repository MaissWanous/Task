const moment = require("moment");
module.exports = {
    user: async function (app, dic) {
        app.get("/user", async function (req, res) {
            res.sendFile(dic + "/html/user.html");
        });
        let Question = '';
        let check = true;
        let Warning = false;
        let firstQuestionTime;
        let lastQuestionTime;

        function isTimeElapsed(question1, question2) {
            const Minutes = parseInt(question2) - parseInt(question1);
         
            // Check if more than 2 minutes has elapsed
            return Minutes >= 2;
        }

        app.post("/api/questions", (req, res) => {
            Question = req.body.question;

            if (check) {
                check = false;
                firstQuestionTime = moment().minutes();
            } else {
                lastQuestionTime = moment().minutes();
            }

            if (isTimeElapsed(firstQuestionTime, lastQuestionTime) && !Warning) {
                Warning = true;
                check = true;
            }

            //Verify that 2 minutes have passed after the ban
            if (isTimeElapsed(firstQuestionTime, lastQuestionTime) && !check) {
                Warning = false;
            }

            res.send()
        })

        app.get("/api/questions", (req, res) => {

            res.json({
                Question: Question,
                Warning: Warning,
            })
        })

    }
}