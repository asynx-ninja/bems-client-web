import React from 'react'

const OtherDetails = ({ detail, handleOtherDetail }) => {


    return (
        <div>
            {detail.form &&
                Object.entries(detail.form[1]).map(([sectionInx, sectionItem]) => {
                    return (
                        <fieldset key={sectionInx} className="flex-col border-[1px] border-black rounded-md">
                            <legend className="ml-2 px-2 text-sm font-medium">{sectionItem.section_title}</legend>
                            <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 justify-center items-center gap-3 p-6">

                                {detail.form &&
                                    Object.entries(sectionItem.form).map(([key, item], idx) => {
                                        return (
                                            <div key={idx}>
                                                {
                                                    item.type === "select" ?
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
                                                                onChange={(e) => handleOtherDetail(e, key, sectionInx)}
                                                                className="py-3 px-4 block w-full text-black border-gray-200 rounded-md text-sm focus:border-green-500 focus:ring-green-500 dark:bg-white dark:border-gray-700"
                                                            >
                                                                {
                                                                    Object.entries(item.children).map(([i, option]) => {
                                                                        return (
                                                                            <option key={i} value={option.value}>{option.option}</option>
                                                                        )
                                                                    })
                                                                }
                                                            </select>
                                                        </div>
                                                        : null
                                                }
                                                {
                                                    item.type === "radio" ?
                                                        <div>
                                                            <label
                                                                htmlFor={item.display}
                                                                className="block sm:text-xs lg:text-sm font-medium mb-2"
                                                            >
                                                                {item.display.toUpperCase()}
                                                            </label>
                                                            {
                                                                Object.entries(item.children).map(([i, option]) => {
                                                                    (
                                                                        <div key={i} className="flex items-center">
                                                                            <input
                                                                                className="shrink-0 mt-0.5 border-gray-200 rounded-full text-green-500 focus:ring-green-500"
                                                                                id='gender'
                                                                                name='gender'
                                                                                type="radio"
                                                                                value="Male"
                                                                                onChange={(e) => handleOtherDetail(e, key, sectionInx)}
                                                                            />
                                                                            <label htmlFor="male" className="ml-2">
                                                                                {option}
                                                                            </label>
                                                                        </div>
                                                                    )
                                                                })
                                                            }
                                                        </div>
                                                        : null
                                                }
                                                {
                                                    item.type === "date" || item.type === "email" || item.type === "number" || item.type === "text" ?
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
                                                                className="py-3 px-4 block w-full border-gray-200 text-black rounded-md text-sm focus:border-green-500 focus:ring-green-500 bg-white"
                                                                placeholder={item.display === "address" ? "Street / Barangay / Municipality" : item.display.toLowerCase()}
                                                                aria-describedby="hs-input-helper-text"
                                                                onChange={(e) => handleOtherDetail(e, key, sectionInx)}
                                                            />
                                                        </div>
                                                        : null
                                                }
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </fieldset>
                    )
                })
            }
        </div>
    )
}

export default OtherDetails