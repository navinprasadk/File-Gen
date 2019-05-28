const mongoose = require('mongoose');
var autoIncrement = require('mongoose-auto-increment');
mongoose.Promise = global.Promise;

const toolsEntity = new mongoose.Schema({
    toolUniqueName: String,
    toolName: String,
    imageUrl: {
        type: String,
        default: '../../assets/image/toolSet.jpg'
    },
    toolUrl: {
        type: String,
        default: ''
    },
    userName: {
        type: String,
        default: ''
    },
    password: {
        type: String,
        default: ''
    },
    accessToken: {
        type: String,
        default: ''
    },
    toolType: {
        type: String,
        default: ''
    },
    toolSaveInfo: {
        type: String,
        default: ''
    }
});
autoIncrement.initialize(mongoose.connection);
let ToolsEntity = mongoose.model('toolstemplate', toolsEntity);
module.exports = ToolsEntity;
    