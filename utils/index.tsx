interface FilterProps {
  manufacturer: string;
  year: number;
  fuel: string;
  limit: number;
  model: string;
}
export async function fetchCars(filters: FilterProps) {
  const headers = new Headers({
    "X-RapidAPI-Key": "c668b76289msh6b52993d6c9f610p104a70jsn2df64dc1bce4",
    "X-RapidAPI-Host": "cars-by-api-ninjas.p.rapidapi.com",
  });

  const { manufacturer, year, fuel, limit, model } = filters;

  const url = `https://cars-by-api-ninjas.p.rapidapi.com/v1/cars?model=${model}&make=${manufacturer}&year=${year}&fuel_type=${fuel}&limit=${limit}`;

  const res = await fetch(url, {
    headers,
  });
  const data = await res.json();
  return data;
}
export const calculateCarRent = (city_mpg: number, year: number) => {
  const basePriceperDay = 50;
  const mileageFactor = 0.1;
  const ageFactor = 0.05;

  const milegeRate = city_mpg * mileageFactor;
  const ageRate = (new Date().getFullYear() - year) * ageFactor;

  const rentalRatePerDay = basePriceperDay + milegeRate + ageRate;

  return rentalRatePerDay.toFixed(0);
};

export const generateCarImageUrl = (car: any, angle?: string) => {
  const url = new URL("https://cdn.imagin.studio/getimage");
  const { make, model, year } = car;

  url.searchParams.append("customer", "hrjavascript-mastery" || "");
  url.searchParams.append("make", make);
  url.searchParams.append("modelFamily", model.split(" ")[0]);
  url.searchParams.append("zoomType", "fullscreen");
  url.searchParams.append("modelYear", `${year}`);
  // url.searchParams.append('zoomLevel', zoomLevel);
  url.searchParams.append("angle", `${angle}`);

  return `${url}`;
};

export const updateSearchParams = (type: string, value: string) => {
  const searchParams = new URLSearchParams(window.location.search);

  searchParams.set(type, value);

  const newPathname = `${window.location.pathname}?${searchParams.toString()}`;

  return newPathname;
};
