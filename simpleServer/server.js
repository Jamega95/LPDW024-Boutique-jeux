import express from "express";

const app = express();

app.use(express.static("public"));

app.listen(5002, () => {
    console.log("Listening on 5002");
})