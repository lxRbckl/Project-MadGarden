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

      var properties: Properties = {};
      var currentSubject: string = '';
      var extractedProperty: string = '';
      for (const line of file.split(markdownConfig.fileDelimeter)) {

         if (markdownConfig.propertyRegexes['subject'].test(line)) {

            extractedProperty = line.split(markdownConfig.propertyRegexes['subject'])[1];
            extractedProperty = extractedProperty.replace(' ', '-');
            currentSubject = extractedProperty;

            properties[currentSubject] = {

               'ecosystem' : {},
               'hyperlink' : line,
               'name' : extractedProperty,
               'url' : `${octokitConfig.tree}/${extractedProperty}`

            };

         }

         if (markdownConfig.propertyRegexes['topic'].test(line)) {

            extractedProperty = line.split(markdownConfig.propertyRegexes['topic'])[1];
            extractedProperty = extractedProperty.replace(' ', '-');

            properties[currentSubject]['ecosystem'][extractedProperty] = {

               'hyperlink' : line,
               'name' : extractedProperty,
               'url' : `${octokitConfig.tree}/${currentSubject}/${extractedProperty}`

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
         '\n## Experience\n',
         projects.join(' '),
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