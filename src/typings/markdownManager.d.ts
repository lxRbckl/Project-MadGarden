// types <
export type PropertyKeys = 'subjects' | 'topics';

// >


// interfaces <
export interface ConstructorParams {

   markdownBuildsURL: string

}


export interface PropertyRegex {

   'subjects' : RegExp;
   'topics' : RegExp;

}


export interface Properties {

   [key: string]: string[];

}

// >