import React from 'react'

const Sex = ({ variable, item, setDefault, handlePersonalDetail }) => {

    return (
        <div>
            <label className="block sm:text-xs lg:text-sm font-medium mb-2">
                {item.display.toUpperCase()}
            </label>
            <div className="flex items-center">
                <input
                    className="shrink-0 mt-0.5 border-gray-200 rounded-full text-green-500 focus:ring-green-500"
                    id='gender'
                    name='gender'
                    type="radio"
                    value="Male"
                    checked={setDefault(variable) === "Male"}
                    onChange={(e) => handlePersonalDetail(e, variable)}
                />
                <label htmlFor="male" className="ml-2">
                    Male
                </label>
                <input
                    className="ml-4 shrink-0 mt-0.5 border-gray-200 rounded-full text-green-500 focus:ring-green-500"
                    id='gender'
                    name='gender'
                    type="radio"
                    value="Female"
                    checked={setDefault(variable) === "Female"}
                    onChange={(e) => handlePersonalDetail(e, variable)}
                />
                <label className="ml-2">Female</label>
            </div>
        </div>
    )
}

export default Sex