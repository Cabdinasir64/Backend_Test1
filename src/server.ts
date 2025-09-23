import express from 'express';
import userRoutes from './routes/userRoutes';
import logger from './Middleware/logger';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT;


app.use(express.json()); 
app.use(logger);      

app.use('/users', userRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
