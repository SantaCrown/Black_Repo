import express from 'express';
import jwt from 'jsonwebtoken';
import process from 'process';
import passport from 'passport';
import validator from 'validator'; // Install this package using: npm install validator
import crypto from 'crypto';
import Account from '../models/account.js'
import Credential from '../models/credential.js'
import Connector from '../models/connector.js'
import Bot from '../models/bot.js'
import User from '../models/user.js';
import Trading from '../models/strategy.js';
import Order from '../models/orderBook.js'
import MarketPrice from '../models/marketPrice.js';
import mongoose from 'mongoose';
import ccxt from 'ccxt';
import dotenv from 'dotenv'
import getOrderBook from '../controller/getOrderBook.js'
import getMarketPrice from '../controller/getMarketprice.js'
import fetchMarketData from '../controller/fetchOrder.js';
import runningBot from '../controller/botRunning.js'
import axios from 'axios';
import kuCoinBot from '../controller/kucoin.js';
import uniswapBot from '../controller/uniswap.js';
import bot from '../models/bot.js';
import swapController from '../controller/contractFunc.js';
import addLiquidity from '../controller/addLiquidity.js'
import removeLiquidity from '../controller/removeLiquidity.js'
// import 
dotenv.config();

const router = express.Router();

router.post('/add-account', async (req, res) => {
	const name = req.query.account_name
	const addAccount = new Account({ name: name })
	await addAccount.save()
	return res.send({ msg: "add account success" })
})

router.get('/list-accounts', async (req, res) => {
	const accounts = await Account.find({}, 'name'); // Select only the 'name' field
	const accountsArray = accounts.map(item => item.name); // Create an array of names
	res.send({ accounts })
})

router.post('/delete-account', async (req, res) => {
	const delName = req.query.account_name

	const result = await Account.findByIdAndDelete(delName)
	if (result) {
		return res.send({ msg: 'success' })
	} else {
		return res.send({ msg: "fatal" })
	}
})

router.get('/available-connectors', async (req, res) => {
	const connectors = await Connector.find({}, 'name')
	return res.send({ connectors })
})

router.post('/add-connector-keys/:account_name/:connector', async (req, res) => {
	const { account_name, connector } = req.params;
	const apikey = req.body;
	let Credential_name;
	let Credential_connector;
	if (mongoose.Types.ObjectId.isValid(account_name)) {
		Credential_name = new mongoose.Types.ObjectId(account_name);
	} else {
		console.error('Invalid ObjectId string:', account_name);
	}

	if (mongoose.Types.ObjectId.isValid(connector)) {
		Credential_connector = new mongoose.Types.ObjectId(connector);
	} else {
		console.error('Invalid ObjectId string:', connector);
	}
	const addCredential = new Credential(
		{
			name: Credential_name,
			connector: Credential_connector,
			apikey: apikey
		}
	)
	await addCredential.save()
	return res.send({ msg: "add credential success" })
})

router.get('/list-credentials/:account_name', async (req, res) => {
	const { account_name } = req.params;
	const credentials = await Credential
		.find({ name: account_name })
		.populate('name')
		.populate('connector');

	return res.send({ credentials });
});

router.post('/bot-config', async (req, res) => {
	const botName = req.body.botName
	const size = req.body.size
	const profit = req.body.profit
	const spread = req.body.spread
	const mode = req.body.mode
	const connector = req.body.connectorValue
	const trading = req.body.tradingValue
	const refreshTime = req.body.refreshT
	const coolTime = req.body.coolT


	console.log('botName', botName);
	console.log('size', size);
	console.log('profit', profit);
	console.log('spread', spread);
	console.log('mode', mode);
	console.log('connector', connector);
	console.log('trading', trading);
	console.log('refreshTime', refreshTime);
	console.log('coolTime', coolTime);

	try {
		const key = Object.keys(connector).find(key => connector[key]);
		const resId = await Connector.find({
			name: key.toLowerCase()
		})
		const id = resId[0]._id

		const tradingFirst = Object.keys(trading)[0].toUpperCase()
		const tradingSecond = Object.keys(trading)[1].toUpperCase()
		const botStyle = key.toLocaleLowerCase()

		// if (botStyle === 'kucoin') {

		// 	kuCoinBot(
		// 		tradingFirst,
		// 		tradingSecond,
		// 		botName,
		// 		size,
		// 		profit,
		// 		spread,
		// 		trading,
		// 		connector,
		// 		mode,
		// 		botStyle,
		// 		refreshTime,
		// 		coolTime
		// 	)
		// }

		if (key.toLocaleLowerCase() === 'uniswap') {

			uniswapBot(
				tradingFirst,
				tradingSecond,
				botName,
				size,
				profit,
				spread,
				trading,
				connector,
				mode,
				botStyle,
				refreshTime,
				coolTime
			)
		}

		return true;

	} catch (error) {
		console.error('Error verifying KuCoin API credentials:', error.message);
		return false;
	}
})

router.get('/get-strategy', async (req, res) => {
	try {
		const strategy = await Bot.find()
		return res.send({
			strategy
		})
	} catch (err) {
		console.log("error", err);
	}
})


router.get('/bot-get', async (req, res) => {
	console.log('here is the get bot data___');

	const botData = await Bot.find()
	return res.send(botData)
})

router.post('/bot-start', async (req, res) => {
	console.log("___bot running page___");

	const botType = req.body.id
	const selectBot = await bot.find({ _id: botType })

	if (selectBot[0]?.status) {
		return res.send({ msg: "already running!" })
	} else {
		selectBot[0].status = true
		await selectBot[0].save()
		const botSelect = selectBot[0]?.botStyle
		const tradingPairFirst = Object.keys(selectBot[0].trading)[0].toUpperCase()
		const tradingPairSecond = Object.keys(selectBot[0].trading)[1].toUpperCase()
		const id = selectBot[0]._id
		runningBot(botSelect, tradingPairFirst, tradingPairSecond, id)
		return res.send({ msg: "Order success!!!!!!!" })
	}
})


router.post('/bot-stop', async (req, res) => {
	const botId = req.body.id
	console.log('botId', botId);
	const selectBot = await Bot.find({
		_id: botId
	})

	selectBot[0].status = false
	await selectBot[0].save()

	return res.send({ msg: 'Bot is stopped' })
})


router.post("/token-swap", async (req, res) => {

	console.log('here is the token swap controoler connection');

	const { tokenSymbolA, tokenSymbolB, tokenAmountA, userAddress } = req.body

	// console.log('baseToken', req.body.tokenSymbolA);
	// console.log('quoteToken', req.body.tokenSymbolB);
	// console.log('amount', req.body.tokenAmountA);
	// console.log('address', req.body.userAddress);

	console.log('toke', tokenAmountA);

	swapController(tokenSymbolA, tokenSymbolB, tokenAmountA, userAddress)
	// return res.send({ msg: "success" })

})

router.post("/add-liquidity", async (req, res) => {

	console.log('here is the add liqudity page');
	const { tokenA, tokenB, amountA, amountB } = req.body
	addLiquidity(tokenA, tokenB, amountA, amountB)

})

router.post("/remove-liquidity", async (req, res) => {

	console.log('here is remove liquidity page');
	const { tokenId, liquidity } = req.body

	removeLiquidity(tokenId, liquidity)
})

export default router;
