import React from 'react'

const CivilStatus = ({ variable, item, setDefault, handlePersonalDetail }) => {

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
                className="py-3 px-4 block w-full text-black border-gray-200 rounded-md text-sm focus:border-green-500 focus:ring-green-500 dark:bg-white dark:border-gray-700"
            >
                <option value="">Civil Status</option>
                <option value="single">Single</option>
                <option value="married">Married</option>
                <option value="widowed">Widowed</option>
                <option value="legally separated">Legally Separated</option>
            </select>
        </div>
    )
}

export default CivilStatus