import React, { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';

// Set your Mapbox access token
mapboxgl.accessToken = 'pk.eyJ1IjoiYWhrYW1ib2giLCJhIjoiY2x6b2FqbGRjMHkyZDJzcG5qYm5uZmpieiJ9.SzzNGx4C0S3HlYepS9jOqw';

const ActiveUsersMap: React.FC = () => {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);

  const countriesData = [
    { name: "India", percentage: 50 },
    { name: "Canada", percentage: 30 },
    { name: "Russia", percentage: 20 },
    { name: "United Kingdom", percentage: 40 },
    { name: "Australia", percentage: 60 },
    { name: "United States", percentage: 20 },
    { name: "Pakistan", percentage: 20 },
  ];

  useEffect(() => {
    if (mapContainerRef.current) {
      const map = new mapboxgl.Map({
        container: mapContainerRef.current,
        style: 'mapbox://styles/mapbox/light-v10', // You can change the map style here
        center: [0, 20], // Set the initial center position [lng, lat]
        zoom: 1.5, // Set the initial zoom level
      });

      // Optionally, add markers or other map features
      countriesData.forEach(country => {
        // Add markers, or other custom features for each country
        // Example: Display markers on specific country coordinates
        // You would need to replace 'countryCoords' with actual coordinates for each country
        // new mapboxgl.Marker().setLngLat(countryCoords).addTo(map);
      });

      // Clean up on unmount
      return () => map.remove();
    }
  }, []);

  return (
    <div className="flex ">
      <div className="flex-1 rounded-md overflow-hidden">
        <div ref={mapContainerRef} className='h-[400px]' />
      </div>
      <div className=" text-white p-4">
        <h2 className="font-bold text-lg mb-4">Active users</h2>
        {countriesData.map(country => (
          <div key={country.name} className="flex items-center justify-between mb-2">
            <div className="flex items-center">
              <span className={`w-6 h-6 rounded-full mr-2 bg-gradient-to-br from-green-400 to-blue-600`}></span>
              {country.name}
            </div>
            <div className="w-24 bg-gray-700 rounded-full h-4 overflow-hidden">
              <div className="bg-blue-500 h-full" style={{ width: `${country.percentage}%` }}></div>
            </div>
            <span>{country.percentage}%</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ActiveUsersMap;
