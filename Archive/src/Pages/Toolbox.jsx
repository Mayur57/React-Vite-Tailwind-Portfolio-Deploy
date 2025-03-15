import React from "react";

  
  export default function Toolbox() {
    return (
      <div className="grid grid-cols-4 gap-4 p-4">
        {technologies.map((tech, index) => (
          <div
            key={index}
            className="relative bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg p-6 flex flex-col items-center justify-center shadow-lg hover:translate-y-[-5px] transition-all duration-300"
            style={{
              width: "100%",
              height: "100%",
              transform: "perspective(1000px)",
            }}
          >
            <img
              src={tech.logo}
              alt={tech.name}
              className="w-16 h-16 mb-2 object-contain transition-all duration-300"
            />
            <p className="text-white font-semibold text-lg">{tech.name}</p>
          </div>
        ))}
      </div>
    );
  }   