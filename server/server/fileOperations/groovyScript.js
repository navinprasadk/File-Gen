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
const execute_shell = command => {
  const str = " sh '$$COMMAND$$' ";
  result = str.replace("$$COMMAND$$", command);
  return result;
};

// Function to return the groovy script for Windows Batch script step
const execute_batch = command => {
  const str = " bat '$$COMMAND$$' ";
  result = str.replace("$$COMMAND$$", command);
  return result;
};

// Function to return the groovy script for power shell script step
const execute_powershell = command => {
  const str = " powershell '$$COMMAND$$' ";
  result = str.replace("$$COMMAND$$", command);
  return result;
};

// Function to return the groovy script for building the job
const build_job = jobname => {
  const str = " build '$$JOBNAME$$' ";
  result = str.replace("$$JOBNAME$$", jobname);
  return result;
};

// Function to return the groovy script for email step
const email = (to, cc, bcc, from, subject, body) => {
  const str =
    " mail bcc: '$$BCC$$', body: '$$BODY$$', cc: '$$CC$$', from: '$$FROM$$', replyTo: '$$TO$$', subject: '$$SUBJECT$$'  ";
  result = str
    .replace("$$TO$$", to)
    .replace("$$CC$$", cc)
    .replace("$$BCC$$", bcc)
    .replace("$$FROM$$", from)
    .replace("$$SUBJECT$$", subject)
    .replace("$$BODY$$", body);

  return result;
};

// Function to return the groovy script for present working directory
const present_directory = () => {
  const str = " pwd() ";
  result = str;
  return result;
};

// Function to return the groovy script for load the shared library
const load_library = library => {
  const str = " library '$$LIBRARY$$' ";
  result = str.replace("$$LIBRARY$$", library);
  return result;
};

// Function to return the groovy script for echo
const echo = expression => {
  const str = " echo '$$EXPRESSION$$' ";
  result = str.replace("$$EXPRESSION$$", expression);
  return result;
};

// Function to return the groovy script for change the directory
// const change_directory = directory => {
//   const str = " cd '$$DIRECTORY$$' ";
//   result = str.replace("$$DIRECTORY$$", directory);
//   return result;
// };

// Function to return the groovy script for delete the directory
const delete_directory = () => {
  const str = " deleteDir() ";
  result = str;
  return result;
};

// Function to return the groovy script for archiving the artifacts
const archive_artifacts = source => {
  const str = " archiveArtifacts '$$SOURCE$$' ";
  result = str.replace("$$SOURCE$$", source);
  return result;
};

module.exports = {
  git_clone,
  execute_shell,
  execute_batch,
  execute_powershell,
  build_job,
  email,
  present_directory,
  load_library,
  echo,
  delete_directory,
  archive_artifacts
};
