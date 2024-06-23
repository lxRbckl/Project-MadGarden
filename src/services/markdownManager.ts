// import <
import { 

   Properties,
   PropertyKeys,
   PropertyRegex,
   ConstructorParams

} from '../typings/markdownManager';

// >


export default class markdownManager {


   private _markdownBuildsURL: string;
   private _propertyRegex: PropertyRegex;


   constructor({

      markdownBuildsURL

   }: ConstructorParams) {

      this._markdownBuildsURL = markdownBuildsURL;

      this._propertyRegex = {

         'topics' : /\[`([^`]*)`\]/,
         'subjects' : /\[\*\*`([^`]*)`\*\*\]/

      };  
      
   }


   // async setMarkdown(): string {



   // }


   getProperties(readme: string): Properties {

      const targetIndex: number = 1;
      const expectedSize: number = 3;
      var properties: Properties = {};
      var currentLanguage: string = '';
      for (const line of readme.split('\n')) {

         for (const [prop, regex] of Object.entries(this._propertyRegex)) {

            let result: string[] = line.split(regex);

            if (result.length == expectedSize) {

               switch (prop) {

                  case 'subjects':

                     currentLanguage = result[targetIndex];
                     properties[currentLanguage] = [];
                     break;

                  case 'topics': 
                  
                     properties[currentLanguage].push(result[targetIndex]);
                     break;

               }

            }

         }

      }

      return properties;

   }


}