import express from 'express';
import jwt from 'jsonwebtoken';
import process from 'process';
import passport from 'passport';
import validator from 'validator'; // Install this package using: npm install validator
import crypto from 'crypto';
import Account from '../models/Account.js'

import User from '../models/User.js';

const router = express.Router();

router.post('/add', async (req, res) => {
    const name = req.query.account_name

    console.log("name", name);
    
    const addAccount = new Account({
        name: name
    })
    await addAccount.save()

    return res.send({ msg: "add account success" })

    
})

export default router;
