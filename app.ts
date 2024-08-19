// < Project Landscape by Alex Arbuckle > //


// import <
const cron = require('node-cron');
import { axiosGet } from 'lxrbckl';

import dataManager from './src/managers/dataManager';
import octokitManager from './src/managers/octokitManager';
import markdownManager from './src/managers/markdownManager';

import octokitConfig from './src/configs/octokitManagerConfig';
import markdownConfig from './src/configs/markdownManagerConfig';

// >


(async () => {

   cron.schedule('0 0 * * *', async () => {

      // initialize objects <
      const dataHandler: dataManager = new dataManager();
      const octokitHandler: octokitManager = new octokitManager({

         githubUsers : await axiosGet(octokitConfig.urlGitHubUsers)

      });
      const markdownHandler: markdownManager = new markdownManager({

         elementResources : await axiosGet(markdownConfig.urlElementResources),
         elementDescriptions : await axiosGet(markdownConfig.urlElementDescriptions)

      });

      // >

      // fetch readme and build data <
      // publish all elements from data <
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

      // >

   });

})();