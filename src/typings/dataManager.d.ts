// types <


// >


// interfaces <
export interface Topic {

   'url': string;
   'urls'?: string[];
   'projects'?: string[];

}


export interface Subject {

   'url': string;
   'urls'?: string[];
   'projects'?: string[];
   'ecosystem'?: { 
      
      [key: string]: Topic 
   
   }

}


export interface Data {

   [key: string]: Subject;

}

// >