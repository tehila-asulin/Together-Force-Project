// src/utils/volunteeringFilters.ts
import { Volunteering } from '../interface/Volunteering';

export const filterByOrganization = (
  volunteeringList: Volunteering[],
  organizationNumber: number
) => {
  return volunteeringList.filter(
    (v) => v.byOrganizationNumber === organizationNumber
  );
};

export const filterByVolunteerPreferences = (
  volunteeringList: Volunteering[],
  selectedCities: string[],
  selectedOptions: string[]
) => {
  return volunteeringList.filter((v) => {
    const hasMatchingCity =
      selectedCities.length === 0 || v.origin?.some((city) => selectedCities.includes(city));
    const hasMatchingOption =
      selectedOptions.length === 0 || selectedOptions.includes(v.title); // התאמה לפי title

    return hasMatchingCity && hasMatchingOption;
  });
};
