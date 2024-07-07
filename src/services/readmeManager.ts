import { 

   GetPropertiesParams,
   ElementDescriptions,
   ConstructorParams,
   ElementResources,
   setReadmeParams,
   PropertyRegexes,
   Properties

} from '../typings/readmeManager';

// >


export default class readmeManager {


   private readonly _propertyTargetIndex: number;
   private readonly _propertyExpectedSize: number;
   private readonly _propertyRegexes: PropertyRegexes;
   private readonly _elementResources: ElementResources;
   private readonly _elementDescriptions: ElementDescriptions;


   constructor({
   
      propertyRegexes,
      elementResources,
      elementDescriptions,
      propertyTargetIndex,
      propertyExpectedSize

   }: ConstructorParams) {

      this._propertyRegexes = propertyRegexes;
      this._elementResources = elementResources;
      this._elementDescriptions = elementDescriptions;
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
      properties

   }: setReadmeParams): Promise<string> {

      var readme: string = '';
      const title: string = (topic ? topic : subject);
      const resource: string[] = this._elementResources[title];
      const description: string = this._elementDescriptions[title];

      // title, description?, breaker <
      readme += `${title}\n`;
      readme += (description ? `> ${description}\n` : '');
      readme += `\n---\n\n`;

      // >

      // if (subject) <
      if ('ecosystem' in properties) {

         var topics: string[] = [];
         for (const t of Object.values(properties['ecosystem'])) {

            topics.push(t['url']);

         }

         // ecosystem, breaker <
         readme += '### Ecosystem\n';
         readme += `${topics.join('\n')}\n`;
         readme += '\n# \n\n';

         // >

      }

      // >

      // projects, breaker <
      readme += '### Projects\n';
      readme += `${properties['projects'].join('\n')}\n`;
      readme += (resource ? '\n# \n\n' : '\n---');

      // >

      // resources?, breaker <
      readme += (resource ? '### Resources\n' : '');
      readme += (resource ? `${resource.join('\n')}\n` : '');
      readme += (resource ? '\n---' : '');

      // >

      return readme;

   }


}