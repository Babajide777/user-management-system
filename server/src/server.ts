import express, { Application } from "express";
import morgan from "morgan";

const app: Application = express();

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.listen(4000, () => {
  console.log("App listenning on port 4000");
});
