
module.exports = {
    Admin: async function (app, dic) {
        app.get("/Admin", (req, res) => {
            res.sendFile(dic + "/html/Admin.html")
        })
        let Answer = '';
        app.post("/api/answer", async (req, res) => {
            Answer = ''
            Answer = req.body.answer;
            res.send()
        })
        app.get("/api/answer", (req, res) => {
            res.json({ Answer: Answer })
        })
    }
}