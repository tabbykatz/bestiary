import express from "express";

import * as db from "./db.mjs";

const specimensRouter = express.Router();

specimensRouter.get("/", async (req, res) => res.json(await db.getSpecimens()));

specimensRouter
  .get("/:specimenID", async (req, res) =>
    res.json(await db.getSpecimen(req.params.specimenId)),
  )
  .delete("/:specimenId", async (req, res) => {
    await db.deleteSpecimen(req.params.specimenId);
    res.status(204).end();
  });

specimensRouter.use(express.json());
specimensRouter.post("/", async (req, res) => {
  res.status(201).json(await db.addSpecimen(req.body));
});

export default specimensRouter;
