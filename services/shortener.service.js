import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const loadLinks = async () => {
  const allShortCodeLinks = await prisma.shortLink.findMany();

  return allShortCodeLinks;
};

export const getLinkByShortCode = async (shortCode) => {
  //   const [rows] = await db.execute(
  //     "select * from short_links where short_code = ?",
  //     [shortCode]
  //   );

  //   if (rows.length > 0) {
  //     return rows[0];
  //   } else {
  //     return null;
  //   }

  const shortLink = await prisma.shortLink.findUnique({
    where: { shortCode },
  });

  return shortLink;
};

export const saveLinks = async ({ url, shortCode }) => {
  //   const [rows] = await db.execute(
  //     "insert into short_links(short_code, url) values(?,?)",
  //     [shortCode, url]
  //   );

  //   return rows;

  console.log("url ", url, "shortcode ", shortCode);

  const savelink = await prisma.shortLink.create({
    data: { shortCode, url },
  });

  return savelink;
};

export const deleteData = async (id) => {
  //   try {
  //     const [result] = await db.execute("DELETE FROM short_links WHERE id = ?", [
  //       id,
  //     ]);
  //     return result.affectedRows > 0;
  //   } catch (error) {
  //     console.error("Delete error:", error);
  //     throw error;
  //   }

  const deleteLink = await prisma.shortLink.delete({
    where: { id },
  });
  return deleteLink;
};
