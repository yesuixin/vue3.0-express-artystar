/*
 * @,@Author: ,: your name
 * @,@Date: ,: 2020-11-24 10:14:39
 * @,@LastEditTime: ,: 2020-11-24 10:15:29
 * @,@LastEditors: ,: your name
 * @,@Description: ,: In User Settings Edit
 * @,@FilePath: ,: \serve\models\Chat.js
 */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const ChatSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    count: {
        type: Number
    },
    user_id: {
        type: String,
        required: true
    },
    message: [
        {
            source: {
                type: String,
                required: true
            },
            msg: {
                type: String,
                required: true
            }
        }
    ],
    target: {
        avatar: {
            type: String
        },
        name: {
            type: String,
            required: true
        },
        _id: {
            type: String,
            required: true
        }
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = Chat = mongoose.model('chat', ChatSchema);