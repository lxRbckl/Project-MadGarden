// imports <
import { Topic, Subject } from './dataManager';

// >


// types <
export type ElementResources = {[key: string]: string[]};
export type ElementDescriptions = {[key: string]: string};

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
   elementResources: ElementResources;
   elementDescriptions: ElementDescriptions;

}


export interface Properties {

   [key: string]: string[];

}


export interface setReadmeParams {

   topic?: string;
   subject: string;
   properties: Topic | Subject;

}

// >