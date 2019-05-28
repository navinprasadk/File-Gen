module.exports = {
    mongoUrl: "localhost:27017",
    dbName: "digitalrig",
    clientUrl:"http://localhost:3000/create",
    port: 5050,
    userRoles: ["Architect", "Manager", "SE"],
    pwdStorage: ["vault", "mongo"],
    toolCategory: ["Source Control","tools", "Continuous Integration", "Binary Repository Management","ALM tools","IDE"],
    toolNamesList: ["gerrit", "che", "jenkins", "artifactory","jira"]
};