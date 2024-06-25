// types <


// >


// interfaces <
export interface Topic {

   'urls'?: string[];
   'projects'?: string[];

}


export interface Subject {

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