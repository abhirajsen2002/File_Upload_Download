const express = require("express");
const multer = require("multer");
const path = require("path");


const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, "uploads");
  },
  filename: function(req, file, cb) {
    cb(null, (file.originalname));
  }
});

const upload = multer({
  storage: storage
});

const app = express();

app.use(express.static("public"));
app.use(express.urlencoded({ extended : true }))
app.get("/",(req,res)=>{
    res.sendFile(__dirname+"/public/test.html")
})
app.post("/upload", upload.single("file"), (req, res) => {
  res.send("File uploaded successfully");
});

app.post("/download", (req, res) => {
  res.download("uploads/" + req.body.filename);
  console.log(req.body)
});

// app.get("/view/:filename", (req, res) => {
//   res.sendFile("public/uploads/" + req.params.filename, {
//     root: __dirname
//   });
// });


app.listen(process.env.PORT, () => {
  console.log("Server started on port 3000");
});
