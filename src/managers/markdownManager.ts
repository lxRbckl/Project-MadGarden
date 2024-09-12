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
               'hyperlink' : `[${extractedProperty}](${url})`

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

      const readme: string = [

         // (title, subject, topic) <
         `# [${octokitConfig.owner}](${octokitConfig.tree})`,
         topic ? `/[${subject.name}](${subject.url})` : `/${subject.name}`,
         topic ? `/${topic.name}` : undefined,

         // >

         // (description, breaker) <
         description ? `\n> ${description}` : undefined,
         markdownConfig.bigBreaker,

         // >

         // (ecosystem, breaker) <
         (ecosystem.length > 0) ? `## Ecosystem\n` : undefined,
         (ecosystem.length > 0) ? ecosystem?.join(' ') : undefined,
         (ecosystem.length > 0) ? markdownConfig.smallBreaker : undefined,

         // >

         // (projects, breaker) <
         (projects.length > 0) ? '## Experience\n' : undefined,
         (projects.length > 0) ? projects.join(' ') : undefined,
         resource ? markdownConfig.smallBreaker : markdownConfig.bigBreaker,

         // >

         // (resources, breaker) <
         resource ? '\n## Resources\n' : undefined,
         resource ? resource.join('\n') : undefined,
         resource ? markdownConfig.bigBreaker : undefined

         // >

      ].join('');

      // >

      return readme;

   }


}