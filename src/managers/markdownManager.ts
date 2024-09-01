// import <
import { 

   Properties,
   BuildParams,
   ElementResources,
   ConstructorParams,
   ElementDescriptions,
   ExtractPropertiesParams

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


   extractProperties({file}: ExtractPropertiesParams): Properties {

      console.log('delimeter', markdownConfig.splitDelimeter); // remove
      console.log(typeof markdownConfig.splitDelimeter); // remove

      var properties: Properties = {};
      var currentSubject: string = '';
      for (const line of file.split(markdownConfig.splitDelimeter)) {

         console.log(file.split(markdownConfig.splitDelimeter)); // remove

         for (const [prop, regex] of Object.entries(markdownConfig.propertyRegexes)) {

            let url: string = '';
            let hyperlink: string = '';
            const result: string[] = line.split(regex);
            const current: string = result[markdownConfig.splitTargetIndex]?.replace(' ', '-');

            if (result.length == markdownConfig.splitExpectedSize) {

               switch (prop) {

                  case 'subject':

                     console.log('subject'); // remove

                     currentSubject = current;
                     url = `${octokitConfig.source}/${currentSubject}`;
                     hyperlink = `[\`${currentSubject}\`](${url}/${octokitConfig.file})`;

                     properties[currentSubject] = {
                        
                        'url' : url,
                        'name' : current,
                        'ecosystem' : {}, 
                        'hyperlink' : hyperlink
                     
                     };
                     break;

                  case 'topic':

                     console.log('topic'); // remove

                     url = `${octokitConfig.source}/${currentSubject}/${current}`;
                     hyperlink = `[\`${current}\`](${url}/${octokitConfig.file})`;

                     properties[currentSubject]['ecosystem'][current] = {

                        'url' : url,
                        'name' : current,
                        'hyperlink' : hyperlink

                     };
                     break;

               }

            }
      
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
         `# [${octokitConfig.owner}](${octokitConfig.source})`,
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