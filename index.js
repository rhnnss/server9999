var express = require("express");
var app = express();
var mysql = require("mysql");
var bodyParser = require("body-parser");
const cors = require("cors");
const port = process.env.PORT || 4090;

app.use(bodyParser.json({ type: "application/json" }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

var con = mysql.createConnection({
  host: "freedb.tech",
  user: "freedbtech_Hans",
  database: "freedbtech_Koempro",
  password: "Sumiyati81",
});

app.get("/", (req, res) => {
  res.send("Tester");
});

// get ======================================
app.get("/posts", (req, res) => {
  con.query("select * from Posts", (error, rows, fields) => {
    if (error) console.log(error);
    else {
      res.send(rows);
    }
  });
});

// find by id ==============================
app.get("/posts/:id", (req, res) => {
  con.query(
    "SELECT * FROM Posts where id=? ",
    req.params.id,
    (error, rows, fields) => {
      if (error) console.log(error);
      else {
        console.log(rows);
        res.send(JSON.stringify(rows));
      }
    }
  );
});

// Posts ====================================
app.post("/posts", (req, res) => {
  con.query("insert into Posts set ? ", req.body, (error, rows, fields) => {
    if (error) console.log(error);
    else {
      console.log(rows);
      res.send(JSON.stringify(rows));
    }
  });
});

// Update Process =================================
app.put("/postsupdate", (req, res) => {
  const { id, title, desc, link, task, date, image, avatar } = req.body;
  con.query(
    "UPDATE Posts SET ? WHERE id=?",
    [req.body, id],
    (error, rows) => {
      if (error) console.log(error);
      else {
        res.send(JSON.stringify(rows));
        // res.send(`Posts with the title: ${title} has been added`);
      }
    }
  );
});

// Delete =================================
app.delete("/posts/:id", (req, res) => {
  console.log("Params" + req.params.id);
  con.query(
    "DELETE FROM Posts where id=? ",
    req.params.id,
    (error, rows, fields) => {
      if (error) console.log(error);
      else {
        console.log(rows);
        res.send("Succes Delete");
      }
    }
  );
});

app.listen(port, () => console.log(`Listening on port ${port}`));
