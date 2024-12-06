import React, { ChangeEvent } from "react";
import { FaCarSide, FaDollarSign, FaSearch } from "react-icons/fa";
import { useNavigate, useLocation } from "react-router-dom";

const CarFilters: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Helper function to update the query parameters
  const updateQueryParam = (key: string, value: string) => {
    const searchParams = new URLSearchParams(location.search);
    if (value) {
      searchParams.set(key, value);
    } else {
      searchParams.delete(key);
    }
    navigate({ search: searchParams.toString() }, { replace: true });
  };

  // Handler functions for the filters
  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) =>
    updateQueryParam("search", e.target.value);
  const handleTypeChange = (e: ChangeEvent<HTMLSelectElement>) =>
    updateQueryParam("type", e.target.value);
  const handlePriceChange = (e: ChangeEvent<HTMLSelectElement>) =>
    updateQueryParam("price", e.target.value);

  return (
    <section className="container px-5 mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="flex items-center border-secondary-grey rounded-md shadow-sm focus:border-primary-orange border outline-none py-1.5 lg:py-2 px-3">
          <FaSearch className="text-primary-orange mr-2" />
          <input
            type="text"
            placeholder="Search by Name"
            className="w-full focus:outline-none bg-transparent text-secondary-text"
            onChange={handleSearchChange}
          />
        </div>
        <div className="flex items-center border-secondary-grey rounded-md shadow-sm focus:border-primary-orange border outline-none py-1.5 lg:py-2 px-3">
          <FaCarSide className="text-primary-orange mr-2" />
          <select
            className="w-full focus:outline-none bg-transparent text-secondary-text"
            onChange={handleTypeChange}
          >
            <option value="">All Types</option>
            <option value="suv">SUV</option>
            <option value="coupe">Coupe</option>
            <option value="sedan">Sedan</option>
            <option value="hatchback">Hatchback</option>
            <option value="convertible">Convertible</option>
            <option value="pickup">Pickup</option>
            <option value="minivan">Minivan</option>
            <option value="luxury">Luxury</option>
          </select>
        </div>
        <div className="flex items-center border-secondary-grey rounded-md shadow-sm focus:border-primary-orange border outline-none py-1.5 lg:py-2 px-3">
          <FaDollarSign className="text-primary-green mr-2" />
          <select
            className="w-full focus:outline-none bg-transparent text-secondary-text"
            onChange={handlePriceChange}
          >
            <option value="">Any Price</option>
            <option value="under_20">Under $20</option>
            <option value="20_30">$20 - $30</option>
            <option value="30_40">$30 - $40</option>
            <option value="40_50">$40 - $50</option>
            <option value="50_60">$50 - $60</option>
            <option value="60_70">$60 - $70</option>
            <option value="70_80">$70 - $80</option>
            <option value="80_90">$80 - $90</option>
            <option value="90_100">$90 - $100</option>
          </select>
        </div>
      </div>
    </section>
  );
};

export default CarFilters;
