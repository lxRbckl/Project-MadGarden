// import <
import { Data } from './dataManagerTypes';
import { BuildParams } from './markdownManagerTypes';

// >


// types <


// >


// interfaces <
export interface ReadmeData {

   file: string;
   hyperlink: string;

}


export interface ConstructorParams {

   githubUsers: GithubUsers;

}


export interface PublishReadmeParams {

   file: string;
   content: string;

}


export interface FetchAllReadmeParams {

   callback: ({

      file,
      hyperlink

   }: ReadmeData) => void;

}


export interface PublishAllReadmeParams {

   data: Data;
   callback: ({

      topic,
      subject,
      projects,
      ecosystem

   }: BuildParams) => string;

}


// >