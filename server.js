let express = require("express");
let axios = require("axios");
let cors = require("cors");
let dotenv = require("dotenv").config();

let app = express();
let port = 6060;

app.use(express.json());
app.use(cors());

app.get("/", (req, resp, next) => {
  resp.send({
    msg: "Hello",
  });
});

app.get("/allNotes", async (req, resp, next) => {
  let getNotes = await axios.get("https://api.ona.io/api/v1/notes", {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${process.env.TOKEN}`,
    },
  });

  console.log(getNotes.data);
  resp.send(getNotes.data);
});

app.post("/addNote", async (req, resp, next) => {
  let modal = {
    note: req.body.note,
    instance: req.body.instance,
  };
  let addNotes = await axios.post("https://api.ona.io/api/v1/notes", modal, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${process.env.TOKEN}`,
    },
  });

  console.log(addNotes.data);
  resp.send(addNotes.data);
});

app.delete("/deleteNote/:pk", async (req, resp, next) => {
  try {
    let pk = req.params.pk;

    let delNote = await axios.delete(`https://api.ona.io/api/v1/notes/${pk}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${process.env.TOKEN}`,
      },
    });

    // console.log(delNote);
    resp.send(delNote.data);
  } catch (error) {
    next(err);
  }
});

app.post("/login", (req, resp, next) => {
  let email = req.body.email;
  let pass = req.body.password;
});

app.listen(port, () => {
  console.log("listening on 6060");
});
``;
