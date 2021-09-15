import express from "express";

import * as db from "./db.mjs";

const sightingsRouter = express.Router();

sightingsRouter.get("/", async (req, res) => res.json(await db.getSightings()));

sightingsRouter
  .get("/:sightingID", async (req, res) =>
    res.json(await db.getSighting(req.params.sightingId)),
  )
  .delete("/:sightingId", async (req, res) => {
    await db.deleteSighting(req.params.sightingId);
    res.status(204).end();
  });

sightingsRouter.use(express.json());
sightingsRouter.post("/", async (req, res) => {
  res.status(201).json(await db.addSighting(req.body));
});

export default sightingsRouter;
