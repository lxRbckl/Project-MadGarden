// imports <
import { DataTopic, DataSubject } from './dataManagerTypes';

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


export interface PropertyTopic {

   'url': string;
   'name': string;
   'hyperlink': string;

}


export interface PropertySubject {

   'url': string;
   'name': string;
   'hyperlink': string;
   'ecosystem': {[key: string]: PropertyTopic};

}


export interface Properties {

   [key: string]: PropertySubject;

 }
 


export interface BuildParams {

   topic?: DataTopic;
   projects: string[];
   subject: DataSubject;
   ecosystem?: string[];

}

// >