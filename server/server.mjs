import express from "express";
import mime from "mime-types";

import speciesRouter from "./speciesRouter.mjs";
import specimensRouter from "./specimensRouter.mjs";
import sightingsRouter from "./sightingsRouter.mjs";

const app = express();
const port = process.env.PORT || 4000;

app.use("/api/species", speciesRouter);
app.use("/api/specimens", specimensRouter);
app.use("/api/sightings", sightingsRouter);

app.get("/api/ping", (request, response) =>
  response.json({ response: "pong" }),
);

if (process.env?.SERVE_REACT?.toLowerCase() === "true") {
  app.use(
    express.static("/app", {
      maxAge: "1d",
      setHeaders: (res, path) =>
        ["application/json", "text/html"].includes(mime.lookup(path)) &&
        res.setHeader("Cache-Control", "public, max-age=0"),
    }),
  );

  app.get("*", (req, res) => {
    res.sendFile("/app/index.html");
  });
}

app.listen(port, () => {
  console.info(`Example server listening at http://localhost:${port}`);
});
