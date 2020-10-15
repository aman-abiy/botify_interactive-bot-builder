const mongoose = require('mongoose');
const Query = require('../models/Query');
const Response = require('../models/Response');

exports.add = async(req, res, next) => {
    req.body.subscriber = mongoose.Types.ObjectId(req.subscriber._id);
    req.body.title = req.body.title.toLowerCase();
    let query = await Query.find({ title: req.body.title });
    console.log(query)
    if (query[0]) {
        return res.status(200).json({
            status: false,
            message: `A bot with the title '${req.body.title}' already exists`
        })
    }
    query = await Query.create(req.body);
    if (!query) {
        return res.status(200).json({
            status: false,
            message: 'Error creating Bot'
        })
    }
    return res.status(200).json({
        status: true,
        data: {
            id: query._id
        }
    })
}

exports.get = async(req, res, next) => {
    const queryId = req.params.queryId;
    console.log('Q', req.params.queryId)
    console.log('S', req.subscriber._id)
    const query = await Query.find({ subscriber: mongoose.Types.ObjectId(req.subscriber._id), _id: mongoose.Types.ObjectId(queryId) })
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

exports.getActive = async(req, res, next) => {
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
                'subscriber': mongoose.Types.ObjectId(req.subscriber._id),
                'status': 1
            }
        }
    ])

    // const query = await Query.find({ subscriber: mongoose.Types.ObjectId(req.subscriber._id), status: { $eq: false } })
    if (!queries) {
        return res.status(200).json({
            status: false,
            message: 'No active Bots found'
        })
    }
    return res.status(200).json({
        status: true,
        data: queries
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
    let toDeleteArray = req.params.queryIds
    toDeleteArray = toDeleteArray.split(',')
    console.log(toDeleteArray)
    toDeleteArray = toDeleteArray.map((value) => mongoose.Types.ObjectId(value))
    console.log(toDeleteArray)

    let query = await Query.find({ _id: { $in: toDeleteArray } });
    console.log(query.length, toDeleteArray.length)
    if (query.length != toDeleteArray.length) {
        return res.status(200).json({
            status: false,
            msg: 'Some bot may not exist'
        })
    }
    await Query.deleteMany({ _id: { $in: toDeleteArray } });
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