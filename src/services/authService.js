import bcrypt from 'bcrypt'
import { createUser, findUserByEmail } from '../repositories/userRepo.js';
import jwt from 'jsonwebtoken';
import { Prisma } from '@prisma/client';



const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN;

export async function signUp(email, password) {
    const hashedPassword = await bcrypt.hash(password, 10);

    try {
        const newUser = await createUser({email, password: hashedPassword});
        return newUser;

    } catch (error) {
        if(error instanceof Prisma.PrismaClientKnownRequestError) {
            if(error.code === 'P2002') {
                const error = new Error('Email has already been used');
                error.status = 409;
                throw error;
            }
            throw error;
        }
    }

}

export async function logIn(email, password) {
    const user = await findUserByEmail(email);
    if(!user) {
        const error = new Error('Email not found');
        error.status = 401;

        throw error;
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if(!isMatch) {
        const error = new Error('Password is incorrect');
        error.status = 401;

        throw error;
    }

    // Defensive check: ensure secret is set
    if (!JWT_SECRET) {
        const err = new Error('Server misconfiguration: JWT_SECRET not set');
        err.status = 500;
        throw err;
    }

    const accessToken = jwt.sign({id: user.id, role: user.role}, JWT_SECRET, {expiresIn: JWT_EXPIRES_IN});
    return accessToken;

}