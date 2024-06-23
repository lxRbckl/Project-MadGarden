// import <
import { octokit, axiosGet } from 'lxrbckl';

import markdownManager from './markdownManager';
import { Properties } from '../typings/markdownManager';
import { 
   
   Data,
   Subject,
   Resources,
   Descriptions,
   ConstructorParams

} from '../typings/dataManager';

// >


export default class dataManager {


   private _octokit: octokit;
   private _markdownHandler: markdownManager;

   private readonly _readmeFileName: string;
   private readonly _githubUsersURL: string;
   private readonly _markdownBuildsURL: string;
   private readonly _elementResourcesURL: string;
   private readonly _elementDescriptionURL: string;


   constructor({

      octokitOwner,
      octokitToken,
      githubUsersURL,
      markdownBuildsURL,
      elementResourcesURL,
      elementDescriptionURL

   }: ConstructorParams) {

      this._readmeFileName = 'README.md';
      this._githubUsersURL = githubUsersURL;
      this._markdownBuildsURL = markdownBuildsURL;
      this._elementResourcesURL = elementResourcesURL;
      this._elementDescriptionURL = elementDescriptionURL;

      this._octokit = new octokit({

         owner : octokitOwner,
         token : octokitToken

      });
      this._markdownHandler = new markdownManager({

         markdownBuildsURL : this._markdownBuildsURL

      });

   }


   async setData(data: Data): Promise<void> {

      let resources: Resources = await axiosGet(this._elementResourcesURL);
      let descriptions: Descriptions = await axiosGet(this._elementDescriptionURL);
      console.log(data); // remove

   }


   async getData(): Promise<Data> {

      var data: Data = {};
      var properties: Properties = {};

      // fetch and iterate through users <
      // let users: string[] = await axiosGet(this._githubUsersURL);
      let users: string[] = ['lxRbckl'];
      for (const user of users) {

         // get repos from user <
         let repos: string[] = await this._octokit.request({

            elementFromProperty : 'name',
            endpoint : `GET /users/${user}/repos`

         });

         // >

         // iterate repos <
         for (const repo of repos) {

            // get branches from repo <
            let branches: string[] = await this._octokit.request({

               elementFromProperty : 'name',
               endpoint : `GET /repos/${user}/${repo}/branches`

            });

            // >

            // iterate branches <
            for (const branch of branches) {

               // get readme file from branch <
               // extract properties from readme and add to data <
               let readme: string = await this._octokit.repositoryGet({

                  branch : branch,
                  repository : repo,
                  file : this._readmeFileName

               });

               properties = this._markdownHandler.getProperties(readme);               
               for (const [subject, topic] of Object.entries(properties)) {

                  // if (new subject) <
                  if (!(Object.keys(data).includes(subject))) {

                     data[subject] = {

                        'projects' : [],
                        'ecosystem' : []

                     };
                     
                  }

                  // >

                  data[subject]['ecosystem']?.push(topic);
                  data[subject]['projects']?.push({

                     'repo' : repo,
                     'owner' : user,
                     'branch' : branch

                  });

               }

               // >
               
               return data; // beta; REMOVE WHEN DONE

            }

            // >

         }

         // >

      }

      // >

      return data;

   }

}