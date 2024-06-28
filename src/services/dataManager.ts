// import <
import { Properties } from '../typings/readmeManager';
import { ReadmeFilePath } from '../typings/octokitManager';
import { Data, Topic, Subject } from '../typings/dataManager';

// >


export default class dataManager {

   private _data: Data;


   constructor() {this._data  = {};}


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

         // add subject to data <
         const project: string = `${filepath['repo']} ${filepath['branch']}`;

         this._data[subject]['urls']?.push(filepath['url']);
         this._data[subject]['projects']?.push(project);

         // >

         // iterate (subject->ecosystem) <
         for (const t of topics) {

            // if (new topic) <
            if (!(Object.keys(this._data[subject]['ecosystem']!).includes(t))) {

               this._data[subject]['ecosystem']![t] = {

                  'urls' : [],
                  'projects' : []

               } as Topic;

            }

            // >

            // add subject->ecosystem->topic to data <
            this._data[subject]['ecosystem']![t]['projects']?.push(project);
            this._data[subject]['ecosystem']![t]['urls']?.push(filepath['url']);

            // >

         }

         // >

      }

   }


   getData(): Data {return this._data;}


}