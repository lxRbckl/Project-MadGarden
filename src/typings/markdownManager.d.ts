// types <
export type PropertyKeys = 'subjects' | 'topics';

// >


// interfaces <
export interface ConstructorParams {

   markdownBuildsURL: string

};


export interface Properties {

   [key: string]: string[];

}


export interface PropertyRegex {

   'subjects' : RegExp;
   'topics' : RegExp;

}

// >