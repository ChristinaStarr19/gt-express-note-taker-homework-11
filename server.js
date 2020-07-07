//1.Require Express
const express = require("express");
let db = require("./db/db.json");
const fs = require("fs");
//2.Create an instance of Express called app
const app = express();
//3. Add a port to
const PORT = process.env.PORT || 3000;
//5. Add data processing for POST routes.
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const path = require("path");
app.use(express.static("public"));

//TWO HTML ROUTES
//Route 1 HTML Route
app.get("/notes", function (req, res) {
  res.sendFile(path.join(__dirname, "./public/notes.html"));
});
//THREE API ROUTES: GET, POST AND DELETE
//GET API ROUTE
app.get("/api/notes", function (req, res) {
  res.json(db);
});

//POST data
app.post("/api/notes", function (req, res) {
  //Implement the 3 step process.
  fs.readFile("./db/db.json", "utf8", (err, data) => {
    if (err) {
      return res.send("An error occured reading your data.");
    }

    //Step 2. Manipulate the data
    db = JSON.parse(data);
    const newNote = { ...req.body, id: db.length };
    db.push(newNote);

    //Step 3. Write data back to the file
    fs.writeFile("./db/db.json", JSON.stringify(db), "utf8", (err) => {
      if (err) {
        return res.send("An error occured writing your data.");
      }
      res.json(newNote);
    });
  });
});

//delete data
app.delete("/api/notes/:id", function (req, res) {
  fs.readFile("./db/db.json", "utf8", (err, data) => {
    if (err) {
      return res.send("An error occured reading your data.");
    }
    db = JSON.parse(data);
    const NewDb = db.filter((note) => note.id != parseInt(req.params.id));
    fs.writeFile("./db/db.json", JSON.stringify(NewDb), "utf8", (err) => {
      if (err) {
        return res.send("An error occured writing your data.");
      }
      res.json(NewDb);
    });
  });
});

//Use this one to default to home, if no matching route has been found
//Route 2 HTML route
app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "./public/index.html"));
});

//4. listen to port, should always be last
app.listen(PORT, () => {
  console.log(`listening on http://localhost:${PORT}`);
});
