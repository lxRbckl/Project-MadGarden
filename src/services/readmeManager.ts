// import <
import { 

   Properties,
   setReadmeParams,
   PropertyRegexes,
   ConstructorParams,
   GetPropertiesParams,

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


   getProperties({readme}: GetPropertiesParams): Properties {

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


   async setReadme({

      topic,
      subject,
      resource,
      properties,
      description

   }: setReadmeParams): Promise<string> {

      var links: string[] = [];
      for (let i: number = 0; i < properties['urls'].length; i++) {

         const project: string = properties['projects'][i];
         const url: string = properties['urls'][i];

         links.push(`[\`${project}\`](${url})`);

      }

      // if (subject->topic) <
      // else if (subject) <
      if (topic) {

         

      }

      else if (subject) {

         

      }

      // >

      return 'ok';

   }


}