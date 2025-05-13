export interface Volunteering {
    _id?: string;
    title: string;
    description?: string;
    origin: string[];
    phone: string;
    isDone?: boolean;
    byOrganizationNumber: number; 
    madeByVolunteerEmail?: string;
  }