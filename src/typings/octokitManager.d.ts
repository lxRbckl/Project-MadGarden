// types <
export type IterateReadmeArchiveCallback = (data: ReadmeData) => void;

// >


// interfaces <
export interface ConstructorParams {

   octokitOwner: string;
   octokitToken: string;
   githubUsers: string[];
   octokitFileName: string;
   excludedBranches: string[];

}


export interface PublishReadmeParams {

   file: string;
   repo: string;
   branch: string;
   content: string;

}


export interface ReadmeProjectPath {

   'url': string;
   'repo': string;
   'owner': string;
   'branch': string;

}


export interface ReadmeData {

   'rawContent': string;
   'projectPath': ReadmeFilePath;

}

// >