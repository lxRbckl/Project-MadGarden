// types <


// >


// interfaces <
export interface PropertyRegexes {

   'topics' : RegExp;
   'subjects' : RegExp;

}


export interface ConstructorParams {

   propertyTargetIndex: number;
   propertyExpectedSize: number;
   markdownBuilds: MarkdownBuilds;
   propertyRegexes: PropertyRegexes;
   elementResources: ElementResources;
   elementDescriptions: ElementDescriptions;

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


export interface Properties {

   [key: string]: string[];

}

// >