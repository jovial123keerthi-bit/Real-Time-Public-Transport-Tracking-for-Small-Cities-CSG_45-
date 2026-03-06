🚌 Real-Time Public Transport Tracking for small cities

📌 **Project Overview**

This project is a web-based application that allows users to track buses in real time on a map. It provides separate dashboards for passengers, drivers, and administrators.

The system simulates bus movement and updates their location using **Socket.IO**, enabling real-time communication between the server and connected clients.

This project demonstrates the use of **Node.js, Express, WebSockets, and Leaflet maps** to build a real-time transport monitoring system.

---

 🚀 **Features**

 🗺 **Passenger Dashboard__
- View live bus locations on an interactive map
- See bus route, speed, and passenger capacity
- ETA (Estimated Time of Arrival) calculation
- Bus stop visualization
- Crowd level indicators (Low / Medium / Full)

---

 🚍**Driver Dashboard**
- Start trip
- End trip
- Report breakdown
- View current trip status
---

🧑‍💼**Admin Panel**
- Add new buses to the fleet
- Remove buses
- Monitor fleet status
- View basic analytics (total buses and average capacity)
---
 🏗 **System Architecture**

Passenger Dashboard  
Driver Dashboard  
Admin Panel  

---

All components communicate with the **Node.js backend server** using **Socket.IO** for real-time updates.

Client Dashboards
│
│ WebSocket (Socket.IO)
▼
Node.js + Express Server
│
▼
Bus Simulation Engine

---
🛠 Technologies Used

- **Node.js** – Backend runtime
- **Express.js** – Web server framework
- **Socket.IO** – Real-time communication
- **Leaflet.js** – Interactive maps
- **OpenStreetMap** – Map tiles
- **HTML / CSS / JavaScript** – Frontend development
---
 📂 Project Structure

project-folder
│
├── server.js # Backend server
├── public/
│ ├── index.html # Passenger tracking dashboard
│ ├── driver.html # Driver dashboard
│ └── admin.html # Admin panel
│
├── package.json
└── README.md


---

⚙️ Installation and Setup

1️⃣ Clone the repository
git clone https://github.com/jovial123keerthi/bus-tracking-system.git

2️⃣ Navigate to the project folder
cd bus-tracking-system

3️⃣ Install dependencies
npm install

4️⃣ Run the server
node server.js

5️⃣ Open in browser
http://localhost:3000

---

📊 How the System Works

The server maintains a list of buses with their coordinates.
Every few seconds, the server updates the location of each bus.
These updates are sent to connected clients using Socket.IO.
The frontend receives the updates and moves bus markers on the map.
Driver and admin actions also send events to the server to update the system.

🔮 Future Improvements

Integrate real GPS data from buses
Add database support (MongoDB)
Implement user authentication
Mobile application for passengers
Advanced analytics and route optimization

⭐Project Screenshots





