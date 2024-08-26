const octokitManagerConfig: {

   file: string,
   owner: string,
   token: string,
   branch: string,
   source: string,
   repository: string,
   urlGitHubUsers: string,
   excludedBranches: string[]

} = {

   token : process.env.tokenOctokit!,

   file : process.env.file!,
   owner : process.env.owner!,
   branch : process.env.branch!,
   repository : process.env.repository!,

   source : process.env.source!,
   urlGitHubUsers : process.env.urlGitHubUsers!,
   excludedBranches : process.env.excludedBranches!.split(' ')

}

// export <
export default octokitManagerConfig;

// >