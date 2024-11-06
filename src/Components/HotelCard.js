import React from "react";

const ImageWithAlt = ({ src, alt, className }) => (
  <img loading="lazy" src={src} className={className} alt={alt} />
);

const HotelCard = ({ name, location, rating, images = [], rooms }) => {
  return (
    <div className="flex justify-center py-4 px-2 md:px-0">
      <div className="w-full md:w-[1111px] max-w-4xl h-auto md:h-[250px] flex flex-col md:flex-row shadow-lg justify-between">
        
        {/* Image Section */}
        <div className="flex flex-col p-5 bg-white items-center md:items-start">
          {images.length > 0 ? (
            <div className="w-full md:w-[257px] h-[150px] md:h-[149px] flex-shrink-0">
              <ImageWithAlt
                src={images[0]}
                alt={`${name} image`}
                className="w-full h-full object-cover rounded"
              />
            </div>
          ) : (
            <div className="w-full md:w-[257px] h-[150px] md:h-[149px] flex-shrink-0 bg-gray-200 flex items-center justify-center rounded">
              <span className="text-gray-500 text-sm">No Image Available</span>
            </div>
          )}
          {images.length > 1 && (
            <div className="flex mt-2 md:ml-4">
              {images.slice(1, 5).map((image, index) => (
                <ImageWithAlt
                  key={index}
                  src={image}
                  alt={`${name} image ${index + 2}`}
                  className="w-[48px] md:w-[62px] h-[48px] md:h-[56px] object-cover rounded mr-2"
                />
              ))}
            </div>
          )}
        </div>
        
        {/* Hotel Info Section */}
        <div className="flex flex-col justify-center mt-4 md:mt-0 ml-0 md:ml-4 text-center md:text-left">
          <h2 className="text-lg md:text-xl font-bold">{name}</h2>
          <p className="text-gray-600 text-sm md:text-base">{location}</p>
          <p className="text-yellow-500 text-sm md:text-base">{"⭐️".repeat(rating)}</p>
        </div>
        
        {/* Price & Rating Section */}
        <div className="w-full md:w-[252px] mt-4 md:mt-0 h-auto md:h-full bg-green flex flex-col items-center md:items-center justify-center p-4">
          <div className="flex flex-row justify-center md:justify-start">
            <p className="text-blue-400 text-sm md:text-base">Very Good</p>
            <button className="bg-blue-600 text-white p-2 ml-2 rounded">
              {rating}
            </button>
          </div>
          <div className="mt-4 text-center md:text-left">
            <h1 className="text-lg md:text-xl font-semibold">Rs: {rooms && rooms.length && rooms[0].price}</h1>
            <p className="text-sm md:text-base text-gray-500">
              + Rs: {rooms && rooms[0].costDetails.taxesAndFees} taxes & fees Per Night
            </p>
          </div>
        </div>
        
      </div>
    </div>
  );
}

export default HotelCard;
