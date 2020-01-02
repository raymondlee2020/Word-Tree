import express from 'express';
import Mongo from '../database/mongo';
import '@babel/polyfill';
const router = express.Router();
const topicsDatabase = Mongo.get("topics");
const recordDatabase = Mongo.get("record");

router.get("/:topic/list", async (req, res) => {
    const queryTopic = req.params.topic;
    const topicData = await topicsDatabase.findOne({ title: queryTopic });
    const opinionData = await recordDatabase.find({ topic: queryTopic });
    res.render("./list.ejs", {
        title: topicData.title,
        description: topicData.description,
        opinions: opinionData
    })
})

router.get("/:topic/form", async (req, res) => {
    const topic = req.params.topic;
    const result = await topicsDatabase.findOne({ title: topic });
    res.render("./form.ejs", {
        title: result.title,
        description: result.description
    })
})

router.post("/:topic/thanks", async (req, res) => {
    const insertTopic = req.params.topic;
    const insertName = req.body.name;
    const insertOpinion = req.body.opinion;
    if (!(isNull(insertName) || isNull(insertOpinion))) {
        await recordDatabase.insert({ topic: insertTopic, name: insertName, opinion: insertOpinion });
    }
    res.render("./thanks.ejs", {})
})

function isNull(str) {
    return str.replace(/\s+/g, "").length == 0;
}
export default router;