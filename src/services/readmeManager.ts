// import <
import { Data } from '../typings/dataManager';
import { 

   Properties,
   PropertyRegexes,
   ConstructorParams,
   setReadmeFromPropertiesParams

} from '../typings/readmeManager';

// >


export default class readmeManager {


   private readonly _propertyTargetIndex: number;
   private readonly _propertyExpectedSize: number;
   private readonly _propertyRegexes: PropertyRegexes;


   constructor({
   
      propertyRegexes,
      propertyTargetIndex,
      propertyExpectedSize

   }: ConstructorParams) {

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


   async setReadmeFromProperties({

      type,
      topic,
      subject,
      properties

   }: setReadmeFromPropertiesParams) {

      switch (type) {

         case ('subject'):

            console.log();
         
         case ('topic'):

            console.log();

      }

   }


}