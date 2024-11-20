import express from "express"
const app = express()
const port = 5000;

app.listen(5000, () => {
    console.log(`Server running on port ${port}.`)
});