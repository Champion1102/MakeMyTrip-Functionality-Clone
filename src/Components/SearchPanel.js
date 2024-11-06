import React, { useState, useEffect } from "react";
import NavbarSignIn from "./NavbarSignIn";
import HotelCard from "./HotelCard";
import { toast } from 'react-toastify';

const SearchPanel = () => {
  const [cities, setCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState("");
  const [searchedCity, setSearchedCity] = useState(""); 
  const [hotels, setHotels] = useState([]);
  const [activeSort, setActiveSort] = useState("User Rating (Highest First)");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [shouldFetch, setShouldFetch] = useState(false);

  const sortOptions = [
    'User Rating (Highest First)',
    'User Rating (Lowest First)',
    'Price (Highest First)',
    'Price (Lowest First)',
  ];

  useEffect(() => {
    fetchCities();
    checkAuthentication();
  }, []);

  useEffect(() => {
    if (shouldFetch) {
      fetchHotels(selectedCity, getSortQuery(activeSort));
      setShouldFetch(false);
      setSearchedCity(selectedCity); 
    }
  }, [shouldFetch, selectedCity, activeSort]);

  const fetchCities = async () => {
    try {
      const response = await fetch("https://academics.newtonschool.co/api/v1/bookingportals/city?limit=40", {
        headers: {
          projectId: "treoo5dhf86s",
        },
      });
      const data = await response.json();
      setCities(data.data.cities);
    } catch (error) {
      console.error("Error fetching cities:", error);
    }
  };

  const fetchHotels = async (cityState, sort) => {
    try {
      const sortQuery = sort ? `&sort=${sort}` : "";
      const response = await fetch(`https://academics.newtonschool.co/api/v1/bookingportals/hotel?search={"location":"${cityState}"}${sortQuery}`, {
        method: 'GET',
        headers: {
          projectId: "treoo5dhf86s",
          'Content-Type': 'application/json',
          accept: 'application/json'
        }
      });
      const data = await response.json();
      setHotels(data.data.hotels);
    } catch (error) {
      console.error("Error fetching hotels:", error);
    }
  };

  const handleCityChange = (e) => {
    setSelectedCity(e.target.value);
  };

  const handleSearch = () => {
    if (!isLoggedIn) {
      toast.error("Please sign in to search.");
      return;
    }

    if (selectedCity) {
      setShouldFetch(true);
    } else {
      setHotels([]);
      setSearchedCity(""); 
    }
  };

  const handleSortClick = (option) => {
    if (!isLoggedIn) {
      toast.error("Please sign in to use this feature.");
      return;
    }

    setActiveSort(option);
    if (searchedCity) { 
      setShouldFetch(true);
    }
  };

  const getSortQuery = (option) => {
    switch (option) {
      case 'User Rating (Highest First)':
        return '{"rating":-1}';
      case 'User Rating (Lowest First)':
        return '{"rating":1}';
      case 'Price (Highest First)':
        return '{"avgCostPerNight":-1}';
      case 'Price (Lowest First)':
        return '{"avgCostPerNight":1}';
      default:
        return "";
    }
  };

  const checkAuthentication = () => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    toast.error("Please sign in to search.");
  };

  return (
    <div>
      <div className="fixed top-0 left-0 right-0 z-50 w-full bg-white shadow-md">
        <NavbarSignIn onLogout={handleLogout} />
      </div>
      <div className="mt-[84px]">
        {/* Search Panel */}
        <div className="w-full h-[170px] bg-gradient-to-b from-[#061422] via-[#0e2b4a] to-[#164170] flex flex-col justify-center items-center text-center pt-4">
          <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0">
            <select
              value={selectedCity}
              onChange={handleCityChange}
              className="block w-[212px] p-2 h-[51px] border border-gray-300 shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md bg-[#213345] border-none text-[#0675DC] text-[12px]"
            >
              <option value="">CITY, AREA OR PROPERTY</option>
              {cities.map((city) => (
                <option key={city._id} value={city.cityState.split(',')[0].trim()}>
                  {city.cityState.split(',')[0].trim()}
                </option>
              ))}
            </select>
            <button
              onClick={handleSearch}
              className="bg-gradient-to-r from-cyan-500 to-blue-500 w-[185px] h-[43px] md:ml-2 rounded-full"
            >
              Search
            </button>
          </div>
          {!searchedCity && (
            <h2 className="text-[18px] md:text-[30px] text-white font-light mt-4">
              Search Properties in your preferred location
            </h2>
          )}
          {searchedCity && hotels.length > 0 && (
            <h2 className="text-[18px] md:text-[30px] text-white font-light mt-4">
              {hotels.length} Properties in {searchedCity}
            </h2>
          )}
        </div>

        {/* Sort Panel */}
        <div className="bg-[#dfeff9] text-black h-18">
          <div className="flex items-center justify-center h-full space-x-8 md:space-x-28">
            <span className="font-semibold">SORT BY:</span>
            {sortOptions.map((option, index) => (
              <button
                key={index}
                onClick={() => handleSortClick(option)}
                className={`text-black py-2 ${
                  activeSort === option ? 'border-b-4 border-blue-500' : ''
                } focus:outline-none`}
              >
                {option}
              </button>
            ))}
          </div>
        </div>

        <div className="hotel-list px-4 md:px-16">
          {searchedCity && hotels.length > 0 ? (
            <>
              <h2 className="text-[18px] md:text-[25px] font-light my-4">
                Showing properties in {searchedCity}
              </h2>
              {hotels.map((hotel) => (
                <HotelCard
                  key={hotel._id}
                  name={hotel.name}
                  location={hotel.location}
                  rating={hotel.rating}
                  images={hotel.images}
                  rooms={hotel.rooms}
                />
              ))}
            </>
          ) : (
            <h2 className="text-[18px] md:text-[25px] font-light my-4 flex justify-center items-center h-full">
              No results to show...
            </h2>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchPanel;



