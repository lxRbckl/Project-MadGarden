// imports <
import { Properties } from './readmeManager';
import { ReadmeProjectPath } from './octokitManager';

// >


// types <


// >


// interfaces <
export interface AddPropertiesParams {

   publishSource: string;
   properties: Properties;
   readmeProjectPath: ReadmeProjectPath;

}


export interface Topic {

   'url': string;
   'urls': string[];
   'projects': string[];

}


export interface Subject {

   'url': string;
   'urls': string[];
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
