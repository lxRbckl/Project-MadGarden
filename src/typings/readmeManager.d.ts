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
   propertyRegexes: PropertyRegexes;

}


export interface Properties {

   [key: string]: string[];

}


export interface setReadmeFromPropertiesParams {

   topic: string;
   subject: string;
   properties: Properties;
   type: 'subject' | 'topic';

}

// >