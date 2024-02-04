import React from "react";

const Religion = ({ variable, item, handlePersonalDetail, emptyFields }) => {
  const religions = [
    "Roman Catholic",
    "Islam",
    "Iglesia ni Cristo",
    "Philippine Independent Church (Aglipayan)",
    "Seventh-day Adventist",
    "Bible Baptist Church",
    "United Church of Christ in the Philippines",
    "Jehovah Witnesses",
    "Church of Christ",
    "Born Again",
    "Other Religous Affiliation",
    // Add more religions here...
  ];

  return (
    <div>
      <label
        htmlFor={item.display}
        className="block sm:text-xs lg:text-sm font-medium mb-2"
      >
        {item.display.toUpperCase()}
      </label>
      <select
        name={item.display}
        onChange={(e) => handlePersonalDetail(e, variable)}
        value={item.value || ""}
        className={`${
          emptyFields.includes(item.display.toUpperCase())
            ? "border-red-700"
            : "border-gray-200"
        } py-3 px-4 block w-full text-black rounded-md text-sm focus:border-green-500 focus:ring-green-500`}
      >
        <option value="">Select Religion</option>
        {religions.map((religions, id) => (
          <option key={id} value={religions}>{religions}</option>
        ))}
      </select>
    </div>
  );
};

export default Religion;
