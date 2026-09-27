const express = require("express");

const app = express();

const logger = require("./middleware/logger");
const studentRoutes = require("./routes/studentRoutes");


// ==========================================
// Middleware
// ==========================================

// Parse JSON request body
app.use(express.json());

// Custom logger
app.use(logger);


// ==========================================
// Routes
// ==========================================

app.use("/students", studentRoutes);


// ==========================================
// Home route
// ==========================================

app.get("/", (req, res) => {
    res.status(200).json({
        message: "Student Management REST API is running"
    });
});


// ==========================================
// Handle unknown routes
// ==========================================

app.use((req, res) => {
    res.status(404).json({
        message: "Route not found"
    });
});


// ==========================================
// Start server
// ==========================================

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});