// import <
import { octokit } from 'lxrbckl';

import {

   ConstructorParams,
   PublishReadmeParams,
   FetchAllReadmeParams,
   PublishAllReadmeParams

} from '../typings/octokitManagerTypes';
import octokitConfig from '../configs/octokitManagerConfig';

// >


export default class octokitManager {


   private _octokit: octokit;

   private readonly _users: string[];


   constructor({githubUsers}: ConstructorParams) {

      this._users = githubUsers;
      this._octokit = new octokit({
         
         owner : octokitConfig.owner, 
         token : octokitConfig.token
      
      });

   }


   private async publishReadme({

      file,
      content

   }: PublishReadmeParams): Promise<void> {

      // await this._octokit.respositorySet({

      //    file : file,
      //    data : content,
      //    retryOnError : 5,
      //    branch : octokitConfig.branch,
      //    repository : octokitConfig.repository

      // });

   }


   private async _getReposFromUser(user: string): Promise<string[]> {

      let repos: string[] = await this._octokit.request({

         elementFromProperty : 'name',
         endpoint : `GET /users/${user}/repos`

      });

      return repos;

   }


   private async _getBranchesFromRepo(user: string, repo: string): Promise<string[]> {

      let branches: string[] = await this._octokit.request({

         elementFromProperty : 'name',
         endpoint : `GET /repos/${user}/${repo}/branches`

      });

      return branches.filter(b => !((octokitConfig.excludedBranches).includes(b)));

   }


   private async _getReadmeFromBranch(repo: string, branch: string): Promise<string> {

      let readme: string = await this._octokit.repositoryGet({

         branch : branch,
         repository : repo,
         file : octokitConfig.file

      });

      return readme;

   }


   async fetchAllReadme({callback}: FetchAllReadmeParams): Promise<void> {

      var url: string = '';
      for (const u of this._users) {

         // update octokit property for query //
         this._octokit.owner = u;

         const repos: string[] = await this._getReposFromUser(u);
         for (const r of repos) {

            const branches: string[] = await this._getBranchesFromRepo(u, r);
            for (const b of branches) {

               const file: string = await this._getReadmeFromBranch(r, b);
               url = `https://github.com/${u}/${r}/blob/${b}/${octokitConfig.file}`;

               if (file) {

                  // send values to callback //
                  callback({

                     'file' : file,
                     'hyperlink' : `[\`${r} ${b}\`](${url})`

                  });

               }

            }

         }

      }

   }


   async publishAllReadme({data, callback}: PublishAllReadmeParams): Promise<void> {

      // iterate (subjects) <
      for (const [subject, sProps] of Object.entries(data)) {

         await this.publishReadme({

            file : `${subject}/${octokitConfig.file}`,
            content : callback({

               subject : sProps,
               projects : sProps.projects,
               ecosystem : Object.values(sProps.ecosystem).map(i => i.hyperlink)

            })

         });

         // iterate (subject->topics) <
         for (const [topic, tProps] of Object.entries(sProps.ecosystem)) {

            await this.publishReadme({

               file : `${subject}/${topic}/${octokitConfig.file}`,
               content : callback({

                  topic : tProps,
                  subject : sProps,
                  projects : tProps.projects

               })

            });

         }

         // >

      }

      // >

   }
   

}