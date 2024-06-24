// types <
export type PropertyKeys = 'subjects' | 'topics';

// >


// interfaces <
export interface PropertyRegexes {

   'subjects' : RegExp;
   'topics' : RegExp;

}


export interface MarkdownBuilds {

   [key: string]: string;

}


export interface ElementResources {

   [key: string]: string;

}


export interface ElementDescriptions {

   [key: string]: string;

}


export interface ConstructorParams {

   propertyTargetIndex: number;
   propertyExpectedSize: number;
   propertyRegexes: PropertyRegexes;

   markdownBuilds: MarkdownBuilds;
   elementResources: ElementResources;
   elementDescriptions: ElementDescriptions;

}


export interface Properties {

   [key: string]: string[];

}

// >