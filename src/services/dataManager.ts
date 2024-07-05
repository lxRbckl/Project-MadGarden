// import <
import { 
   
   Data, 
   Topic, 
   Subject,
   AddPropertiesParams

} from '../typings/dataManager';

// >


export default class dataManager {


   private _data: Data;


   constructor() {this._data  = {};}


   addProperties({

      properties,
      publishSource,
      readmeProjectPath

   }: AddPropertiesParams): void {

      for (const [subject, topics] of Object.entries(properties)) {

         // if (new subject) <
         if (!(Object.keys(this._data)).includes(subject)) {

            this._data[subject] = {

               'urls' : [],
               'projects' : [],
               'ecosystem' : {},
               'url' : `${publishSource}/${subject}/README.md`

            } as Subject;

         }

         // >

         // add subject to data <
         const project: string = `${readmeProjectPath['repo']} ${readmeProjectPath['branch']}`;

         this._data[subject]['urls']?.push(readmeProjectPath['url']);
         this._data[subject]['projects']?.push(project);

         // >

         // iterate (subject->ecosystem) <
         for (const t of topics) {

            // if (new topic) <
            if (!(Object.keys(this._data[subject]['ecosystem']!).includes(t))) {

               this._data[subject]['ecosystem']![t] = {

                  'urls' : [],
                  'projects' : [],
                  'url' : `${publishSource}/${subject}/${t}/README.md`

               } as Topic;

            }

            // >

            // add subject->ecosystem->topic to data <
            this._data[subject]['ecosystem']![t]['projects']?.push(project);
            this._data[subject]['ecosystem']![t]['urls']?.push(readmeProjectPath['url']);

            // >

         }

         // >

      }

   }


   getData(): Data {return this._data;}


}