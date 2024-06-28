// < Project Landscape by Alex Arbuckle > //


// import <
import { axiosGet } from 'lxrbckl';

import dataManager from './src/services/dataManager';
import octokitManager from './src/services/octokitManager';
import markdownManager from './src/services/markdownManager';

import { Properties } from './src/typings/markdownManager';
import { ReadmeData, ReadmeFilePath } from './src/typings/octokitManager';

// >


// env <
const octokitOwner: string = 'lxRbckl';
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

      excludeBranches : true,
      excludedBranches : ['main'],
      octokitOwner : octokitOwner,
      octokitToken : octokitToken,
      readmeFileName : 'README.md',
      githubUsers : await axiosGet(githubUsersURL)

   });
   var markdownHandler: markdownManager = new markdownManager({

      propertyTargetIndex : 1,
      propertyExpectedSize : 3,
      propertyRegexes : {'topics' : /\[`([^`]*)`\]/, 'subjects' : /\[\*\*`([^`]*)`\*\*\]/}

   });

   // >


   await octokitHandler.iterateReadmeArchive((data: ReadmeData) => {
      
      let properties: Properties = markdownHandler.getPropertiesFromReadme(data.content);
      dataHandler.addPropertiesToData(properties, data.filepath);
      
   });

   console.log(dataHandler.getData()); // remove


   // markdownBuilds : await axiosGet(urlMarkdownBuilds),
   // elementResources : await axiosGet(urlElementResources),
   // elementDescriptions : await axiosGet(urlElementDescriptions),


})();