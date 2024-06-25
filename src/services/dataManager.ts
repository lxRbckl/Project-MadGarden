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

         
         
         // >

         // if (new topic) <


         // >

      }

   }


   getData(): Data {return this._data;}


}