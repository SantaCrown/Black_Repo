import express from 'express';
import jwt from 'jsonwebtoken';
import process from 'process';
import passport from 'passport';
import validator from 'validator'; // Install this package using: npm install validator
import crypto from 'crypto';
import Account from '../models/account.js'
import Credential from '../models/credential.js'
import Connector from '../models/connector.js'
import User from '../models/user.js';
import mongoose from 'mongoose';

const router = express.Router();

router.post('/add-account', async (req, res) => {
    console.log("add paccount age");

    const name = req.query.account_name
    const addAccount = new Account({ name: name })
    await addAccount.save()
    return res.send({ msg: "add account success" })
})

router.get('/list-accounts', async (req, res) => {
    console.log("get account page");
    const accounts = await Account.find({}, 'name'); // Select only the 'name' field
    const accountsArray = accounts.map(item => item.name); // Create an array of names
    // console.log("accounts", accountsArray);
    res.send({ accounts })
})

router.post('/delete-account', async (req, res) => {
    const delName = req.query.account_name

    console.log("delName", delName);
    const result = await Account.findByIdAndDelete(delName)
    if (result) {
        console.log('User deleted:', result);
        return res.send({ msg: 'success' })
    } else {
        console.log('User not found');
        return res.send({ msg: "fatal" })
    }
})

router.get('/available-connectors', async (req, res) => {
    console.log("get connector page");

    const connectors = await Connector.find({}, 'name')
    return res.send({ connectors })
})

router.post('/add-connector-keys/:account_name/:connector', async (req, res) => {
    console.log("add connector keys page");
    const { account_name, connector } = req.params;
    const apikey = req.body;
    console.log("account_name", account_name);
    console.log("connector", typeof connector);
    console.log("apikey", typeof apikey);
    let Credential_name;
    let Credential_connector;
    if (mongoose.Types.ObjectId.isValid(account_name)) {
        Credential_name = new mongoose.Types.ObjectId(account_name);
        console.log('Converted ObjectId:', Credential_name);
    } else {
        console.error('Invalid ObjectId string:', account_name);
    }

    if (mongoose.Types.ObjectId.isValid(connector)) {
         Credential_connector = new mongoose.Types.ObjectId(connector);
        console.log('Converted ObjectId:', Credential_connector);
    } else {
        console.error('Invalid ObjectId string:', connector);
    }
    // const Credential_name = mongoose.Types.ObjectId(account_name);
    // const Credential_connector = mongoose.Types.ObjectId(connector);

    // console.log("Credential_name", typeof Credential_name);
    
    const addCredential = new Credential(
        {
            name: Credential_name,
            connector: Credential_connector,
            apikey: apikey
        }
    )
    await addCredential.save()
    console.log("11");

    return res.send({ msg: "add credential success" })
})

router.get('/list-credentials/:account_name', async (req, res) => {
    const { account_name } = req.params;

    console.log("account_name", account_name);

    // const credentials = await Credential.find({ name: account_name }, 'connector apikey');
    const credentials = await Credential
        .find({ name: account_name })
        .populate('name')
        .populate('connector');

    console.log("credentials", credentials);
    return res.send({ credentials });
});

export default router;
