// < Project Landscape by Alex Arbuckle > //


// import <
import { axiosGet } from 'lxrbckl';

import dataManager from './src/managers/dataManager';
import octokitManager from './src/managers/octokitManager';
import markdownManager from './src/managers/markdownManager';

import octokitConfig from './src/configs/octokitManagerConfig';
import markdownConfig from './src/configs/markdownManagerConfig';

// >


(async () => {

   var dataHandler: dataManager = new dataManager();
   var octokitHandler: octokitManager = new octokitManager({

      githubUsers : await axiosGet(octokitConfig.urlGitHubUsers)

   });
   var markdownHandler: markdownManager = new markdownManager({

      elementResources : await axiosGet(markdownConfig.urlElementResources),
      elementDescriptions : await axiosGet(markdownConfig.urlElementDescriptions)

   });


   await octokitHandler.fetchAllReadme({

      callback : ({file, hyperlink}) => {

         dataHandler.addProperties({

            readmeHyperlink : hyperlink,
            readmeProperties : markdownHandler.extractProperties({file : file})

         });

      }

   });

   await octokitHandler.publishAllReadme({

      data : dataHandler.getData(),
      callback : ({

         topic,
         subject,
         projects,
         ecosystem

      }) => {

         return markdownHandler.build({

            topic : topic,
            subject : subject,
            projects : projects,
            ecosystem : ecosystem

         });

      }

   });

})();