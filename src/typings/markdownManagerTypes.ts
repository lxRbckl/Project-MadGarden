// imports <


// >


// types <
export type ElementResources = {[key: string]: string[]};


export type ElementDescriptions = {[key: string]: string};

// >


// interfaces <
export interface ConstructorParams {

   elementResources: ElementResources;
   elementDescriptions: ElementDescriptions;

}


export interface ExtractPropertiesParams {

   file: string;

}


export interface Properties {

   [key: string]: {

      'url': string;
      'hyperlink': string;
      'topics': {[key: string]: {

         'url': string;
         'hyperlink': string;

      }};

   };

 }
 


export interface BuildParams {

   projects: string[];
   ecosystem?: string[];
   topic?: {name: string, hyperlink: string};
   subject: {name: string, hyperlink: string};

}

// >