// imports <
import { Properties } from './markdownManagerTypes';

// >


// types <


// >


// interfaces <
export interface AddPropertiesParams {

   readmeHyperlink: ReadmePath;
   readmeProperties: Properties;

}


export interface DelSubjectParams {

   subject: string;

}


export interface Topic {

   'url': string;
   'hyperlink': string;
   'projects': string[];

}


export interface Subject {

   'url': string;
   'hyperlink': string;
   'projects': string[];
   'ecosystem': {[key: string]: Topic};

}


export interface Data {

   [key: string]: Subject;

}

// >
