const express = require("express");

const app = express();

const logger = require("./middleware/logger");
const errorHandler = require("./middleware/errorHandler");
const studentRoutes = require("./routes/studentRoutes");


// ==========================================
// PORT
// ==========================================

const PORT = 3000;


// ==========================================
// GLOBAL MIDDLEWARE
// ==========================================

// Parse JSON request bodies
app.use(express.json());

// Custom logger
app.use(logger);


// ==========================================
// HOME ROUTE
// ==========================================

app.get("/", (req, res) => {

    res.status(200).json({
        success: true,
        message: "Student Management REST API is running"
    });

});


// ==========================================
// STUDENT ROUTES
// ==========================================

app.use("/students", studentRoutes);


// ==========================================
// UNSUPPORTED ROUTES
// ==========================================

app.use((req, res, next) => {

    const error = new Error(
        `Route ${req.originalUrl} not found`
    );

    error.statusCode = 404;

    next(error);

});


// ==========================================
// CENTRAL ERROR HANDLER
// ==========================================

app.use(errorHandler);


// ==========================================
// START SERVER
// ==========================================

app.listen(PORT, () => {

    console.log(
        `Server running at http://localhost:${PORT}`
    );

});