import { createApp } from "./app";
import mongoose from "mongoose";

const startServer = async () => {
  const app = createApp();

  const port = process.env.PORT;

  app.listen(port, async () => {
    await mongoose
      .connect(`${process.env.DB_URI}`)
      .then(() => {
        console.log("Data Source has been initialized!");
      })
      .catch((error) => {
        console.error("Error during Data Source initialization", error);
      });
    console.log(`Listening to request on 127.0.0.1:${port}`);
  });
};

startServer();
