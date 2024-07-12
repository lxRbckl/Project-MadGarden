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

      var url: string = '';
      var hyperlink: string = '';
      var properties: Properties = {};
      var currentSubject: string = '';
      for (const line of file.split(markdownConfig.splitDelimeter)) {

         for (const [prop, regex] of Object.entries(markdownConfig.propertyRegexes)) {

            const result: string[] = line.split(regex);
            const target: string = result[markdownConfig.splitTargetIndex]?.replace(' ', '-');

            if (result.length == markdownConfig.splitExpectedSize) {

               switch (prop) {

                  case 'subject':

                     currentSubject = target;
                     url = `${octokitConfig.source}/${currentSubject}`;
                     hyperlink = `[\`${currentSubject}\`](${url}/${octokitConfig.file})`;

                     properties[currentSubject] = {
                        
                        'url' : url,
                        'name' : target,
                        'ecosystem' : {}, 
                        'hyperlink' : hyperlink
                     
                     };
                     break;

                  case 'topic':

                     url = `${url}/${target}/${octokitConfig.file}`;
                     hyperlink = `[\`${target}\`](${url})`;

                     properties[currentSubject]['ecosystem'][target] = {

                        'url' : url,
                        'name' : target,
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
      ecosystem

   }: BuildParams): string {

      const element: string = (topic ? topic.name : subject.name);
      const resource: string[] = this._elementResources?.[element];
      const description: string = this._elementDescriptions?.[element];

      const readme: string = [

         // (title, description, breaker) <
         `# [${octokitConfig.owner}](${octokitConfig.source})`,
         topic ? `/[${subject.name}](${subject.url})` : `/${subject.name}`,
         topic ? `/${topic.name}` : undefined,

         description ? `\n> ${description}` : undefined,
         markdownConfig.bigBreaker,

         // >

         // (ecosystem, breaker) <
         ecosystem ? `## Ecosystem\n` : undefined,
         ecosystem?.join(' '),
         ecosystem ? markdownConfig.smallBreaker : undefined,

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