// import <


// >


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

   file : process.env.file!,
   owner : process.env.owner!,
   token : process.env.token!,
   branch : process.env.branch!,
   source : process.env.source!,
   repository : process.env.repository!,
   urlGitHubUsers : process.env.urlGitHubUsers!,
   excludedBranches : process.env.excludedBranches!.split(' ')

}

// export <
export default octokitManagerConfig;

// >