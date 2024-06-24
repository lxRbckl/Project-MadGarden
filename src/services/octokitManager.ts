// import <
import { octokit, axiosGet } from 'lxrbckl';
import { Archive, ConstructorParams } from '../typings/octokitManager';

// >


export default class octokitManager {


   private _archive: Archive;
   private _octokit: octokit;

   private readonly _octokitOwner: string;
   private readonly _githubUsers: string[];
   private readonly _readmeFileName: string;
   private readonly _excludeBranchMain: boolean;


   constructor({

      githubUsers,
      octokitOwner,
      octokitToken,
      readmeFileName,
      excludeBranchMain

   }: ConstructorParams) {

      this._githubUsers = githubUsers;
      this._octokitOwner = octokitOwner;
      this._readmeFileName = readmeFileName;
      this._excludeBranchMain = excludeBranchMain;

      this._archive = [];
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

      return branches;

   }


   private async _getReadmeFromBranch(repo: string, branch: string): Promise<string> {

      let readme: string = await this._octokit.repositoryGet({

         branch : branch,
         repository : repo,
         file : this._readmeFileName

      });

      return readme;

   }


   async setReadmeArchive(): Promise<void> {

      let users: string[] = ['lxRbckl']; // REMOVE WHEN DONE
      // let users: string[] = axiosGet(this._githubUsersURL); // ADD WHEN DONE
      for (const user of users) {

         let repos: string[] = await this._getReposFromUser(user);
         for (const repo of repos) {

            let branches: string[] = await this._getBranchesFromRepo(user, repo);
            for (const branch of branches) {

               let readme: string = await this._octokit.repositoryGet({

                  branch : branch,
                  repository : repo,
                  file : this._readmeFileName

               });

               this._archive.push({

                  'content' : readme,
                  'filepath' : {

                     'repo' : repo,
                     'owner' : user,
                     'branch' : branch

                  }

               });

            }

            console.log('here'); // remove
            return undefined; // REMOVE WHEN DONE

         }

      }

   }


   getReadmeArchive(): Archive {return this._archive;}
   

}