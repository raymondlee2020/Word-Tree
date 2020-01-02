import homeController from './home';
import topicController from './topic';
import treeController from './trees'
import webhookController from './webhook';
import bodyParser from 'body-parser';
import express from 'express';

export default function (app) {
    app.use('/webhook', webhookController);
    // body-parser setting
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use('/', homeController);
    app.use('/topic', topicController);
    app.use('/trees', treeController);
};