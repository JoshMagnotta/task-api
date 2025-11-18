import { signUp, logIn } from "../services/authService.js";

// TODO: Auth Security - 1
// Time Remaining: 15 min

export async function signUpHandler(req, res) {
    const {email, password} = req.body;
    const newUser = await signUp(email, password);
    res.status(201).json({message: `New user created with id of ${newUser.id}`});
}

export async function logInHandler(req, res) {
    const {email, password} = req.body;
    const accessToken = await logIn(email, password);

    res.status(200).json({accessToken})
}