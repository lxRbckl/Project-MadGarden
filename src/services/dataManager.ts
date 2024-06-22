// import <
import { octokit, axiosGet } from 'lxrbckl';

import markdownManager from './markdownManager';
import { 
   
   Properties,
   PropertyKeys

} from '../typings/markdownManager';
import { 
   
   Data,
   Topic,
   Subject,
   ConstructorParams

} from '../typings/dataManager';

// >


export default class dataManager {


   private readonly _readmeFileName: string;
   private readonly _githubUsersURL: string;
   private readonly _markdownBuildsURL: string;

   private _octokit: octokit;
   private readonly templateTopic: Topic;
   private readonly templateSubject: Subject;
   private _markdownHandler: markdownManager;


   constructor({

      octokitOwner,
      octokitToken,
      githubUsersURL,
      markdownBuildsURL

   }: ConstructorParams) {

      this._readmeFileName = 'README.md';
      this._githubUsersURL = githubUsersURL;
      this._markdownBuildsURL = markdownBuildsURL;

      this.templateTopic = {

         'projects' : [],
         'resources' : [],
         'description' : ''

      };
      this.templateSubject = {

         'projects' : [],
         'ecosystem' : [],
         'description' : ''

      };
      this._octokit = new octokit({

         owner : octokitOwner,
         token : octokitToken

      });
      this._markdownHandler = new markdownManager({

         markdownBuildsURL : this._markdownBuildsURL

      });


   }


   async getData(): Promise<Data> {

      var data: Data = {};

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

               let props: Properties = this._markdownHandler.getProperties(readme);

               console.log(props); // remove

               // TODO
               // we got props back but we still need to use the interfaces from
               // dataManager.d.ts in order to map the project to BOTH the subject(s)
               // and the topic(s). use the interface's keywords and add the project
               // in the current iteration to his key for each subject AND topic.
               // ---
               // we may consider indeed adding another function solely responsible
               // for adding our properties to data and returning it here.


               return data; // remove

            }

            // >

         }

         // >

      }

      // >

      return data;

   }

}