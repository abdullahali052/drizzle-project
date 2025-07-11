import {
  deleteData,
  getLinkByShortCode,
  getAllShortLinks,
  saveLinks,
} from "../services/shortener.service.js";

export const GetShortnerPage = async (req, res) => {
  try {
    const links = await getAllShortLinks();
    return res.render("index", { links, host: req.host });
  } catch (error) {
    console.error(error);
    return res.status(500).send("Internal server error");
  }
};

export const PostShortnerPage = async (req, res) => {
  try {
    const { url, shortCode } = req.body;

    const finalShortCode = shortCode || crypto.randomBytes(4).toString("hex");
    const link = await getLinkByShortCode(shortCode);

    if (link) {
      return res
        .status(400)
        .send("Short code already exists. Please choose another.");
    }
    await saveLinks({ url, shortCode: finalShortCode });

    return res.redirect("/");
  } catch (error) {}
};

export const RedirectToShortLinks = async (req, res) => {
  try {
    const { shortCode } = req.params;
    const link = await getLinkByShortCode(shortCode);

    if (!link) return res.redirect("/404");

    return res.redirect(link.url);
  } catch (error) {
    console.error(error);
    return res.status(500).send("Internal server error");
  }
};

export const deleteLink = async (req, res) => {
  try {
    const { id } = req.params;

    const parsedId = parseInt(id);
    const isDeleted = await deleteData(parsedId);

    if (isDeleted) {
      return res.redirect("/"); // Success hone par homepage par redirect
    } else {
      return res.status(404).send("Link not found");
    }
  } catch (error) {
    console.error(error);
    return res.status(500).send("Internal server error");
  }
};
