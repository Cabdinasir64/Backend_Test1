import express from 'express';
import userRoutes from './routes/userRoutes';
import authRoutes from './routes/authRoutes'
import authRoutes2 from './routes/authRoutes2'
import logger from './Middleware/logger';
import authBcrypt from './routes/authBcrypt'
import contactRoutes from './routes/contactRoutes'
import dotenv from 'dotenv';


dotenv.config();

const app = express();
const PORT = process.env.PORT;


app.use(express.json()); 
app.use(logger);

app.use('/users', userRoutes);
app.use('/', authRoutes);
app.use('/', authRoutes2)
app.use("/auth", authBcrypt);
app.use("/api", contactRoutes);


app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
