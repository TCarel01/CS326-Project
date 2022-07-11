import express, { response } from 'express';
import logger from 'morgan';
import { database } from './database.js';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(logger('dev'));
app.use('/', express.static('client'));

async function initRoutes() {

    //get times endpoint
    app.get('/bestTimes', async (request, response) => {
        try {
            response.writeHead(200, { 'Content-Type': 'application/json' });
            response.write(JSON.stringify({ 'clear': 'test' }));
        }
        catch (error) {
            console.log(error)
        }
        response.end();
    });

    //endpoint that creates timesheet
    app.post('/createTimesheet', async (request, response) => {
        try {
            const contents = request.body;
            database.saveTimesheet(contents.id, contents.tracklist);
            response.writeHead(200, { 'Content-Type': 'application/json' });
            response.write(JSON.stringify({ 'clear': 'test' }));
        }
        catch (error) {
            console.log(error);
        }
        response.end();
    });

    //endpoint that updates a player's timesheet
    app.put('/updateTimesheet', async(request, response) => {
        try {
            const contents = request.body;
            database.updateTimesheet(contents.id, contents.tracklist);
            response.writeHead(200, { 'Content-Type': 'application/json' });
            response.write(JSON.stringify({ 'clear': 'test' }));
        }
        catch (error) {
            console.log(error);
        }
        response.end();
    });

    //removes a player's timesheet from the database
    app.delete('/removeTimesheet', async(request, response) => {
        try {
            response.writeHead(200, { 'Content-Type': 'application/json' });
            response.write(JSON.stringify({ 'clear': 'test' }));
        }
        catch (error) {
            console.log(error);
        }
        response.end();
    });
}

await initRoutes();
await database.connect();

app.all('*', async (request, response) => {
    response.status(404).send(`Not found: ${request.path}`);
});

app.listen(port, () => {
 console.log(`started server at port ${port}`);
});