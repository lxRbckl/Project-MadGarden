const octokitManagerConfig: {

   file: string,
   tree: string,
   owner: string,
   token: string,
   branch: string,
   repository: string,
   urlGitHubUsers: string,
   excludedBranches: string[]

} = {

   token : process.env.tokenOctokit!,

   file : process.env.file!,
   tree : process.env.tree!,
   owner : process.env.owner!,
   branch : process.env.branch!,
   repository : process.env.repository!,
   
   urlGitHubUsers : process.env.urlGitHubUsers!,
   excludedBranches : process.env.excludedBranches!.split(' ')

}

// export <
export default octokitManagerConfig;

// >