//1.Require Express
const express = require("express");
const db = require("./db/db.json");
//2.Create an instance of Express called app
const app = express();
//3. Add a port to 
const PORT = process.env.PORT || 3000;
//5. Add data processing for POST routes.
app.use(express.urlencoded({ extended:true}));
app.use(express.json());

const path = require("path");
app.use(express.static("public"));

//TWO HTML ROUTES
app.get("/notes", function (req, res) {
  res.sendFile(path.join(__dirname, "./public/notes.html"));
});
//THREE API ROUTES: GET, POST AND DELETE
app.get("/api/notes", function (req,res) {
    res.json(db)
})

//POST data
// app.post("/api/notes", function(req, res) {
//     //Implement the 3 step 
//     fs.readFile("./db/db.json")
// })

//Must be last because it will essentially catch anything first
app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "./public/index.html"));
});


//4. listen to port, should always be last
app.listen(PORT, () => {
  console.log(`listening on http://localhost:${PORT}`);
});
