// import <
import { 

   Properties,
   BuildParams,
   ElementResources,
   ConstructorParams,
   ElementDescriptions

} from '../typings/markdownManagerTypes';

import octokitConfig from '../configs/octokitManagerConfig';
import markdownConfig from '../configs/markdownManagerConfig';

// >


export default class markdownManager {

   private readonly _elementResources: ElementResources;
   private readonly _elementDescriptions: ElementDescriptions;


   constructor({elementResources, elementDescriptions}: ConstructorParams) {

      this._elementResources = elementResources;
      this._elementDescriptions = elementDescriptions;
      
   }


   extractProperties(file: string): Properties {

      var url: string = '';
      var properties: Properties = {};
      var currentSubject: string = '';
      var extractedProperty: string = '';

      for (const line of file.split(markdownConfig.fileDelimeter)) {

         if (markdownConfig.propertyRegexes['subject'].test(line)) {

            extractedProperty = line.split(markdownConfig.propertyRegexes['subject'])[1];
            extractedProperty = extractedProperty.replace(' ', '-');
            currentSubject = extractedProperty;

            url = `${octokitConfig.tree}/${extractedProperty}`;

            properties[currentSubject] = {

               'url' : url,
               'ecosystem' : {},
               'name' : extractedProperty,
               'hyperlink' : `[${extractedProperty}](${url})`

            };

         }

         if (markdownConfig.propertyRegexes['topic'].test(line)) {

            extractedProperty = line.split(markdownConfig.propertyRegexes['topic'])[1];
            extractedProperty = extractedProperty.replace(' ', '-');

            url = `${octokitConfig.tree}/${currentSubject}/${extractedProperty}`;

            properties[currentSubject]['ecosystem'][extractedProperty] = {

               'url' : url,
               'name' : extractedProperty,
               'hyperlink' : `[\`${extractedProperty}\`](${url})`

            };

         }

      }

      return properties;

   }


   build({

      topic,
      subject,
      projects,
      ecosystem = []

   }: BuildParams): string {

      const element: string = (topic ? topic.name : subject.name);
      const resource: string[] = this._elementResources?.[element];
      const description: string = this._elementDescriptions?.[element];

      return [

         // header <
         `# [${octokitConfig.owner}](${octokitConfig.tree})`
         + (topic ? `/[${subject.name}](${subject.url})` : `/${subject.name}`)
         + (topic ? `/${topic.name}` : ''),
         description ? `\n> ${description}` : '',
         markdownConfig.bigBreaker,

         // >

         // ecosystem? <
         (ecosystem.length > 0) ? '## Ecosystem\n\n' : '',
         (ecosystem.length > 0) ? ecosystem?.join(' ') : '',
         (ecosystem.length > 0) ? markdownConfig.smallBreaker : '',

         // >

         // experience? <
         (projects.length > 0) ? '## Experience\n\n' : '',
         (projects.length > 0) ? projects.join(' ') : '',
         resource ? markdownConfig.smallBreaker : '',

         // >

         // footer <
         resource ? '## Resources' : '',
         resource ? resource.join('\n') : '',
         `\n${markdownConfig.bigBreaker}`

         // >

      ].join('\n');

   }


}