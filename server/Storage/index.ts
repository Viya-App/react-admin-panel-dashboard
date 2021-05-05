import Express from "express";
import multer from "multer";
import Database from "../Database";
const upload = multer({ dest: "./uploads/" });

export default (app: Express.Express) => {
  app.post(
    "/api/uploads",
    upload.array("files", 12),
    async (req, res, next) => {
      // req.files is array of `photos` files
      // req.body will contain the text fields, if there were any
      const files = req.files;
      try {
        const result = await Database("storage.files")
          .insert(files)
          .returning("*");
        res.status(200).json(result);
      } catch (error) {
        res.status(400).json({ error });
      }
      res.write("<h1>İşlem Başarılı</h1>");
    }
  );
};
