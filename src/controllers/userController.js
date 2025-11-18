import { getAllUsers, getCurrentUser, updateUser, deleteUser } from "../services/userService.js";
import bcrypt from 'bcrypt';

export async function getAllUsersHandler(req, res) {
    const users = await getAllUsers();
    res.status(200).json(users);
}

export async function getCurrentUserHandler(req, res) {
    const user = await getCurrentUser(req, res);

    res.status(200).json(user);
}

export async function setCurrentUserHandler(req, res) {
    let id = req.user.id;
    const updates = {}
    
    if (req.body.email) updates.email = req.body.email;
    if (req.body.password) updates.password = await bcrypt.hash(req.body.password, 10);

    const updatedUser = await updateUser(id, updates);
    res.status(200).json(updatedUser);

}

/*
export async function updatePostHandler(req, res) {
  let id = parseInt(req.params.id);
  const updates = {};
  if (req.body.title) updates.title = req.body.title;
  if (req.body.content) updates.content = req.body.content;

  const updatedPost = await updatePost(id, updates);
  res.status(200).json(updatedPost);
}
*/

export async function deleteCurrentUserHandler(req, res) {
    let id = req.user.id;
    await deleteUser(id);
    res.status(204).send();

}

/*
export async function deletePostHandler(req, res) {
  let id = parseInt(req.params.id);
  await deletePost(id);
  res.status(204).send();
}

*/
