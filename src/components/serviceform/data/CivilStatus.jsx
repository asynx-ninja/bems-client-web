import React from "react";

const CivilStatus = ({ variable, item, handlePersonalDetail, emptyFields }) => {
  return (
    <div>
      <label
        htmlFor={item.display}
        className="block sm:text-xs lg:text-sm font-medium mb-2"
      >
        {item.display.toUpperCase()}
      </label>
      <select
        id={item.display}
        name={item.display}
        onChange={(e) => handlePersonalDetail(e, variable)}
        value={item.value || ""}
        className={`${
          emptyFields.includes(item.display.toUpperCase())
            ? "border-red-700"
            : "border-gray-200"
        } py-3 px-4 block w-full text-black rounded-md text-sm focus:border-green-500 focus:ring-green-500 dark:bg-white dark:border-gray-700`}
      >
        <option value="">Civil Status</option>
        <option value="Single">Single</option>
        <option value="Married">Married</option>
        <option value="Widowed">Widowed</option>
        <option value="Legally separated">Legally Separated</option>
      </select>
    </div>
  );
};

export default CivilStatus;
