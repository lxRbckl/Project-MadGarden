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
                        'topics' : {}, 
                        'hyperlink' : hyperlink
                     
                     };
                     break;

                  case 'topic':

                     url = `${url}/${target}/${octokitConfig.file}`;
                     hyperlink = `[\`${target}\`](${url})`;

                     properties[currentSubject]['topics'][target] = {

                        'url' : url,
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

      console.log(subject, topic); // remove

      // // add title <
      var readme: string = `${octokitConfig.source}/${octokitConfig.file}`;
      // readme += `/${subject.name}`;

      // // >

      // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

      // const element: string = (topic ? topic : subject);
      // const resource: string[] = this._elementResources[element];
      // const description: string = this._elementDescriptions[element];

      // // title, description?, breaker <
      // readme += `# ${element}\n`;
      // readme += (description ? `> ${description}\n` : '');
      // readme += `\n---\n\n`;

      // // >

      // // if (subject) <
      // if ('ecosystem' in properties) {

      //    var topics: string[] = [];
      //    for (const t of Object.values(properties['ecosystem'])) {

      //       // topics.push(t['url']);

      //    }

      //    // ecosystem, breaker <
      //    readme += '## Ecosystem\n';
      //    readme += `${topics.join('\n')}\n`;
      //    readme += '\n# \n\n';

      //    // >

      // }

      // // >

      // // projects, breaker <
      // readme += '## Projects\n';
      // readme += `${properties['projects'].join('\n')}\n`;
      // readme += (resource ? '\n# \n\n' : '\n---');

      // // >

      // // resources?, breaker <
      // readme += (resource ? '## Resources\n' : '');
      // readme += (resource ? `${resource.join('\n')}\n` : '');
      // readme += (resource ? '\n---' : '');

      // // >

      return readme;

   }


}