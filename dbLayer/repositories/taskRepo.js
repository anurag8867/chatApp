var MongoClient = require('mongodb').MongoClient,
    config = require('../../config');

exports.post = function (db, query, req, res) {
    try {
        var dbo = db.db(config.databaseName);
        dbo.collection(config.collectionName.tasks).insertOne(query, function (err, result) {
            if (err) {
                console.log("An error occured while inserting the record", err);
                res.status(500).json({
                    success: false,
                    message: 'An Error occured while inserting the record',
                    error: err
                });
            } else {
                console.log("Record inserted successfully");
                res.status(200).json({
                    success: true,
                    message: "document inserted operation",
                    data: result
                });
            }
        });
    } catch (e) {
        console.log("An Exception occured while inserting the record", e);
        res.status(500).json({
            success: false,
            message: 'An Error occured while inserting the record',
            error: e
        });
    }
};

exports.get = function (db, query, req, res) {
    try {
        var dbo = db.db(config.databaseName);
        dbo.collection(config.collectionName.tasks).find(query).toArray(function (err, result) {
            if (err) {
                console.log("An error occured while inserting the record", err);
                res.status(500).json({
                    success: false,
                    message: 'An Error occured while searching the record',
                    error: err
                });
            } else {
                console.log("Record fethed successfully");
                res.status(200).json({
                    success: true,
                    message: "document fetched",
                    data: result
                });
            }
        });
    } catch (e) {
        console.log("An Exception occured while searching the record", e);
        res.status(500).json({
            success: false,
            message: 'An Error occured while searching the record',
            error: e
        });
    }
};

exports.put = function (db, searchQuery, updateQuery, req, res) {
    try {
        var dbo = db.db(config.databaseName);
        dbo.collection(config.collectionName.tasks).updateOne(searchQuery, updateQuery, function (err, result) {
            if (err) {
                console.log("An error occured while inserting the record", err);
                res.status(500).json({
                    success: false,
                    message: 'An Error occured while updating the record',
                    error: err
                });
            } else {
                console.log("Record updated successfully");
                res.status(200).json({
                    success: true,
                    message: "document updated operation",
                    data: result
                });
            }
        });
    } catch (e) {
        console.log("An Exception occured while updating the record", e);
        res.status(500).json({
            success: false,
            message: 'An Error occured while updating the record',
            error: e
        });
    }
};

exports.delete = function (db, query, req, res) {
    try {
        var dbo = db.db(config.databaseName);
        dbo.collection(config.collectionName.tasks).deleteOne(query, function (err, result) {
            if (err) {
                console.log("An error occured while inserting the record", err);
                res.status(500).json({
                    success: false,
                    message: 'An Error occured while deleting the record',
                    error: err
                });
            } else {
                console.log("Record deleted successfully");
                res.status(200).json({
                    success: true,
                    message: "document delete operation",
                    data: result
                });
            }
        });
    } catch (e) {
        console.log("An Exception occured while deleting the record", e);
        res.status(500).json({
            success: false,
            message: 'An Error occured while deleting the record',
            error: e
        });
    }
};