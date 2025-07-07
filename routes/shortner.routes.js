import { Router } from "express";
import {
  deleteLink,
  GetShortnerPage,
  PostShortnerPage,
  RedirectToShortLinks,
} from "../controllers/shortner.controller.js";

const router = Router();

//Definition Routes....

router.get("/", GetShortnerPage);

router.post("/", PostShortnerPage);

router.get("/:shortCode", RedirectToShortLinks);

router.post("/delete/:id", deleteLink);

// export default router;
export const shortnerRoutes = router;
