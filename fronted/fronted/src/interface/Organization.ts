export interface Organization {
    _id?: string; 
    name: string;
    email: string;
    phone: string;
    history:any[];
    profileImage: string;
    password?: string; 
    organizationNumber: number;
  }
  