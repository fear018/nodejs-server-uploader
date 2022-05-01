const { parseJsonBody } = require("../utils/jsonHelpers");
const { HttpError } = require("../utils/custom-errors");
const jwt = require("../services/jwt");
const path = require("path");
const fs = require("fs");

const uploadsFolderPath = path.resolve(process.cwd(), "src/uploads");

exports.uploadItem = async (req, res) => {
  const { picture: rawBase64Pic, name } = await parseJsonBody(req);
  const clearBase64 = rawBase64Pic.replace(/^data:image\/png;base64,/, "");
  const base64Buff = Buffer.from(clearBase64, "base64");
  const imagePath = path.resolve(__dirname, "../uploads", name);

  fs.writeFile(imagePath, base64Buff, "base64", (err) => {
    if (err) {
      throw new HttpError();
    } else {
      return { name };
    }
  });
};

exports.getItems = async (req, res) => {
  const imagesBase64 = [];
  const files = fs.readdirSync(uploadsFolderPath);
  for (const file of files) {
    const image = fs.readFileSync(`${uploadsFolderPath}/${file}`, {
      encoding: "base64",
    });

    imagesBase64.push(`data:image/png;base64,${image}`);
  }

  return imagesBase64;
};
