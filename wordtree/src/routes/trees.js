import express from 'express';
import { LTfunc } from '../services';
import { NLUfunc } from '../services';
import { TAfunc } from '../services';
import Mongo from '../database/mongo';
import '@babel/polyfill';
const router = express.Router();
const topicsDatabase = Mongo.get("topics");
const recordDatabase = Mongo.get("record");
const treeDatabase = Mongo.get("tree");

router.get("/", async (req, res) => {
    const result = await treeDatabase.find({});
    const topicList = result.map(e => {
        return e.topic;
    })
    const dataList = result.map(e =>{
        return e.data;
    })
    res.render("./trees.ejs", {
        topicList: topicList,
        dataList: dataList
    });
})

function toneCompare(a, b) {
    if (a.score > b.score) {
        return -1;
    } else {
        return 1;
    }
}

function setColor(tone, toneRate, emotion, emotionRate) {
    let toneColor;
    switch (tone) {
        case 'anger':
            toneColor = [255, 255 * (1 - toneRate), 255 * (1 - toneRate)];
            break;
        case 'disgust':
            toneColor = [20 / toneRate, 40 / toneRate, 0];
            break;
        case 'fear':
            toneColor = [40 / toneRate, 40 / toneRate, 40 / toneRate];
            break;
        case 'joy':
            toneColor = [210, 210, 255 * (1 - toneRate)];
            break;
        case 'sadness':
            toneColor = [15 / toneRate, 20 / toneRate, 75 / toneRate];
            break;
    }
    let emotionColor;
    switch (emotion) {
        case 'anger':
            emotionColor = [30 * emotionRate, 0, 0];
            break;
        case 'disgust':
            emotionColor = [5 / emotionRate, 10 / emotionRate, 0];
            break;
        case 'fear':
            emotionColor = [40 / emotionRate, 40 / emotionRate, 40 / emotionRate];
            break;
        case 'joy':
            emotionColor = [100 * emotionRate, 100 * emotionRate, 0];
            break;
        case 'sadness':
            emotionColor = [15 / emotionRate, 20 / emotionRate, 75 / emotionRate];
            break;
    }
    return [toneColor[0] + emotionColor[0], toneColor[1] + emotionColor[1], toneColor[2] + emotionColor[2]];
}

async function getData(topic) {
    // Get the data of the topic
    const opinionData = (await recordDatabase.find({ topic: topic })).map((e) => {
        return e.opinion;
    }).join("。").replace(/\r\n|\n/g,"");
    // Data translate
    let opinions = (await LTfunc(opinionData));
    opinions = ((JSON.parse(opinions)).result.translations[0].translation);
    // Data tone analysis
    let tone = (await TAfunc(opinions)).document_tone.tone_categories[0].tones.sort(toneCompare)[0];
    // Data word analysis (MAX input words = 1300)
    const keyWords = (await NLUfunc(opinions)).map(word => {
        const emotionKey = Object.keys(word.emotion);
        const emotionVal = Object.values(word.emotion);
        const index = emotionVal.indexOf(Math.max(...emotionVal));
        const dao = {
            text: word.text,
            weight: word.relevance,
            emotionType: emotionKey[index],
            emotionValue: emotionVal[index]
        }
        return dao;
    })
    // DAO
    const data = keyWords.map(word => {
        const color = setColor(tone.tone_id, tone.score, word.emotionType, (word.emotionValue / 2) + 0.5);
        const dao = {
            name: word.text.replace("'", ""),
            value: Math.pow(10 * word.weight, 3),
            textStyle: {
                normal: {
                    color: `rgb(${color[0]},${color[1]},${color[2]})`
                }
            }
        }
        return dao;
    })
}

export default router;