require('dotenv').config();
require('express-async-errors');
const express = require('express');
const app = express();

// importing security packages
const helmet = require("helmet");
const cors = require("cors");
const xss = require("xss-clean");
const {rateLimit} = require('express-rate-limit')


// error handler
const notFoundMiddleware = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");

// connectdb
const connectDB = require("./db/connect");

// routes
const authRoutes = require("./routes/auth");
const callsRoute = require("./routes/callsroute")

const MONGODB_STRING = process.env.MONGODB_STRING;

// setting up rateLimiter

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
	limit: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
	standardHeaders: 'draft-7', // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header
	legacyHeaders: false,
  message: "you can only make 10 requests every 15 mins"
})

app.set('trust proxy', 1);
app.use(express.json());
// extra packages for security

app.use(xss());
app.use(cors());
app.use(helmet());
app.use(limiter);

// routes
app.use("/api/v1/user", authRoutes);
app.use("/api/v1/usercalls", callsRoute);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 4040;

const start = async () => {
  try {
    await connectDB(MONGODB_STRING)
    app.listen(port, () =>
      console.log(`Connected to the database and listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
