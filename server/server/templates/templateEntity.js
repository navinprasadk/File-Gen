const mongoose = require('mongoose');
var autoIncrement = require('mongoose-auto-increment');
mongoose.Promise = global.Promise;

const TemplateEntity = new mongoose.Schema({
    templateName: String,
    templateDescription: String,
    templateSpec: [{
        type: String,
        defaut: []
    }],
    templatePath: String,
    contactPerson: {
        type: String,
        default: 'madhanan.madhu@wipro.com'
    },
    toolsUsed: [{
        toolUniqueName: String,
        toolName: String,
    }],
    type: String,
    category: String
});


autoIncrement.initialize(mongoose.connection);
let templates = mongoose.model('template', TemplateEntity);
module.exports = templates;
