const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const upload = require("../middleware/Upload");

router.get("/users", userController.getAllUsers);
router.get("/users/:id", userController.getUserById);
router.post("/users", userController.createUser);
router.put("/users/:id", userController.updateUser);
router.delete("/users/:id", userController.deleteUser);
router.post("/users/:id/upload-profile-picture", upload.single("profilePicture"), userController.uploadProfilePicture);

module.exports = router;
