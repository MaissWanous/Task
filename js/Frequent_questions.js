const moment = require("moment");

module.exports = {
    Frequent_questions: async function (app, dic) {
        // Route to serve the HTML page
        app.get("/Frequent_questions", (req, res) => {
            res.sendFile(dic + "/html/Frequent_questions.html");
        });

        // Sample data for questions and answers
        let data = [
            {
                Question: "Question1",
                Answer: "Answer to question 1 ....",
            },
            {
                Question: "Question2",
                Answer: "Answer to question 2 ....",
            },
            {
                Question: "Question3",
                Answer: "Answer to question 3 ....",
            },
            {
                Question: "Question4",
                Answer: "Answer to question 4 ....",
            },
            {
                Question: "Question5",
                Answer: "Answer to question 5 ....",
            },
            {
                Question: "Question6",
                Answer: "Answer to question 6 ....",
            },
        ];

        let obj;
        let Question;
        let Answer;
        let check = true;
        let Warning = false;
        let firstQuestionTime;
        let lastQuestionTime;

        function isTimeElapsed(question1, question2) {
            const Minutes = parseInt(question2) - parseInt(question1);

            // Check if more than 1 minute has elapsed
            return Minutes >= 1;
        }

        // Route to handle post request for answering questions
        app.post("/api/Frequent_questions", (req, res) => {
            
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

            //Verify that 1 minute have passed after the ban
            if (isTimeElapsed(firstQuestionTime, lastQuestionTime) && !check) {
                Warning = false;
            }

            // Find the answer for the given question
            for (let i = 0; i < data.length; i++) {
                if (data[i].Question == Question) {
                    Answer = data[i].Answer;
                }
            }

            res.send("");
        });

        // Route to retrieve the answer and warning status
        app.get("/api/Frequent_questions", (req, res) => {
            obj = {
                Answer: Answer,
                Warning: Warning,
            };

            res.json(obj);
        });
    },
};