// types <
// export type IterateReadmeArchiveCallback = (data: ReadmeData) => void;
export type PublishAllReadmeCallback = () => void;

// >


// interfaces <
export interface PropertyRegexes {

   'topics' : RegExp;
   'subjects' : RegExp;

}


export interface ConstructorParams {

   publishSource: string;
   propertyTargetIndex: number;
   propertyExpectedSize: number;
   propertyRegexes: PropertyRegexes;

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