// @ts-ignore
import * as express from 'express';
import * as cors from 'cors'
import * as bodyParser from 'body-parser';
import user_routes from './handlers/users';
import order_routes from './handlers/orders';
import products_routes from './handlers/products';

const app: express.Application = express();

const address: string = 'localhost:5000';
app.use(cors({
  origin:"*"
}))
app.use('/images',express.static('images'));
app.use(bodyParser.json());


user_routes(app);
products_routes(app);
order_routes(app);

app.listen(5000, function () {
  console.log(`starting app on: http://${address}`);
});

export default app;