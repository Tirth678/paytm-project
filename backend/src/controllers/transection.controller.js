import accountModel from "../models/account.model.js";
import mongoose from 'mongoose'

const getBalance = async (req, res) => {
    try {
        const account = await accountModel.findOne({
            userId: req.userId
        })

        if(!account){
            return res.status(404).json({message: "Account not found"})
        }

        return res.json({balance: account.balance})

    } catch (error) {
        return res.status(500).json({message: "Error in fetching balance", error: error.message});
    }
}

const transferAmount = async (req, res) => {
    
    // start transaction
    const session = await mongoose.startSession();
    session.startTransaction();
    
    try {
        const {amount, to} = req.body;
        
        // fetch the accounts for transactions
        const account = await accountModel.findOne({userId: req.userId}).session(session);

        if(!account || account.balance < amount){
            await session.abortTransaction();
            return res.status(400).json({
                message: "Insufficient balance"
            });
        }

        const toAccount = await accountModel.findOne({userId: to}).session(session);

        if(!toAccount){
            await session.abortTransaction();
            return res.status(400).json({
                message: "Invalid account"
            });
        }

        // perform the transaction
        await accountModel.updateOne({userId: req.userId}, {$inc: {balance: -amount}}).session(session);
        await accountModel.updateOne({userId: to}, {$inc: {balance: amount}}).session(session);

        // finally commit the transaction
        await session.commitTransaction();

        res.json({
            message: "Transfer successful"
        });
    } catch (error) {
        await session.abortTransaction();
        return res.status(500).json({message: "Transfer failed", error: error.message});
    } finally {
        session.endSession();
    }
}

export {getBalance, transferAmount};