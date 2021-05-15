//@referece-docs http://knexjs.org/
import { Request } from "express";
import Database from "../../Database";
import { app } from "../../App";

type userQueryParams = {
  collectionName: string;
  id: any;
};
/**
 * This function comment is parsed by doctrine
 * @route DELETE /api/delete
 * @param {string} id.required  İlgili satır id (zorunlu)
 * @returns {object} 200 - { status: true }
 * @returns {Error}  default - { error:"error message...", status: false }
 */
app.delete("/api/delete", (req: Request<{}, {}, {}, userQueryParams>, res) => {
  try {
    const data: userQueryParams = req.query;
    Database(data.collectionName)
      .where("id", "=", data.id)
      .delete()
      .then(() => res.status(200).json({ status: true }))
      .catch((error) => res.status(400).json({ error }));
  } catch (error) {
    res.status(400).json({ error, status: false });
  }
});
