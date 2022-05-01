const router = require("find-my-way")();
// const catController = require("../controllers/cat");
const userController = require("../controllers/user");
const imageController = require("../controllers/image");
const { checkAuth } = require("../services/auth");
const { routerMiddleware } = require("../utils/routerMiddleware");

// user
router.on("POST", "/account/create", async (req, res) => {
  console.log("acc");
  const result = await userController.createUser(req, res);
  console.log(result);
  res.end(JSON.stringify(result));
});

router.on("POST", "/account/signIn", async (req, res) => {
  const result = await userController.signInUser(req, res);
  res.end(JSON.stringify(result));
});

router.on("POST", "/account/logout", async (req, res) => {
  const result = await userController.logoutUser(req, res);
  res.end(JSON.stringify(result));
});

router.on(
  "POST",
  "/image",
  routerMiddleware([
    checkAuth,
    async (req, res) => {
      console.log(req.headers);
      const result = await imageController.uploadItem(req, res);
      res.end(JSON.stringify(result));
    },
  ])
);

router.on("GET", "/image", async (req, res) => {
  const result = await imageController.getItems(req, res);
  res.end(JSON.stringify(result));
});

// cat
// router.on("POST", "/cat", async (req, res) => {
//   const result = await catController.createCat(req, res);

//   res.end(JSON.stringify(result));
// });

// router.on("GET", "/cat", async (req, res) => {
//   const result = await catController.getCats(res);

//   res.end(JSON.stringify(result));
// });

// router.on("GET", "/cat/:catId", async (req, res, params) => {
//   const result = await catController.getCatById(res, params.catId);

//   res.end(JSON.stringify(result));
// });

// router.on("PUT", "/cat/:catId", async (req, res, { catId }) => {
//   const result = await catController.updateCatById(req, res, catId);

//   res.end(JSON.stringify(result));
// });

// router.on("DELETE", "/cat/:catId", async (req, res, { catId }) => {
//   const result = await catController.deleteCatById(res, catId);

//   res.end(JSON.stringify(result));
// });

module.exports = router;
