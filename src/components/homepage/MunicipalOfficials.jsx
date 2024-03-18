import { React, useEffect, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom';
import ReactPaginate from "react-paginate";
import axios from 'axios';
import API_LINK from '../../config/API';
import defaultPFP from "../../assets/sample-image/default-pfp.png";

const MunicipalOfficials = () => {
    const brgy = "MUNISIPYO";
    const [officials, setOfficials] = useState([])
    const [cityMayor, setCityMayor] = useState([])
    const [currentPage, setCurrentPage] = useState(0);
    const [pageCount, setPageCount] = useState(0);
    const [info, setInfo] = useState({
        banner: {
            link: "",
        },
        logo: {
            link: "",
        },
    });

    useEffect(() => {
        const getPositionByOrder = (a, b) => {
            const positionsOrder = ['City Mayor', 'Vice Mayor', 'Barangay Kagawad', 'Secretary', 'Assistant Secretary', 'Treasurer', 'SK Chairman', 'SK Kagawad', 'SK Secretary', 'SK Treasurer'];
            return positionsOrder.indexOf(a.position) - positionsOrder.indexOf(b.position);
        }
        const getOfficials = async () => {
            try {
                const response = await axios.get(`${API_LINK}/mofficials/?brgy=${brgy}`);
                setInfo(response.data[0]);

                const m_official = await axios.get(`${API_LINK}/mofficials/?brgy=${brgy}&page=${currentPage}&archived=${false}&position=${"ALL"}`);

                const city_mayor = m_official.data.result.filter((item) => item.position === "City Mayor")

                var mayor = document.getElementById("mayor");
                mayor.src =
                    city_mayor[0] && city_mayor[0].picture && city_mayor[0].picture.link !== undefined
                        ? city_mayor[0].picture.link
                        : defaultPFP;

                const filtered = m_official.data.result.filter((item) => item.position !== "City Mayor")

                setCityMayor(city_mayor[0])
                setOfficials(filtered.sort(getPositionByOrder))
                setPageCount(m_official.data.pageCount);
            } catch (error) {
                console.log(error)
            }
        }
        getOfficials()
    }, [brgy, currentPage])

    const handlePageChange = ({ selected }) => {
        setCurrentPage(selected);
    };

    // console.log(cityMayor)

    return (
        <div className='w-[80%] mx-auto flex flex-col'>
            <section className="">
                <div className="container mx-auto text-center">
                    <h1 className="sm:text-[24px] md:text-4xl font-bold mb-4">
                        Meet Our Municipal Officials
                    </h1>
                    {/* <p className="sm:text-[14px] md:text-[18px]">
                        Explore our range of premium services
                    </p> */}
                </div>
            </section>
            <div className='w-full mx-auto mt-[150px] mb-[20px]'>
                <div
                    className={`rounded-xl w-[300px] mx-auto bg-gradient-to-r from-custom-green-header to-custom-green-button relative z-[50] flex transition-all border-b-[0px] border-b-gray-400 hover:border-b-[5px] hover:scale-105`}
                >
                    <div className='bg-[url("/header-bg.png")] w-[300px] relative flex flex-col p-5 rounded-xl mx-auto transition-all'>
                        <div
                            className={`mx-auto absolute top-[-70px] rounded-full border-custom-green-header border-[5px] left-[72px]`}
                        >
                            <img
                                className='w-[150px] h-[150px] rounded-full bg-white'
                                id='mayor'
                                alt="" />
                        </div>
                        <div className='flex flex-col mt-[80px] justify-center items-center'>
                            <h1 className='text-center text-white font-bold uppercase'>
                                {cityMayor.lastName}, {cityMayor.firstName} {cityMayor.suffix}
                            </h1>
                            <p className='text-center text-[14px] text-white uppercase'>
                                {cityMayor.position}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <div className='px-[45px] grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>
                {
                    officials.map((item, i) => (
                        <div key={i} className='flex flex-col mt-[100px]'>
                            <div
                                className={`bg-[url("/header-bg.png")] w-[300px] relative flex flex-col p-5 rounded-xl mx-auto bg-custom-green-header transition-all border-b-[0px] border-b-gray-400 hover:border-b-[5px] hover:scale-105`}
                            >
                                <div
                                    className={`mx-auto absolute top-[-70px] rounded-full border-custom-green-header border-[5px] left-[72px]`}
                                >
                                    <img
                                        className='w-[150px] h-[150px] rounded-full bg-white'
                                        src={item.picture.link}
                                        alt="" />
                                </div>
                                <div className='flex flex-col mt-[80px] justify-center items-center'>
                                    <div>
                                        <h1 className='text-center text-white font-bold uppercase'>
                                            {item.lastName}, {item.firstName} {item.suffix}
                                        </h1>
                                        <p className='text-center text-[14px] text-white uppercase'>
                                            {item.position}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>
            <div className="md:py-4 md:px-4 w-full mt-[30px] bg-custom-green-header flex items-center justify-between sm:flex-col-reverse md:flex-row sm:py-3">
                <span className="font-medium text-white sm:text-xs text-sm">
                    Showing {currentPage + 1} out of {pageCount} pages
                </span>
                <ReactPaginate
                    breakLabel="..."
                    nextLabel=">>"
                    onPageChange={handlePageChange}
                    pageRangeDisplayed={3}
                    pageCount={pageCount}
                    previousLabel="<<"
                    className="flex space-x-3 text-white font-bold"
                    activeClassName="text-yellow-500"
                    disabledLinkClassName="text-gray-300"
                    renderOnZeroPageCount={null}
                />
            </div>
        </div>
    )
}

export default MunicipalOfficials