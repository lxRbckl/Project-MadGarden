// types <
export type Archive = Readme[];

// >


// interfaces <
export interface ConstructorParams {

   octokitOwner: string;
   octokitToken: string;
   githubUsers: string[];
   readmeFileName: string;
   excludeBranchMain: boolean;

}


export interface ReadmeFilePath {

   'repo': string;
   'owner': string;
   'branch': string;

}


export interface Readme {

   'content': string;
   'filepath': ReadmeFilePath;

}

// >