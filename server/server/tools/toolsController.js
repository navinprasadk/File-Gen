var toolsEntity = require('./toolsEntity.js');

let toolsController = {
    getAllTools(){
        console.log("inside getAllTools");
        return toolsEntity
        .find()
        .then(tool => {
          console.log("inside getAll Tools", tool);
          return tool;
        })
        .catch(err =>
          res.status(404).json({
            error: "Error in getting tools"
          })
        );
    },
    getToolServerDetails: function (rigletName, toolUniqueName, successCB, errorCB) {
        console.log(rigletName, toolUniqueName);
        return new Promise((resolve, reject) => {
            toolsEntity 
                .find({
                    toolUniqueName: toolUniqueName
                })
                .then(toolsInfo => {
                    console.log("tools.........", toolsInfo)
                    if (toolsInfo.length != 0) {
                        if (toolsInfo[0].toolSaveInfo == "vault") {
                //         let vaultUrl = "";
                //         let vaultAccessToken = "";
                //         toolsEntity.find({
                //             toolName: "vault"
                //         }, function (err, data) {
                //             if (err) {
                //                 errorCB(err);
                //             } else {
                //                 for (let c of res[0].toolsUsed) {
                //                     if (c.toolName == toolName) {
                //                         axios({
                //                                 method: 'get',
                //                                 url: data[0].toolUrl + `/v1/secret/tools/` + c.toolUniqueName,
                //                                 headers: {
                //                                     "X-Vault-Token": data[0].accessToken
                //                                 }
                //                             })
                //                             .then(function (response) {
                //                                 let serverData = {};
                //                                 serverData['url'] = response.data.data[c.toolUniqueName].ToolSet_name.url;
                //                                 serverData['userName'] = response.data.data[c.toolUniqueName].ToolSet_name.userName;
                //                                 serverData['password'] = response.data.data[c.toolUniqueName].ToolSet_name.password;
                //                                 successCB(serverData);
                //                             })
                //                     }
                //                 }
                //             }
                //         })
                        } else if (toolsInfo[0].toolSaveInfo == "mongo") {
                            let serverData = {};
                            serverData['url'] = toolsInfo[0].toolUrl;
                            serverData['userName'] = toolsInfo[0].userName;
                            serverData['password'] = toolsInfo[0].password;
                            serverData['accessToken'] = toolsInfo[0].accessToken;
                            resolve(serverData);
                        }

                    }
                })
                .catch(err => {
                    reject(err);
                });
        })   
    }
}


module.exports = toolsController;