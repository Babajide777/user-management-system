import express, { Application, Request, Response } from "express";
import morgan from "morgan";
import { connectDB } from "./config/db";
import userRoute from "./routes/userRoutes";
import authRoute from "./routes/authRoute";
import cookieParser from "cookie-parser";
import passport from "./config/passport";
import cors from "cors";

const app: Application = express();

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(passport.initialize());
app.use(
  cors({
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: true,
    credentials: true,
  })
);

app.get("/", (req: Request, res: Response) => {
  res.send("User Management Server running ");
});

//routes
app.use("/api/user", userRoute);
app.use("/api/auth", authRoute);

app.all("*", (req: Request, res: Response, next) => {
  res.status(404).json({
    msg: "Page not found",
  });
});

connectDB()
  .then(() => {
    console.log("DB connected successfully");
    app.listen(4000, () => {
      console.log("server listening on port 4000");
    });
  })
  .catch((err) => console.log(`Database Connection failed  ${err}`));
