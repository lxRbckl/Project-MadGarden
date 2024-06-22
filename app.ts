// < Project Landscape by Alex Arbuckle > //


// import <
import dataManager from './src/services/dataManager';

// >


(async () => {

   let owner: string = 'lxRbckl';
   let token: string = '';
   let githubUsersURL: string = 'https://raw.githubusercontent.com/lxRbckl/Project-Heimir/V2/src/data/githubUsers.json';
   let markdownBuildsURL: string = 'https://raw.githubusercontent.com/lxRbckl/Project-Landscape/main/src/data/markdownBuilds.json'; // <- repo must be public to access

   let dataHandler: dataManager = new dataManager({

      octokitOwner : owner,
      octokitToken : token,
      githubUsersURL : githubUsersURL,
      markdownBuildsURL : markdownBuildsURL

   });


   await dataHandler.getData();

})();