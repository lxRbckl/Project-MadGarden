// import <
import { octokit } from 'lxrbckl';
import {

   ConstructorParams,
   PublishReadmeParams,
   IterateReadmeArchiveCallback

} from '../typings/octokitManager';

// >


export default class octokitManager {


   private _octokit: octokit;

   private readonly _owner: string;
   private readonly _users: string[];
   private readonly _fileName: string;
   private readonly _excludedBranches: string[];


   constructor({

      githubUsers,
      octokitOwner,
      octokitToken,
      octokitFileName,
      excludedBranches,

   }: ConstructorParams) {

      this._users = githubUsers;
      this._owner = octokitOwner;
      this._fileName = octokitFileName;
      this._excludedBranches = excludedBranches;

      this._octokit = new octokit({

         owner : this._owner,
         token : octokitToken

      });

   }


   async publishReadme({

      file,
      repo,
      branch,
      content

   }: PublishReadmeParams): Promise<void> {

      await this._octokit.respositorySet({

         file : file,
         data : content,
         branch : branch,
         repository : repo

      });

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

      return branches.filter(b => !(this._excludedBranches.includes(b)));

   }


   private async _getReadmeFromBranch(repo: string, branch: string): Promise<string> {


      let readme: string = await this._octokit.repositoryGet({

         branch : branch,
         repository : repo,
         file : this._fileName,
         displayError : true

      });

      return readme;

   }


   async collectAllReadme(callback: IterateReadmeArchiveCallback): Promise<void> {

      for (const u of this._users) {

         this._octokit.owner = u;
         let repos: string[] = await this._getReposFromUser(u);
         for (const r of repos) {

            let branches: string[] = await this._getBranchesFromRepo(u, r);
            for (const b of branches) {

               let readme: string = await this._getReadmeFromBranch(r, b);

               if (readme) {

                  callback({

                     'rawContent' : readme,
                     'projectPath' : {

                        'repo' : r,
                        'owner' : u,
                        'branch' : b,
                        'url' : `https://github.com/${u}/${r}/blob/${b}/${this._fileName}`

                     }

                  });

               }

            }

         }

      }

   }
   

}