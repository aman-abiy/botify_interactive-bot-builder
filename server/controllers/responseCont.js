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
    return res.status(200).json({
        status: true,
        data: dataSet
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