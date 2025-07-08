import { eq } from "drizzle-orm";
import { db } from "../config/db-config.js";
import { shortLink } from "../drizzle/schema.js";

export const getAllShortLinks = async () => {
  const allShortCodeLinks = await db.select().from(shortLink);

  return allShortCodeLinks;
};

export const getLinkByShortCode = async (shortCode) => {
  const [shortLinkOne] = await db
    .select()
    .from(shortLink)
    .where(eq(shortLink.shortCode, shortCode));

  return shortLinkOne;
};

export const saveLinks = async ({ url, shortCode }) => {
  const saveLink = await db.insert(shortLink).values({
    url,
    shortCode,
  });

  return saveLink;
};

export const deleteData = async (id) => {
  const deleteLink = await db.delete(shortLink).where({
    id,
  });
  return deleteLink;
};
