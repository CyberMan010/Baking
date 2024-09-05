const {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
} = require("firebase/storage");
const dayjs = require("dayjs");
exports.fileUpload = async (req, res, next) => {
  const files = req.body.files;
  req.urls = [];
  try {
    if (files !== undefined) {
      for (let i = 0; i < files.length; i++) {
        const storage = getStorage();
        const imagesRef = ref(
          storage,
          `/images/${req.user}-${dayjs.unix()}-${i}.jpg`
        );

        await uploadBytes(imagesRef, files[i]);
        const url = getDownloadURL(imagesRef);
        req.urls.push(url);
      }
      next();
    } else {
      next();
    }
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Internal server error", error: e });
  }
};
