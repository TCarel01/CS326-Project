import express from 'express';
import logger from 'morgan';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(logger('dev'));
app.use('/', express.static('client'));

async function initRoutes() {

}

await initRoutes();

app.all('*', async (request, response) => {
    response.status(404).send(`Not found: ${request.path}`);
});

app.listen(port, () => {
 console.log(`started server at port ${port}`);
});