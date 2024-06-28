// import <
import { octokit } from 'lxrbckl';
import {

   ConstructorParams,
   IterateReadmeArchiveCallback

} from '../typings/octokitManager';

// >


export default class octokitManager {


   private _octokit: octokit;

   private readonly _users: string[];
   private readonly _octokitOwner: string;
   private readonly _readmeFileName: string;
   private readonly _excludedBranches: string[];


   constructor({

      githubUsers,
      octokitOwner,
      octokitToken,
      readmeFileName,
      excludedBranches,

   }: ConstructorParams) {

      this._users = githubUsers;
      this._octokitOwner = octokitOwner;
      this._readmeFileName = readmeFileName;
      this._excludedBranches = excludedBranches;

      this._octokit = new octokit({

         token : octokitToken,
         owner : this._octokitOwner

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
         file : this._readmeFileName

      });

      return readme;

   }


   async iterateReadmeArchive(callback: IterateReadmeArchiveCallback): Promise<void> {

      for (const u of ['lxRbckl']) { // INSERT this._users WHEN DONE

         let repos: string[] = await this._getReposFromUser(u);
         for (const r of repos) {

            let branches: string[] = await this._getBranchesFromRepo(u, r);
            for (const b of branches) {

               let readme: string = await this._getReadmeFromBranch(r, b);

               callback({

                  'content' : readme,
                  'filepath' : {

                     'repo' : r,
                     'owner' : u,
                     'branch' : b,
                     'url' : `https://github.com/${u}/${r}/blob/${b}/README.md`

                  }

               });

            }

            return undefined; // REMOVE WHEN DONE

         }

      }

   }
   

}