const express = require("express");

const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const app = express();
app.use(cors()); // Allow cross-origin requests
app.use(express.static('../public'));// put index.html in /public


const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*", // allow your frontend
    methods: ["GET", "POST"]
  }
});

// Sample bus data (simulate multiple buses)
let buses = [
  { id: 1, lat: 12.9716, lng: 77.5946, speed: 40, route: "A1" },
  { id: 2, lat: 12.9750, lng: 77.5900, speed: 35, route: "B2" },
  { id: 3, lat: 12.9650, lng: 77.5990, speed: 50, route: "C3" }
];

// Randomly move buses every 3 seconds
setInterval(() => {
  buses = buses.map(bus => {
    // Random small movement
    bus.lat += (Math.random() - 0.5) * 0.001;
    bus.lng += (Math.random() - 0.5) * 0.001;
    bus.speed = Math.floor(Math.random() * 50) + 10; // random speed 10-60
    return bus;
  });

  // Emit update to all connected clients
  buses.forEach(bus => {
    io.emit("bus-location-update", bus);
  });
}, 3000);

io.on("connection", (socket) => {
  console.log("Client connected:", socket.id);

  // Send current bus positions on connection
  buses.forEach(bus => {
    socket.emit("bus-location-update", bus);
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected:", socket.id);
  });
});

// Start server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
