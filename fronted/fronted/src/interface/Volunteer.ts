export interface Volunteer {
    _id: string;
    name: string;
    email: string;
    password?: string;
    phone: string;
    idNumber: string;
    selectedCities: string[];
    selectedVolunteerOptions: string[];
    profileImage?: string;
  }