import { checkValidationResults } from "./handleValidationErrors.js";
import { body, param, oneOf } from "express-validator";
import prisma from "../config/db.js";


export const validateUser = [
    body('email')
    .exists({values: 'false'})
    .withMessage('email is required')
    .bail()
    .isEmail()
    .withMessage('email is not valid')
    .normalizeEmail(),

    body('password')
    .exists({values: 'false'})
    .withMessage('password is required')
    .bail(),
    checkValidationResults
];

export const validateUserUpdate = [
    oneOf(
        [
          body('email').exists({ values: 'falsy' }),
          body('password').exists({ values: 'falsy' }),
        ],
        {
          message:
            'At least one field (email, password) must be provided',
        },
      ),

    body('email')
    .optional()
    .bail()
    .isEmail()
    .withMessage('email is not valid')
    .normalizeEmail()
    .custom(async (value, {req}) => {
        const exists = await prisma.user.findUnique(
            {where: {email: value}}
        );

        if (exists && exists.id !== req.user.id) {
            var error = new Error('Email already in use')
            error.status = 409
            throw error;
        }
    }),
    body('password')
    .optional()
    .bail()
    .isLength({min: 8, max: 64})
    .withMessage('password must be between 8 and 64 characters'),
    checkValidationResults
]

export const validateUserPatchUpdate = [
    param('id')
    .isInt({min: 1})
    .withMessage('User ID must be a positive int')
    .bail()
    .custom(async (value) => {
        const user = await prisma.user.findUnique({
            where: {id: parseInt(value)},
        });
        if (!user) {
            throw new Error('User not found');
        }

        return true;
    }),

    body('role')
    .exists({ values: 'falsy' })
    .withMessage('role is required')
    .bail()
    .isIn(['USER', 'ADMIN'])
    .withMessage('role is invalid'),
    checkValidationResults,
];