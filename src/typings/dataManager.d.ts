// typings <


// >


// interfaces <
export interface ConstructorParams {

   octokitOwner: string;
   octokitToken: string;
   githubUsersURL: string;
   markdownBuildsURL: string;

}


export interface Topic {

   'projects'?: string[];
   'resources'?: string[];
   'description'?: string;

}


export interface Subject {

   'projects'?: string[];
   'ecosystem'?: string[];
   'description'?: string;

}


export interface Data {

   'subjects'?: Subect[];
   'topics'?: Topic[];

}

// >