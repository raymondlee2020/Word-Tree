import express from 'express';
import Mongo from '../database/mongo'
import '@babel/polyfill';
const router = express.Router();
const topicsDatabase = Mongo.get("topics");

router.get("/", async (req, res) => {
    const result = await topicsDatabase.find({});
    const topicList = result.map((e) => {
        return e.title;
    })
    const selectedOption = Math.floor(Math.random() * topicList.length);
    res.render("./home.ejs", {
        topics: topicList,
        selectedOption: selectedOption
    })
})

export default router;