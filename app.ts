// < Project Landscape by Alex Arbuckle > //


// import <
import dataManager from './src/services/dataManager';

// >


(async () => {

   let owner: string = 'lxRbckl';
   let token: string = '';
   let githubUsersURL: string = 'https://raw.githubusercontent.com/lxRbckl/Project-Heimir/V2/src/data/githubUsers.json';
   let markdownBuildsURL: string = '';

   let dataHandler: dataManager = new dataManager({

      octokitOwner : owner,
      octokitToken : token,
      githubUsersURL : githubUsersURL,
      markdownBuildsURL : markdownBuildsURL

   });


   await dataHandler.getData();

})();