import * as functions from 'firebase-functions';
import express from 'express';

const cors = require('cors');
import * as bodyParser from 'body-parser';
import * as provider from './provider';
import * as course from './course';
import * as editor from './editor';

// Emulation path : http://localhost:5001/angular-fire-e40b7/us-central1/main

//Api Endpoints for Admin tasks
const app = express();
app.use(bodyParser.json());
app.use(
  cors({
    origin: '*'
  })
);
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req, res) => res.status(200).send('Hey there!'));

//Course routes
app.get('/courses', course.getAllCourses);
app.get('/courses/:courseId', course.getCourseById);
app.get('/courses/status/:status', course.getCourseByStatus);
app.patch('/courses/action/:courseId', course.updateCourseStatusById);
app.delete('/courses/:courseId', course.deleteCourseById);

//Provider routes
app.get('/providers', provider.getAllProviders);
app.get('/providers/:providerId', provider.getProviderById);
app.get('/providers/:providerName', provider.getProviderByName);
app.patch('/providers/:providerId', provider.updateProviderById);
app.post('/providers', provider.addProvider);

//Editor routes
app.post('/editors', editor.addEditor);
app.get('/editors', editor.getAllEditor);
app.get('/editors/:editorId', editor.getEditorById);
app.patch('/editors/:editorId', editor.updateEditorById);

export const api = functions.https.onRequest(app);
