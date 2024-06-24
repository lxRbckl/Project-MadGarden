// typings <
export type SubjectKeys = 'projects' | 'ecosystem';

// >


// interfaces <
export interface Resources {

   [key: string]: string;

}


export interface Descriptions {

   [key: string]: string;

}


export interface Project {

   'url'?: string;
   'name'?: string;

}


export interface Topic {

   [key: string]: {

      'urls'?: string[];
      'names'?: string[];

   };

}


export interface Subject {

   'ecosystem'?: Topic;
   'projects'?: Project[];

}


export interface Data {

   [key: string]: Subject;

}

// >