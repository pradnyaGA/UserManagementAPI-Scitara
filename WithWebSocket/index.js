// app-websocket.js
import express from "express";
import { WebSocketServer } from "ws";   // ✅ use ws package

const app = express();
app.use(express.json());

// --- WebSocket Setup ---
const wss = new WebSocketServer({ port: 8080 });  // ✅ consistent variable name

wss.on("connection", (socket) => {
  console.log("Client connected via WebSocket");
  socket.send(JSON.stringify({ event: "CONNECTED", message: "Welcome!" }));
});

// --- Helper: Broadcast to all clients ---
function broadcast(event, data) {
  wss.clients.forEach((client) => {
    if (client.readyState === client.OPEN) {
      client.send(JSON.stringify({ event, data }));
    }
  });
}

// --- In-memory user store ---
let users = [
  { id: 1, name: 'Alice', email: 'alice@example.com' },
  { id: 2, name: 'Bob', email: 'bob@example.com' }
];



// --- REST API ---
app.post("/users", (req, res) => {
  const newUser = { id: users.length + 1, ...req.body };
  users.push(newUser);

  // Push update to WebSocket clients
  broadcast("USER_CREATED", newUser);

  res.status(201).json(newUser);
});

app.put("/users/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const index = users.findIndex((u) => u.id === id);
  if (index === -1) return res.status(404).json({ error: "User not found" });

  users[index] = { ...users[index], ...req.body };

  // Push update to WebSocket clients
  broadcast("USER_UPDATED", users[index]);

  res.json(users[index]);
});

app.get("/users", (req, res) => {
  res.json(users);
});

app.listen(3000, () => console.log("API running on port 3000"));