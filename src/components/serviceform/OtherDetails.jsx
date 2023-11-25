import { Checkbox } from "flowbite-react";
import React from "react";

const OtherDetails = ({ detail, handleOtherDetail, emptyFields }) => {
  return (
    <div className="space-y-4">
      {detail.form &&
        Object.entries(detail.form[1]).map(([sectionInx, sectionItem]) => {
          return (
            <fieldset
              key={sectionInx}
              className="flex-col border-[1px] border-black rounded-md"
            >
              <legend className="ml-2 px-2 text-sm font-medium">
                {sectionItem.section_title}
              </legend>
              <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 justify-center items-center gap-3 p-6">
                {detail.form &&
                  Object.entries(sectionItem.form).map(([key, item], idx) => {
                    return (
                      <div key={idx}>
                        {item.type === "select" ? (
                          <div>
                            <label
                              htmlFor={item.display}
                              className="block sm:text-xs lg:text-sm font-medium mb-2"
                            >
                              {item.display.toUpperCase()}
                            </label>
                            <select
                              id={item.display}
                              name={item.variable}
                              onChange={(e) =>
                                handleOtherDetail(e, key, sectionInx)
                              }
                              className={`${
                                emptyFields.includes(item.display.toUpperCase())
                                  ? "border-red-700"
                                  : "border-gray-200"
                              } py-3 px-4 block w-full text-black rounded-md text-sm focus:border-green-500 focus:ring-green-500 dark:bg-white dark:border-gray-700`}
                            >
                              <option value="" disabled>
                                -- Select option --
                              </option>
                              {Object.entries(item.children).map(
                                ([i, option]) => {
                                  return (
                                    <option key={i} value={option.value}>
                                      {option.option}
                                    </option>
                                  );
                                }
                              )}
                            </select>
                          </div>
                        ) : null}
                        {item.type === "radio" || item.type === "checkbox" ? (
                          <div>
                            <label
                              htmlFor={item.display}
                              className="block sm:text-xs lg:text-sm font-medium mb-2"
                            >
                              {item.display.toUpperCase()}
                            </label>

                            {item.children.map((childItem, childIdx) => (
                              <div key={childIdx} className="flex items-center">
                                <input
                                  className={`${
                                    emptyFields.includes(
                                      item.display.toUpperCase()
                                    )
                                      ? "border-red-700"
                                      : "border-gray-500"
                                  } shrink-0 mt-0.5 text-green-500 focus:ring-green-500`}
                                  name={item.variable}
                                  type={item.type}
                                  value={childItem.value}
                                  onChange={(e) =>
                                    handleOtherDetail(e, key, sectionInx)
                                  }
                                />
                                <label className="ml-2">
                                  {childItem.option}
                                </label>
                              </div>
                            ))}
                          </div>
                        ) : null}
                        {item.type === "date" ||
                        item.type === "email" ||
                        item.type === "number" ||
                        item.type === "text" ? (
                          <div>
                            <label
                              htmlFor={item.display}
                              className="block sm:text-xs lg:text-sm font-medium mb-2"
                            >
                              {item.display.toUpperCase()}
                            </label>
                            <input
                              name={item.variable}
                              type={item.type}
                              id={item.display}
                              readOnly={item.display === "age"}
                              className={`${
                                emptyFields.includes(item.display.toUpperCase())
                                  ? "border-red-700"
                                  : "border-gray-200"
                              } py-3 px-4 block w-full text-black rounded-md text-sm focus:border-green-500 focus:ring-green-500 bg-white`}
                              placeholder={
                                item.display === "address"
                                  ? "Street / Barangay / Municipality"
                                  : item.display.toLowerCase()
                              }
                              aria-describedby="hs-input-helper-text"
                              onChange={(e) =>
                                handleOtherDetail(e, key, sectionInx)
                              }
                            />
                          </div>
                        ) : null}
                        {item.type === "file" ? (
                          <div>
                            <label
                              htmlFor={item.display}
                              className="block sm:text-xs lg:text-sm font-medium mb-2"
                            >
                              {`${item.display.toUpperCase()} ${
                                item.accept.includes(".doc")
                                  ? "(Only Word Document or PDF)"
                                  : "(Only JPG, PNG File Type)"
                              }`}
                            </label>
                            <input
                              name={item.variable}
                              type={item.type}
                              id={item.display}
                              accept={item.accept}
                              className={`${
                                emptyFields.includes(item.display.toUpperCase())
                                  ? "border-red-700"
                                  : "border-gray-300"
                              } block w-full text-sm text-gray-900 border rounded-lg cursor-pointer bg-gray-50 focus:outline-none `}
                              aria-describedby="hs-input-helper-text"
                              onChange={(e) =>
                                handleOtherDetail(e, key, sectionInx)
                              }
                            />
                          </div>
                        ) : null}
                      </div>
                    );
                  })}
              </div>
            </fieldset>
          );
        })}
    </div>
  );
};

export default OtherDetails;
