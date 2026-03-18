
import express from 'express';
import racesRoutes from './routes/races.js';

const app = express();

app.use(express.json());

// routes
app.use('/races', racesRoutes);

app.listen(5000, () => {
    console.log('Server running on port 5000');
});