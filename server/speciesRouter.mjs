import express from "express";

import * as db from "./db.mjs";

const speciesRouter = express.Router();

speciesRouter.get("/", async (req, res) => res.json(await db.getSpecies()));

speciesRouter
  .get("/:speciesID", async (req, res) =>
    res.json(await db.getSpecies(req.params.speciesId)),
  )
  .delete("/:speciesId", async (req, res) => {
    await db.deleteSpecies(req.params.speciesId);
    res.status(204).end();
  });

speciesRouter.use(express.json());
speciesRouter.post("/", async (req, res) => {
  res.status(201).json(await db.addSpecies(req.body));
});

export default speciesRouter;
