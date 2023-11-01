import React from 'react'

const Details = () => {

    const stats = [
        {
            title: "Total Population",
            value: "443,954",
        },
        {
            title: "Total Population",
            value: "123,456",
        },
        {
            title: "Registered Voters",
            value: "789,012",
        },
        {
            title: "Total Barangays",
            value: "789,012",
        },
        {
            title: "Total Male",
            value: "789,012",
        },
        {
            title: "Total Female",
            value: "789,012",
        },
        // Add more data as needed
    ];

    return (

        <>
            <div className="flex justify-center w-full sm:-mt-[50px] md:-mt-[150px] mb-[50px]">
                <div
                    style={{
                        background:
                            "linear-gradient(180deg, rgba(192,192,192,1) 0%, rgba(250,250,250,1) 10%)",
                    }}
                    className="rounded-[25px] sm:mx-0 md:mx-[20px] mx-auto bg-white mb-4 shadow-2xl w-full flex flex-col pb-[50px]"
                >
                    <div className="relative bg-gradient-to-r from-[#295141] to-[#408D51] mx-auto justify-center items-center rounded-t-[25px] w-full">
                        <div className="bg-[url('/header-bg.png')] rounded-t-[25px]">
                            <img
                                src="./../src/assets/barangayinfo/sanjoselogo.png"
                                alt=""
                                className="w-36 sm:w-[120px] md:w-[160px] mx-auto absolute left-0 right-0 sm:-top-[4rem] md:-top-[6rem]"
                            />
                            <div className="sm:h-[180px] md:h-[220px] flex flex-col justify-center items-center">
                                <h1 className="sm:text-[20px] md:text-[26px] md:text-4xl font-bold uppercase text-white text-center pt-[40px]">
                                    Welcome to Barangay San Jose
                                </h1>
                                <h6 className="sm:text-[16px] text-xl md:text-2xl text-center mt-2 font-bold text-white">
                                    MUNICIPALITY OF RODRIGUEZ
                                </h6>
                            </div>
                        </div>
                    </div>

                    {/* DESCRIPTION */}

                    <div className='flex pb-[20px] w-[90%] mx-auto sm:mt-[50px] md:mt-[80px] justify-between sm:flex-col-reverse lg:flex-row gap-5'>
                        <p className='sm:w-full lg:w-[60%] sm:text-[14px] md:text-[18px]'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>

                        <img
                            className='w-[400px] h-[400px] sm:mx-auto lg:mx-0 object-cover rounded-[25px]'
                            src="./../src/assets/barangayinfo/sanjosechurch.jpg"
                            alt=""
                        />
                    </div>

                    <div className="px-4 md:px-8 mt-12 md:mt-20 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-4">
                        {stats.map((item, index) => (
                            <div
                                key={index}
                                className="text-center flex flex-col bg-white border shadow-sm rounded-xl dark:bg-gray-800 dark:border-gray-700 dark:shadow-slate-700/[0.7]"
                            >
                                <div className="p-4 md:p-5">
                                    <h3 className="text-lg sm:leading-5 md:leading-none sm:text-[12px] md:text-xl uppercase font-bold mb-4 text-green-800 dark:text-white">
                                        {item.title}
                                    </h3>
                                    <span className="font-bold text-green-800 text-4xl sm:text-[24px] md:text-5xl dark:text-gray-400">
                                        {item.value}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* MISSION VISION */}

                    <div className='flex pb-[20px] border-t-2 pt-[20px] border-b-2 border-gray-400 w-[90%] mx-auto sm:mt-[50px] md:mt-[80px] justify-between sm:flex-col lg:flex-row gap-5'>
                        <div className='sm:w-full lg:w-[50%]'>
                            <h6 className='font-bold bg-custom-green-header text-[24px] pl-[15px] text-white'>MISSION</h6>

                            <p className='mt-[15px] sm:text-[14px] md:text-[18px]'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
                        </div>

                        <div className='sm:w-full lg:w-[50%]'>
                            <h6 className='font-bold bg-custom-green-header text-[24px] pl-[15px] text-white'>VISION</h6>

                            <p className='mt-[15px] sm:text-[14px] md:text-[18px]'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Details