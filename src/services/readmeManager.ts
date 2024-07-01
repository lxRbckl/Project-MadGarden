// import <
import { Data } from '../typings/dataManager';
import { 

   Properties,
   PropertyRegexes,
   ConstructorParams,
   PublishAllReadmeCallback

} from '../typings/readmeManager';

// >


export default class readmeManager {


   private readonly _publishSource: string;
   private readonly _propertyTargetIndex: number;
   private readonly _propertyExpectedSize: number;
   private readonly _propertyRegexes: PropertyRegexes;


   constructor({
   
      publishSource,
      propertyRegexes,
      propertyTargetIndex,
      propertyExpectedSize

   }: ConstructorParams) {

      this._publishSource = publishSource;
      this._propertyRegexes = propertyRegexes;
      this._propertyTargetIndex = propertyTargetIndex;
      this._propertyExpectedSize = propertyExpectedSize;
      
   }


   getPropertiesFromReadme(readme: string): Properties {

      var properties: Properties = {};
      var currentLanguage: string = '';
      for (const line of readme.split('\n')) {

         for (const [prop, regex] of Object.entries(this._propertyRegexes)) {

            let result: string[] = line.split(regex);
            let target: string = result[this._propertyTargetIndex]?.replace(' ', '-');

            if (result.length == this._propertyExpectedSize) {

               switch (prop) {

                  case 'subjects':

                     currentLanguage = target;
                     properties[currentLanguage] = [];
                     break;

                  case 'topics': 
                  
                     properties[currentLanguage].push(target);
                     break;

               }

            }

         }

      }
   
      return properties;

   }


   async publishAllReadme(data: Data, callback: PublishAllReadmeCallback) {

      var projects: string = '';
      var ecosystem: string = '';
      var resources: string = '';
      var description: string = '';
      for (const [subject, properties] of Object.entries(data)) {

         // publish subject <
         

         // >

         // iterate (subject->ecosystem) <
         for (const topic of Object.keys(properties['ecosystem']!)) {

            // publish topic <


            // >

         }

         // >

      }

   }


}