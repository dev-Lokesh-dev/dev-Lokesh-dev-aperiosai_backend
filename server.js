import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import retailerRoutes from './routes/retailer.routes.js';
import errorMiddleware from './middlewares/error.middleware.js';
import { wrongRoute } from './middlewares/wrongRoute.middleware.js';
import { tokenRouter } from './routes/token.routes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

connectDB();

app.use(express.json());


app.get('/', (req, res) => {
  res.send('home page');
});

// for generating token 
app.use(tokenRouter)

// without token you cannot acces this route please hit /getToken to get token and sent it in headers or comment the auth middleware
app.use('/retailers', retailerRoutes);

// error handler
app.use(errorMiddleware);

// Middleware for handling wrong routes
app.use(wrongRoute); 


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
