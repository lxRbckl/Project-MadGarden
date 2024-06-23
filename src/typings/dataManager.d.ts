// typings <


// >


// interfaces <
export interface ConstructorParams {

   octokitOwner: string;
   octokitToken: string;
   githubUsersURL: string;
   markdownBuildsURL: string;

}


export interface Project {

   'repo': string;
   'owner': string;
   'branch': string;

}


export interface Subject {

   'projects'?: Project[];
   'ecosystem'?: string[][];

}


export interface Data {

   [key: string]: Subject;

}

// >