// import <
import { 
   
   Data, 
   DelSubjectParams,
   AddPropertiesParams

} from '../typings/dataManagerTypes';

// >


export default class dataManager {


   private _data: Data;


   constructor() {this._data  = {};}


   addProperties({

      readmeHyperlink,
      readmeProperties

   }: AddPropertiesParams): void {

      // iterate (properties->subjects) <
      for (const [subject, properties] of Object.entries(readmeProperties)) {

         // if (new subject) <
         if (!(Object.keys(this._data)).includes(subject)) {

            this._data[subject] = {

               'projects' : [],
               'ecosystem' : {},
               'hyperlink' : properties.hyperlink

            };

         }

         // >

         // add project->readme to subject->projects //
         this._data[subject]['projects'].push(readmeHyperlink);

         // iterate (subject->topics) <
         for (const [t, hyperlink] of Object.entries(properties.topics)) {

            // if (new topic) <
            if (!(Object.keys(this._data[subject]['ecosystem']).includes(t))) {

               this._data[subject]['ecosystem'][t] = {

                  'projects' : [],
                  'hyperlink' : hyperlink

               };

            }

            // >

            // add project->readme to subject->ecosystem->topic->projects //
            this._data[subject]['ecosystem'][t]['projects'].push(readmeHyperlink);

         }

         // >
         
      }

   }

   // >


   // < future memory management option > //
   delSubject({subject}: DelSubjectParams): void {delete this._data[subject];}


   getData(): Data {return this._data;}


}