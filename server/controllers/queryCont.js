const mongoose = require('mongoose');
const Query = require('../models/Query');

exports.add = async(req, res, next) => {
    // console.log(req.body);
    req.body.subscriber = mongoose.Types.ObjectId(req.body.subscriber);
    const query = await Query.create(req.body);
    console.log(query)
}

exports.get = async(req, res, next) => {
    req.body.subscriber = mongoose.Types.ObjectId(req.body.subscriber);
    const query = await Query.find({ subscriber: req.body.subscriber })
    console.log(query)
}

exports.update = async(req, res, next) => {
    const queryId = req.body.queryId;

    let query = await Query.findById(queryId);
    if (!query) {
        return next(new ErrorResponse(`No query found qith Id ${queryId}`), 200);
    }
    query = await Query.findByIdAndUpdate(queryId, req.body);
    return res.status(200).json({
        status: true,
        data: query
    })
}

exports.delete = async(req, res, next) => {
    const queryId = req.body.queryId;

    let query = await Query.findById(queryId);
    if (!query) {
        return next(new ErrorResponse(`No query found qith Id ${queryId}`), 200);
    }
    await Query.findByIdAndDelete(queryId);
    return res.status(200).json({
        status: true
    })
}