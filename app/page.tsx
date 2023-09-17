"use client";

import { Hero } from "@/components/Hero";
import CustomFilter from "@/components/CustomFilter";
import SearchBar from "@/components/SearchBar";
import { fetchCars } from "@/utils";
import { CarCard } from "@/components/CarCard";
import { yearsOfProduction, fuels } from "@/data/footerData";
import { ShowMore } from "@/components/ShowMore";
import { useEffect, useState } from "react";

export default function Home() {
  const [allcars, SetallCars] = useState([]);
  const [loading, setLoading] = useState(false);
  const [manufacturer, setManufacturer] = useState("");
  const [model, setModel] = useState("");
  const [year, setYear] = useState(2023);
  const [fuel, setFuel] = useState("");
  const [limit, setLimit] = useState(10);
  const getCars = async () => {
    setLoading(true);
    try {
      const results = await fetchCars({
        manufacturer: manufacturer || "",
        year: year ,
        fuel: fuel || "",
        limit: limit || 10,
        model: model || "",
      });
      SetallCars(results);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getCars();
  }, [fuel, year, limit, manufacturer, model]);
  const isEmpty = !Array.isArray(allcars) || allcars.length < 1 || !allcars;
  return (
    <main className="overflow-hidden">
      <Hero />
      <div className="mt-12 padding-x padding-y max-width" id="discover">
        <div className="home__text-container">
          <h1 className="text-4xl font-extrabold"> Car Catalogue</h1>
          <p>Explore the cars you might like</p>
        </div>
        <div className="home__filters">
          <SearchBar setManufacturer={setManufacturer} setModel={setModel} />
          <div className="home__filter-container">
            <CustomFilter title="fuel" options={fuels} setFilter={setFuel} />
            <CustomFilter title="year" options={yearsOfProduction} setFilter={setYear} />
          </div>
        </div>
        {allcars.length > 0 ? (
          <section>
            <div className="home__cars-wrapper">
              {allcars?.map((car) => (
                <CarCard car={car} />
              ))}
            </div>

            {loading && (
              <div className="mt-16 w-full flex-center">
                <Image src="/loader.svg" alt="loader" width={50} height={50} className="object-contain"/>
              </div>
            )}
            <ShowMore
              pageNumber={limit/ 10}
              isNext={limit > allcars.length}
              setLimit = {setLimit}
            />
          </section>
        ) : (
          <div>
            <div className="home__error-container">
              <h2 className="text-black text-xl font-bold">
                Oops, no result!!
              </h2>
              <p>{allcars.message}</p>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
