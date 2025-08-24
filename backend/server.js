const express = require("express");
const cors = require("cors");
const app = express();
const mysql = require("mysql2");
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`server running on port ${PORT}`));

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Mouli@2004",
  database: "todo",
});

db.connect((err) => {
  if (err) {
    console.log("error connecting the database");
    return;
  }
  console.log("connected to database succesfully");
});

app.use(cors());
app.use(express.json());
app.listen("3000", () => {
  console.log("Server started");
});

app.get("/", (req, res) => {
  console.log("default");
  db.query(`select * from todoItems`, (err, result) => {
    if (err) {
      console.log("error", err);
      return;
    }
    console.log("data: ", result);
    res.send(result);
  });
});

app.post("/add-item", (req, res) => {
  console.log(req.body);
  db.query(
    `insert into todoItems(itemDescription) values('${req.body.text}')`,
    (err, result) => {
      if (err) {
        console.log("error", err);
        return;
      }
      console.log("inserted succesfuly");
    }
  );
  res.send("added succesfully");
});

app.put("/edit-item", (req, res) => {
  console.log("line 54", req.body);
  db.query(
    `update todoItems set itemDescription="${req.body.itemDescription}" where ID=${req.body.ID}`,
    (err, result) => {
      if (err) {
        console.log("error", err);
        return;
      }
      console.log("inserted succesfuly");
    }
  );
});

app.delete("/delete-item", (req, res) => {
  console.log("line 69", req.body);
  db.query(`delete from todoItems where ID=${req.body.ID}`, (err, result) => {
    if (err) {
      console.log("error", err);
      return;
    }
    console.log("done");
  });
});
