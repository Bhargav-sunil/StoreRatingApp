require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const authRoutes = require('./routes/authRoutes');
const adminRoutes = require('./routes/adminRoutes');
const userRoutes = require('./routes/userRoutes');
const storeOwnerRoutes  = require('./routes/storeOwnerRoutes')

const app = express();

require('./models/userModel');
require('./models/storeModel');
require('./models/ratingModel');

app.use(cors());
app.use(bodyParser.json());



app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/user', userRoutes);
app.use('/api/owner', storeOwnerRoutes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
