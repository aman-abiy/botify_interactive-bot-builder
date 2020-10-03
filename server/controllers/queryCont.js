const mongoose = require('mongoose');
const Query = require('../models/Query');
const Response = require('../models/Response');

exports.add = async(req, res, next) => {
    req.body.subscriber = mongoose.Types.ObjectId(req.subscriber._id);
    const query = await Query.create(req.body);
    if (!query) {
        return res.status(200).json({
            status: false,
            message: 'Error creating Bot'
        })
    }
    return res.status(200).json({
        status: true,
    })
}

exports.get = async(req, res, next) => {
    const queryId = req.params.queryId;
    const query = await Query.find({ subscriber: mongoose.Types.ObjectId(req.subscriber._id), _id: queryId })
    if (!query) {
        return res.status(200).json({
            status: false,
            message: 'You have\'nt created any queries created yet'
        })
    }
    return res.status(200).json({
        status: true,
        data: query
    })
}

exports.getAllQueries = async(req, res, next) => {
    // const queries = await Query.find({ subscriber: mongoose.Types.ObjectId(req.subscriber._id) })
    const queries = await Query.aggregate([{
            $lookup: {
                from: 'responses',
                localField: '_id',
                foreignField: 'query',
                as: 'combined'
            }
        },
        {
            $match: {
                'subscriber': mongoose.Types.ObjectId(req.subscriber._id)
            }
        }
    ])

    // calculate total number of responses submitted for all queries
    let accumulator = 0;
    for (let index in queries) {
        accumulator += queries[index].combined.length
    }

    if (!queries) {
        return res.status(200).json({
            status: false,
            message: 'You have\'nt created any queries created yet'
        })
    }
    return res.status(200).json({
        status: true,
        count: queries.length,
        submitted_total: accumulator,
        data: queries
    })
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

exports.changeStatus = async(req, res, next) => {
    const queryId = req.params.queryId;

    let query = await Query.findById(queryId)
    if (!query) {
        return res.status(200).json({
            status: false,
            msg: 'No Bot found with that Id'
        })
    }

    query = await Query.findByIdAndUpdate(queryId, { status: query.status ? 0 : 1 }, {
        new: true,
        runValidators: true
    });
    if (!query) {
        return res.status(200).json({
            status: false,
            msg: 'Error updating Bot status'
        })
    }
    return res.status(200).json({
        status: true,
        data: query
    })
}