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
  { id: 1, lat: 12.9716, lng: 77.5946, speed: 40, route: "A1", capacity: 30, status: "stopped" },
  { id: 2, lat: 12.9816, lng: 77.6046, speed: 35, route: "B2", capacity: 60, status: "stopped" },
  { id: 3, lat: 12.9616, lng: 77.5846, speed: 50, route: "C3", capacity: 85, status: "stopped" }
];
// Randomly move buses every 3 seconds
setInterval(() => {
  buses = buses.map(bus => {
    bus.lat += (Math.random() - 0.5) * 0.001;
    bus.lng += (Math.random() - 0.5) * 0.001;
    bus.speed = Math.floor(Math.random() * 50) + 10;
    bus.capacity = Math.floor(Math.random() * 100);
    return bus;
  });

  buses.forEach(bus => {
    io.emit("bus-location-update", bus);
  });

  io.emit("fleet-update", buses); // THIS MUST BE HERE

}, 3000);

io.on("connection", (socket) => {

// ADMIN CONTROLS

socket.on("add-bus", (newBus) => {
  buses.push(newBus);
  io.emit("fleet-update", buses);
  console.log("Bus added:", newBus);
});

socket.on("remove-bus", (busId) => {
  buses = buses.filter(bus => bus.id !== busId);
  io.emit("fleet-update", buses);
  console.log("Bus removed:", busId);
});
  // 🚦 Driver Actions
socket.on("start-trip", (busId) => {
  buses = buses.map(bus => {
    if (bus.id === busId) {
      bus.status = "running";
    }
    return bus;
  });
});

socket.on("end-trip", (busId) => {
  buses = buses.map(bus => {
    if (bus.id === busId) {
      bus.status = "stopped";
      bus.speed = 0;
    }
    return bus;
  });
});

socket.on("report-breakdown", (busId) => {
  buses = buses.map(bus => {
    if (bus.id === busId) {
      bus.status = "breakdown";
      bus.speed = 0;
    }
    return bus;
  });
});
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
