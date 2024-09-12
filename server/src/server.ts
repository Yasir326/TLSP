import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import apiRoutes from './routes/api';

dotenv.config();

console.log('REPLICATE_API_TOKEN:', process.env.REPLICATE_API_TOKEN ? 'Token is set' : 'Token is not set');

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use('/api', apiRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});