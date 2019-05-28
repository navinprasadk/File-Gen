const git_clone = (url, credential, branch) => {
    const str =
      "git branch: '$$BRANCH$$', credentialsId: '$$CREDENTIALS$$', url: '$$URL$$'";
  
    result = str
      .replace("$$BRANCH$$", branch)
      .replace("$$URL$$", url)
      .replace("$$CREDENTIALS$$", credential);
  
    return result;
  };
  
  module.exports = {
    git_clone
  };
  