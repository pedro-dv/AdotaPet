const express = require('express');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');
const petRoutes = require('./routes/petRoutes');

const app = express();

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));

// Rota raiz para evitar 404
app.get('/', (req, res) => {
  res.json({
    message: "API Pet-FullStack Online!",
    endpoints: {
      users: "/api/users",
      pets: "/api/pets",
      uploads: "/uploads"
    }
  });
});

app.use('/api/users', userRoutes);
app.use('/api/pets', petRoutes);

module.exports = app;
