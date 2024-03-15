import express from 'express'
import { register, login } from '../controllers/authController.js'

const authRouter = express.Router();

// Define a handler function for GET /register
function consoleName(req, res) {
    res.send('Fense n Raju SIndhabad!');
}

authRouter.post('/login', login);
authRouter.get('/register', consoleName);
authRouter.post('/register', register);

export default authRouter;

// import express from 'express'

// const router = express.Router()

// function consoleName(req, res) {
//     res.send('Hello Theree');
// }

// router.get('/hello', consoleName)

// export default router;