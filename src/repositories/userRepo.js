import prisma from '../config/db.js'

export async function createUser(data) {
    return await prisma.user.create({data: data, omit: {password: true}});
}

export async function findUserByEmail(email) {
    return await prisma.user.findUnique({where: {email}});
}

export async function findAllUsers() {
    return await prisma.user.findMany({omit: {password: true}});
}

export async function findCurrentUser(req, res) {
    return await prisma.user.findUnique({where: {id: req.user.id}, omit: {password: true}});
}

export async function update(id, updates) {
    try {
        const updatedUser = await prisma.user.update({
        where: { id },
        data: updates,
        });
        return updatedUser;
    } catch (error) {
        if (error.code === 'P2025') return null;
        throw error;
    }
}

/*
export async function update(id, updates) {
  try {
    const updatedPost = await prisma.post.update({
      where: { id },
      data: updates,
    });
    return updatedPost;
  } catch (error) {
    if (error.code === 'P2025') return null;
    throw error;
  }
}
*/

export async function remove(id) {
  try {
    

    const deletedUser = await prisma.user.delete({
      where: { id },
    });
    return deletedUser;
  } catch (error) {
    if (error.code === 'P2025') return null;
    throw error;
  }
}

export async function updateUsersRole(id, role) {
  try {
    console.log(id, role)
    const result =  await prisma.user.update({
      where: {id},
      data: {role},
      select: {
        id: true,
        email: true
      }
    })

    return result;
  } catch (error) {
    if (error.code === 'P2025') {
      const error = new Error(`Cannot find user with id ${id}`);
      error.status = 404;
      throw error;
    }
    throw error;
  }
}