import 'dotenv/config';
import connectDB from './src/config/db.js';
import app from './src/app.js';
import env from './src/config/env.js';

// Connect to database
await connectDB();

// Start server
const PORT = env.PORT;
app.listen(PORT, () => {
  console.log(`Server is running at PORT ${PORT}`);
});
