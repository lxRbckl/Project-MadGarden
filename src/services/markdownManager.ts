// import <
import { 

   Properties,
   MarkdownBuilds,
   PropertyRegexes,
   ElementResources,
   ConstructorParams,
   ElementDescriptions

} from '../typings/markdownManager';

// >


export default class markdownManager {


   private readonly _propertyTargetIndex: number;
   private readonly _propertyExpectedSize: number;
   private readonly _markdownBuilds: MarkdownBuilds;
   private readonly _propertyRegexes: PropertyRegexes;
   private readonly _elementResources: ElementResources;
   private readonly _elementDescriptions: ElementDescriptions;


   constructor({
   
      markdownBuilds,
      propertyRegexes,
      elementResources,
      propertyTargetIndex,
      elementDescriptions,
      propertyExpectedSize

   }: ConstructorParams) {

      this._markdownBuilds = markdownBuilds;
      this._propertyRegexes = propertyRegexes;
      this._elementResources = elementResources;
      this._elementDescriptions = elementDescriptions;
      this._propertyTargetIndex = propertyTargetIndex;
      this._propertyExpectedSize = propertyExpectedSize;
      
   }


   async setReadme() {

      

   }


   getPropertiesFromReadme(readme: string): Properties {

      var properties: Properties = {};
      var currentLanguage: string = '';
      for (const line of readme.split('\n')) {

         for (const [prop, regex] of Object.entries(this._propertyRegexes)) {

            let result: string[] = line.split(regex);
            let target: string = result[this._propertyTargetIndex]

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


}