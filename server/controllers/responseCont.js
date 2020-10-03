const mongoose = require('mongoose');
const Response = require('../models/Response');
const Query = require('../models/Query');
const ErrorResponse = require('../utils/errorResponse');

exports.add = async(req, res, next) => {
    //cast queryId to type ObjectId
    req.body.query = mongoose.Types.ObjectId(req.body.query);
    let query = await Query.findById(req.body.query);
    if (!query) {
        return next(new ErrorResponse(`No related query found for this response`), 200);
    }
    const response = await Response.create(req.body);
    return res.status(200).json({
        status: true,
        data: response
    })
}


exports.get = async(req, res, next) => {
    const responseId = req.params.responseId;
    let response = await Response.findById(req.params.responseId);
    console.log(response)
    if (!response) {
        return next(new ErrorResponse(`No response found by the ID ${responseId}`), 200);
    }
    let query = await Query.findById(response.query)
    if (!query) {
        return next(new ErrorResponse(`No related query found for this response`), 200);
    }
    responseJSON = response.response_data[0]
    queryJSON = query.query_data[0]
    let dataSet = [];
    for (let x = 0; x < responseJSON.length; x++) {
        let selectedValue = null;
        let textValue = null;
        const curr = responseJSON[x][`tier${x+1}`]._path._curr;
        const query = queryJSON[x][`tier${x+1}`][`comp${curr.comp}`].query;
        selectedValue = responseJSON[x][`tier${x+1}`].optionValue;
        if (!queryJSON[x][`tier${x+1}`][`comp${curr.comp}`]._meta._textInput) {
            textValue = null;
        }
        textValue = responseJSON[x][`tier${x+1}`].textValue;
        dataSet.push({
            query,
            response: {
                selectedValue,
                textValue
            }
        })
    }
    response['response_data'] = null;
    delete response['response_data'];
    return res.status(200).json({
        status: true,
        data: {
            meta: response,
            response: dataSet
        }
    })
}

//get all responses of a bot
exports.getAll = async(req, res, next) => {
    const queryId = req.params.queryId;

    const query = await Query.findById(mongoose.Types.ObjectId(queryId));
    if (!query) {
        return res.status(200).json({
            status: false,
            msg: 'Bot with this id doesnt exist'
        })
    }
    let response = await Response.find({ query: mongoose.Types.ObjectId(queryId) });
    if (!response) {
        return res.status(200).json({
            status: false,
            msg: 'No response added yet'
        })
    }
    return res.status(200).json({
        status: true,
        count: response.length,
        data: response
    })
}

exports.update = async(req, res, next) => {
    let responseId = req.params.responseId;

    const response = await Response.findById(responseId);
    if (!response) {
        return next(new ErrorResponse(`No response found by the ID ${responseId}`), 200);
    }
    await Response.findByIdAndUpdate(responseId, req.body);
    return res.status(200).json({
        status: true,
    })
}

exports.delete = async(req, res, next) => {
    let responseId = req.params.responseId;

    const response = await Response.findById(responseId);
    if (!response) {
        return next(new ErrorResponse(`No response found by the ID ${responseId}`), 200);
    }
    await Response.findByIdAndDelete(responseId);
    return res.status(200).json({
        status: true,
    })
}

exports.getLast30Days = async(req, res, next) => {
    const queryId = req.params.queryId;

    // get date and convert to ISO Date object
    const date = new Date()
    const ISODate = date.toISOString()

    // date today
    let today = ISODate.split(/\D+/);
    today = new Date(Date.UTC(today[0], --today[1], today[2], today[3], today[4], today[5], today[6]))

    // date 30 days earlier
    let prior30Days = new Date().setDate(date.getDate() - 30);
    prior30Days = new Date(prior30Days).toISOString()
    prior30Days = prior30Days.split(/\D+/);
    prior30Days = new Date(Date.UTC(prior30Days[0], --prior30Days[1], prior30Days[2], prior30Days[3], prior30Days[4], prior30Days[5], prior30Days[6]))

    let response = await Response.aggregate([{
        $match: {
            createdAt: { $gt: prior30Days, $lt: today },
            query: mongoose.Types.ObjectId(queryId)
        }
    }])
    if (!response) {
        return res.status(200).json({
            status: false,
            data: 'No activity in the last 30 days'
        })
    }
    let days = [];
    let counts = [];
    for (let day = 0; day < 30; day++) {
        let priorDays = new Date().setDate(date.getDate() - day);
        priorDays = new Date(priorDays).toISOString()
        priorDays = priorDays.split(/\D+/);
        priorDays = new Date(Date.UTC(priorDays[0], --priorDays[1], priorDays[2], priorDays[3], priorDays[4], priorDays[5], priorDays[6]))
        let count = 0;
        for (let index in response) {
            if (response[index].createdAt.toISOString().split('T')[0] === priorDays.toISOString().split('T')[0]) {
                count++;
            }

            // console.log(priorDays.toISOString().split('T')[0], count)
        }
        days.push(day)
        counts.push(count)
    }
    return res.status(200).json({
        status: true,
        data: [days, counts]
    })
}