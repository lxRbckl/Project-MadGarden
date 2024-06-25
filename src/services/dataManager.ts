// import <
import { Data, Subject } from '../typings/dataManager';
import { Properties } from '../typings/markdownManager';
import { ReadmeFilePath } from '../typings/octokitManager';

// >


export default class dataManager {

   private _data: Data;


   constructor() {

      this._data = {};

   }


   addPropertiesToData(properties: Properties, filepath: ReadmeFilePath): void {

      for (const [subject, topics] of Object.entries(properties)) {

         // if (new subject) <
         if (!(Object.keys(this._data)).includes(subject)) {

            this._data[subject] = {

               'urls' : [],
               'projects' : [],
               'ecosystem' : {}

            } as Subject;

         }

         // TODO
         // -- create url above the for loop ...
         // url is link to project. projects is
         // repo name and branch combined into
         // one string, add that to 'projects'.
         // once done iterate through topics and
         // follow similar steps as above, for topics

         // this._data[subject]['urls']?.push()
         
         // >

         // if (new topic) <


         // >

      }

   }


   getData(): Data {return this._data;}


}