// Function to return the groovy script for git clone step
const git_clone = (url, credential, branch) => {
    const str =
      "git branch: '$$BRANCH$$', credentialsId: '$$CREDENTIALS$$', url: '$$URL$$'"; 
    result = str
      .replace("$$BRANCH$$", branch)
      .replace("$$URL$$", url)
      .replace("$$CREDENTIALS$$", credential);
    return result;
  };

// Function to return the groovy script for shell script step
const execute_shell = ( command ) => {
    const str = " sh '$$COMMAND$$' ";
    result = str
     .replace("$$COMMAND$$", command);
     return result;
  };

// Function to return the groovy script for Windows Bash script step
const windows_batch = ( command ) => {
  const str = " bat '$$COMMAND$$' ";
  result = str
   .replace("$$COMMAND$$", command);
   return result;
};

// Function to return the groovy script for power shell script step
const execute_powershell = ( command ) => {
    const str = " bat '$$COMMAND$$' ";
    result = str
     .replace("$$COMMAND$$", command);
     return result;
  };

// Function to return the groovy script for power shell script step
const build_job = ( jobname ) => {
  const str = " build '$$JOBNAME$$' ";
  result = str
   .replace("$$JOBNAME$$", jobname);
   return result;
};

  module.exports = {
    git_clone,
    execute_shell,
    windows_batch,
    execute_powershell,
    build_job
  };
  