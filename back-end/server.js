const express = require("express");
const cors = require("cors");
const path = require("path");
const expressSession = require("express-session");
const app = express();
const http = require("http").createServer(app);

const session = expressSession({
  secret: "dimerr is amazing",
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false },
});

app.use(express.static("public"));
app.use(express.json());
app.use(session);

if (process.env.NODE_ENV === "production") {
  // Express serve static files on production environment
  app.use(express.static(path.resolve(__dirname, "public")));
} else {
  // Configuring CORS
  const corsOptions = {
    // Make sure origin contains the url your frontend is running on
    origin: [
      "http://127.0.0.1:8080",
      "http://localhost:8080",
      "http://127.0.0.1:3000",
      "http://localhost:3000",
    ],
    credentials: true,
  };
  app.use(cors(corsOptions));
}
const userRoutes = require("./api/user/user.routes");
const gigRoutes = require("./api/gig/gig.routes");
const orderRoutes = require("./api/order/order.routes");
const authRoutes = require("./api/auth/auth.routes");
const categorieRoutes = require("./api/categories/categories.routes");
const { connectSockets } = require("./services/socket.service");

app.use("/api/user", userRoutes);
app.use("/api/gig", gigRoutes);
app.use("/api/order", orderRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/categorie", categorieRoutes);
connectSockets(http, session);
app.get("/**", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});
const port = process.env.PORT || 3030;
http.listen(port, () => {
  console.log("server running on port:", port);
});
