import { findAllUsers, findCurrentUser, update, remove} from "../repositories/userRepo.js"

export async function getAllUsers() {
    return await findAllUsers();
}

export async function getCurrentUser(req, res) {
    return await findCurrentUser(req, res);
}

export async function updateUser(id, data) {
    const updatedUser = await update(id, data);
    if (updatedUser) return updatedUser;

    else {
        const error = new Error(`Cannot find user with id ${id}`);
        error.status = 404;
        throw error;
    }
}

/*
export async function updatePost(id, data) {
  const updatedPost = await update(id, data);
  if (updatedPost) return updatedPost;
  else {
    const error = new Error(`Cannot find post with id ${id}`);
    error.status = 404;
    throw error;
  }
}
*/

export async function deleteUser(id) {
    const result = await remove(id);
    if (result) return;

    else {
        const error = new Error(`Cannot find user with id ${id}`);
        error.status = 404;
        throw error;
  }
}

/*
export async function deletePost(id) {
  const result = await remove(id);
  if (result) return;
  else {
    const error = new Error(`Cannot find post with id ${id}`);
    error.status = 404;
    throw error;
  }
}
*/

