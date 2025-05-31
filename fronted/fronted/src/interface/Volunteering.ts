import {statusV} from "./statusV"
export interface Volunteering {
  _id?: string;
  title: string;
  description?: string;
  origin: string;
  phone: string;
  status: statusV;
  byOrganizationNumber: number;
  idMaker?: string;
  deadline: Date;
  createdAt: Date; 
  updatedAt?: Date;
  rating?:number
}
