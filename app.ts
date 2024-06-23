// < Project Landscape by Alex Arbuckle > //


// import <
import dataManager from './src/services/dataManager';

// >


(async () => {

   let owner: string = 'lxRbckl';
   let token: string = '';
   let githubUsersURL: string = 'https://raw.githubusercontent.com/lxRbckl/Project-Heimir/V2/src/data/githubUsers.json';
   let markdownBuildsURL: string = 'https://raw.githubusercontent.com/lxRbckl/Project-Landscape/main/src/data/markdownBuilds.json';
   let elementResourcesURL: string = 'https://raw.githubusercontent.com/lxRbckl/Project-Landscape/main/src/data/elementResources.json';
   let elementDescriptionURL: string = 'https://raw.githubusercontent.com/lxRbckl/Project-Landscape/main/src/data/elementDescription.json';

   let dataHandler: dataManager = new dataManager({

      octokitOwner : owner,
      octokitToken : token,
      githubUsersURL : githubUsersURL,
      markdownBuildsURL : markdownBuildsURL,
      elementResourcesURL : elementResourcesURL,
      elementDescriptionURL : elementDescriptionURL

   });


   let x = await dataHandler.getData();
   
   console.log(x['TypeScript']);
   console.log('----');
   console.log(x['demo']);

})();