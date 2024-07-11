// imports <
import { 
   
   Properties,
   PropertyTopic,
   PropertySubject

} from './markdownManagerTypes';

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


export interface DataTopic extends PropertyTopic {

   'projects': string[];

}


export interface DataSubject extends PropertySubject {

   'projects': string[];
   'ecosystem': {[key: string]: DataTopic};
   
}


export interface Data {

   [key: string]: DataSubject;

}

// >
