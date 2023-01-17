import express from "express";

import {
    updateUser
    , deleteUser
    , getUser
    , getUsers
} from '../controllers/user-controller.js'
import {
    verifyToken
    , verifyUser
    , verifyAdmin
} from "../utils/verifyToken.js"


const router = express.Router();

// router.get('/checkauthencation', verifyToken, (req, res, next) => {
//     res.send('You are logged in.')
// })

// router.get("/checkuser/:id", verifyUser, (req, res, next) => {
//     res.send("You are logged in and you can delete your account")
// })

// router.get("/checkadmin/:id", verifyAdmin, (req, res, next) => {
//     res.send("Hello Admin, You are logged in and you can delete all your account")
// })

//UPDATE
router.put("/:id", verifyUser, updateUser);

//DELETE
router.delete("/:id", verifyUser, deleteUser);

//GET
router.get("/:id", verifyUser, getUser);

//GET ALL
router.get("/", verifyAdmin, getUsers);

export default router