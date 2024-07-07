// imports <
import { Properties } from './readmeManager';
import { ReadmeProjectPath } from './octokitManager';

// >


// types <


// >


// interfaces <
export interface ConstructorParams {

   octokitFileName: string;

}


export interface AddPropertiesParams {

   publishSource: string;
   properties: Properties;
   readmeProjectPath: ReadmeProjectPath;

}


export interface Topic {

   'url': string;
   'projects': string[];

}


export interface ProjectPath {

   'url' : string;
   'repo': string;
   'owner': string;
   'branch': string;

}


export interface Subject {

   'projects': string[];
   'ecosystem': { 
      
      [key: string]: Topic 
   
   }

}


export interface DelSubjectParams {

   subject: string;

}


export interface Data {

   [key: string]: Subject;

}

// >
