// import <
import { 
   
   Data, 
   Topic, 
   Subject,
   DelSubjectParams,
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

      var projectTitle: string = '';
      var projectReadme: string = '';
      for (const [subject, topics] of Object.entries(properties)) {

         // if (new subject) <
         if (!(Object.keys(this._data)).includes(subject)) {

            this._data[subject] = {

               'projects' : [],
               'ecosystem' : {},
               'projectPath' : readmeProjectPath

            } as Subject;

         }

         // >

         projectTitle = `${readmeProjectPath['repo']} ${readmeProjectPath['branch']}`;
         projectReadme = `[\`${projectTitle}\`](${readmeProjectPath['url']})`;

         this._data[subject]['projects'].push(projectReadme);

         // iterate (subject->ecosystem) <
         for (const t of topics) {

            // if (new topic) <
            if (!(Object.keys(this._data[subject]['ecosystem']).includes(t))) {

               this._data[subject]['ecosystem'][t] = {

                  'projects' : [],
                  'url' : `[\`${t}\`](${`${publishSource}/${subject}/${t}/README.md`})`
                  
               } as Topic;

            }

            // >

            this._data[subject]['ecosystem'][t]['projects'].push(projectReadme);

         }

         // >

      }

   }


   // < future memory management option > //
   delSubject({subject}: DelSubjectParams): void {delete this._data[subject];}


   getData(): Data {return this._data;}


}