// < Project Landscape by Alex Arbuckle > //


// import <
import { axiosGet } from 'lxrbckl';

import dataManager from './src/services/dataManager';
import readmeManager from './src/services/readmeManager';
import octokitManager from './src/services/octokitManager';

// >


// env <
const octokitBranch: string = 'main';
const octokitRepo: string = 'lxRbckl';
const octokitOwner: string = 'lxRbckl';
const octokitFileName: string = 'README.md';
const octokitToken: string = '';
const publishSource: string = 'https://github.com/lxRbckl/lxRbckl/tree/main';

const urlGitHubUsers: string = 'https://raw.githubusercontent.com/lxRbckl/Project-Heimir/V2/src/data/githubUsers.json';
const urlElementResources: string = 'https://raw.githubusercontent.com/lxRbckl/Project-Landscape/main/src/data/elementResources.json';
const urlElementDescriptions: string = 'https://raw.githubusercontent.com/lxRbckl/Project-Landscape/main/src/data/elementDescription.json';

// >


(async () => {

   // init objects <
   var dataHandler: dataManager = new dataManager({octokitFileName : octokitFileName});
   var octokitHandler: octokitManager = new octokitManager({

      excludedBranches : [],
      octokitOwner : octokitOwner,
      octokitToken : octokitToken,
      octokitFileName : octokitFileName,
      githubUsers : await axiosGet(urlGitHubUsers)

   });
   var readmeHandler: readmeManager = new readmeManager({

      propertyTargetIndex : 1,
      propertyExpectedSize : 3,
      elementResources : await axiosGet(urlElementResources),
      elementDescriptions : await axiosGet(urlElementDescriptions),
      propertyRegexes : {'topics' : /\[`([^`]*)`\]/, 'subjects' : /\[\*\*`([^`]*)`\*\*\]/}

   });

   // >


   // run <
   await octokitHandler.collectAllReadme((data) => {

      dataHandler.addProperties({

         publishSource : publishSource,
         readmeProjectPath : data['projectPath'],
         properties : readmeHandler.getProperties({readme: data['rawContent']})

      })

   });

   for (const [subject, properties] of Object.entries(dataHandler.getData())) {

      // // build and publish subject <
      await octokitHandler.publishReadme({

         repo : octokitRepo,
         branch : octokitBranch,
         file : `${subject}/${octokitFileName}`,
         content : await readmeHandler.setReadme({

            subject : subject,
            properties : properties

         })

      });

      // >

      // iterate (subject->ecosystem) <
      for (const topic of Object.keys(properties['ecosystem'])) {

         // // build and publish topic <
         await octokitHandler.publishReadme({

            repo : octokitRepo,
            branch : octokitBranch,
            file : `${subject}/${topic}/${octokitFileName}`,
            content : await readmeHandler.setReadme({

               topic : topic,
               subject : subject,
               properties : properties['ecosystem'][topic]

            })

         });

         // >

      }

      // >

   }

})();