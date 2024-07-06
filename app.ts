// < Project Landscape by Alex Arbuckle > //


// import <
import { axiosGet } from 'lxrbckl';

import {  } from './src/typings/readmeManager';
import {  } from './src/typings/octokitManager';

import dataManager from './src/services/dataManager';
import readmeManager from './src/services/readmeManager';
import octokitManager from './src/services/octokitManager';

// >


// env <
const octokitOwner: string = 'lxRbckl';
const readmeFileName: string = 'README.md';
const octokitToken: string = '';
const publishSource: string = 'https://github.com/lxRbckl/lxRbckl/tree/main';
const githubUsersURL: string = 'https://raw.githubusercontent.com/lxRbckl/Project-Heimir/V2/src/data/githubUsers.json';
const urlMarkdownBuilds: string = 'https://raw.githubusercontent.com/lxRbckl/Project-Landscape/main/src/data/markdownBuilds.json';
const urlElementResources: string = 'https://raw.githubusercontent.com/lxRbckl/Project-Landscape/main/src/data/elementResources.json';
const urlElementDescriptions: string = 'https://raw.githubusercontent.com/lxRbckl/Project-Landscape/main/src/data/elementDescription.json';

// >


(async () => {

   // init objects <
   var dataHandler: dataManager = new dataManager();
   var octokitHandler: octokitManager = new octokitManager({

      excludedBranches : [],
      octokitOwner : octokitOwner,
      octokitToken : octokitToken,
      readmeFileName : readmeFileName,
      githubUsers : await axiosGet(githubUsersURL)

   });
   var readmeHandler: readmeManager = new readmeManager({

      propertyTargetIndex : 1,
      propertyExpectedSize : 3,
      propertyRegexes : {'topics' : /\[`([^`]*)`\]/, 'subjects' : /\[\*\*`([^`]*)`\*\*\]/}

   });

   // >


   // run <
   const elementResources: {[key: string]: string} = await axiosGet(urlElementResources);
   const elementDescriptions: {[key: string]: string} = await axiosGet(urlElementDescriptions);

   await octokitHandler.collectAllReadme((data) => {

      dataHandler.addProperties({

         publishSource : publishSource,
         readmeProjectPath : data['projectPath'],
         properties : readmeHandler.getProperties({readme: data['rawContent']})

      })

   });

   for (const [subject, properties] of Object.entries(dataHandler.getData())) {

      // build subject <
      const readmeSubject: string = await readmeHandler.setReadme({

         subject : subject,
         properties : properties,
         resource: elementResources?.subject,
         description : elementDescriptions?.subject

      });

      // >

      // // iterate (subject->ecosystem) <
      // for (const topic of Object.keys(properties['ecosystem'])) {

      //    // build topic <


      //    // >

      // }

      // >

   }

   // for (const [subject, properties] of Object.entries(dataHandler.getData())) {

   //    // publish subject <
   //    readmeHandler.setReadmeFromProperties({

   //       subject : subject,
   //       properties : properties

   //    });

   //    // >

   //    // iterate (subject->ecosystem) <
   //    for (const topic of Object.keys(properties['ecosystem']!)) {

   //       // console.log(topic);
   //       // console.log(topic);

   //    }

   //    // >
      
   // }

   // >

})();