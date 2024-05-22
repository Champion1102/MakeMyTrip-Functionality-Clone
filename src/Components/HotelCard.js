import React from "react";

const ImageWithAlt = ({ src, alt, className }) => (
  <img loading="lazy" src={src} className={className} alt={alt} />
);

const HotelCard = ({ name, location, rating, images = [], rooms }) => {
  return (
    
    <div className="flex justify-center py-4">
      <div className="w-[1111px] max-w-4xl h-[250px] flex shadow-lg flex-row justify-between">
        <div className="flex bg-white p-5 flex-col">
          {images.length > 0 ? (
            <div className="w-[257px] h-[149px] flex-shrink-0">
              <ImageWithAlt
                src={images[0]}
                alt={`${name} image`}
                className="w-full h-full object-cover rounded"
              />
            </div>
          ) : (
            <div className="w-[257px] h-[149px] flex-shrink-0 bg-gray-200 flex items-center justify-center rounded">
              <span className="text-gray-500">No Image Available</span>
            </div>
          )}
          {images.length > 1 && (
            <div className="flex ml-4">
              {images.slice(1, 5).map((image, index) => (
                <ImageWithAlt
                  key={index}
                  src={image}
                  alt={`${name} image ${index + 2}`}
                  className="w-[62px] h-[56px] object-cover rounded mr-2"
                />
              ))}
            </div>
          )}
        </div>
        <div className="ml-4 flex flex-col justify-center">
          <h2 className="text-xl font-bold">{name}</h2>
          <p className="text-gray-600">{location}</p>
          <p className="text-yellow-500">{"⭐️".repeat(rating)}</p>
        </div>
        <div className="w-[252px] h-[100%] bg-green flex flex-col items-center justify-center">
          <div className="flex flex-row">
            <p className="w-[81px] h-[18px] text-blue-400 top-[50px]">Very Good</p>
            <button className="bg-blue-600 border-r-3 border-r-solid border-r-black p-[8px] py-[2px]" style={{ borderRadius: "4px", color: "white" }}>
              {rating}
            </button>
          </div>
          <div className="m-[50px] w-[100px]">
            <h1 className="w-[100px]" style={{ fontSize: "20px" }}>Rs:{rooms && rooms.length && rooms[0].price}</h1>
            <p style={{ fontSize: "15px", color: "gray" }}>+ Rs:{rooms && rooms[0].costDetails.taxesAndFees} taxes & fees Per Night</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HotelCard;
