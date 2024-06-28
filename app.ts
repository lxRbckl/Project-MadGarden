// < Project Landscape by Alex Arbuckle > //


// import <
import { axiosGet } from 'lxrbckl';

import { Properties } from './src/typings/readmeManager';
import { ReadmeData } from './src/typings/octokitManager';

import dataManager from './src/services/dataManager';
import readmeManager from './src/services/readmeManager';
import octokitManager from './src/services/octokitManager';

// >


// env <
const octokitOwner: string = 'lxRbckl';
const readmeFileName: string = 'README.md';
const octokitToken: string = '';
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
   var markdownHandler: readmeManager = new readmeManager({

      propertyTargetIndex : 1,
      propertyExpectedSize : 3,
      markdownBuilds : await axiosGet(urlMarkdownBuilds),
      elementResources : await axiosGet(urlElementResources),
      elementDescriptions : await axiosGet(urlElementDescriptions),
      propertyRegexes : {'topics' : /\[`([^`]*)`\]/, 'subjects' : /\[\*\*`([^`]*)`\*\*\]/}

   });

   // >


   // run <
   await octokitHandler.iterateReadmeArchive((data: ReadmeData) => {
      
      let properties: Properties = markdownHandler.getPropertiesFromReadme(data.content);
      dataHandler.addPropertiesToData(properties, data.filepath);
      
   });

   await markdownHandler.publishAllReadme(dataHandler.getData());

   // >

})();