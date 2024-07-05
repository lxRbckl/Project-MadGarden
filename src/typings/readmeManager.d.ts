// imports <
import { Topic, Subject } from './dataManager';

// >


// types <


// >


// interfaces <
export interface PropertyRegexes {

   'topics' : RegExp;
   'subjects' : RegExp;

}


export interface GetPropertiesParams {

   readme: string;

}


export interface ConstructorParams {

   propertyTargetIndex: number;
   propertyExpectedSize: number;
   propertyRegexes: PropertyRegexes;

}


export interface Properties {

   [key: string]: string[];

}


export interface setReadmeParams {

   topic?: string;
   subject: string;
   resource?: string;
   description?: string;
   properties: Topic | Subject;

}

// >