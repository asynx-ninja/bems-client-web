import { React, useEffect, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom';
import ReactPaginate from "react-paginate";
import axios from 'axios';
import API_LINK from '../../config/API';
import defaultPFP from "../../assets/sample-image/default-pfp.png";

const BrgyOfficials = () => {
    const [searchParams] = useSearchParams();
    const brgy = searchParams.get("brgy");
    const [officials, setOfficials] = useState([])
    const [brgyChairman, setBrgyChairman] = useState([])
    const [currentPage, setCurrentPage] = useState(0);
    const [pageCount, setPageCount] = useState(0);

    useEffect(() => {
        const getPositionByOrder = (a, b) => {
            const positionsOrder = ['Barangay Chairman', 'Counsilor', 'Barangay Kagawad', 'SK Chairman', 'SK Kagawad', 'Secretary', 'Treasurer'  ];
            return positionsOrder.indexOf(a.position) - positionsOrder.indexOf(b.position);
        }
        const getOfficials = async () => {
            try {
                const brgy_official = await axios.get(`${API_LINK}/brgyofficial/?brgy=${brgy}&page=${currentPage}&archived=${false}&position=${"ALL"}`);

                const brgy_chairman = brgy_official.data.result.filter((item) => item.position === "Barangay Chairman")

                var chairman = document.getElementById("chairman");
                chairman.src =
                    brgy_chairman[0] && brgy_chairman[0].picture && brgy_chairman[0].picture.link !== undefined
                        ? brgy_chairman[0].picture.link
                        : defaultPFP;

                const filtered = brgy_official.data.result.filter((item) => item.position !== "Barangay Chairman")

                setBrgyChairman(brgy_chairman[0])
                setOfficials(filtered.sort(getPositionByOrder))
                setPageCount(brgy_official.data.pageCount);
            } catch (error) {
                console.log(error)
            }
        }
        getOfficials()
    }, [brgy, currentPage])

    const handlePageChange = ({ selected }) => {
        setCurrentPage(selected);
    };

    // console.log(brgyChairman)

    return (
        <div className='w-full flex flex-col'>
            <div className='w-full mx-auto mt-[100px] mb-[20px]'>
                <div className='rounded-xl w-[300px] mx-auto bg-gradient-to-r from-[#295141] to-[#408D51] relative z-[50] flex transition-all border-b-[0px] border-b-gray-400 hover:border-b-[5px] hover:scale-105'>
                    <div className='bg-[url("/header-bg.png")] w-[300px] relative flex flex-col p-5 rounded-xl mx-auto transition-all'>
                        <div className='mx-auto absolute top-[-70px] rounded-full border-custom-green-header border-[5px] left-[72px]'>
                            <img
                                className='w-[150px] h-[150px] rounded-full'
                                id='chairman'
                                alt="" />
                        </div>
                        <div className='flex flex-col mt-[80px] justify-center items-center'>
                            <h1 className='text-center text-white font-bold uppercase'>
                                {brgyChairman.lastName}, {brgyChairman.firstName} {brgyChairman.suffix}
                            </h1>
                            <p className='text-center text-[14px] text-white uppercase'>
                                {brgyChairman.position}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <div className='px-[45px] grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>
                {
                    officials.map((item, i) => (
                        <div key={i} className='flex flex-col mt-[100px]'>
                            <div className='bg-[url("/header-bg.png")] w-[300px] relative flex flex-col p-5 rounded-xl mx-auto bg-custom-green-header transition-all border-b-[0px] border-b-gray-400 hover:border-b-[5px] hover:scale-105'>
                                <div className='mx-auto absolute top-[-70px] rounded-full border-custom-green-header border-[5px] left-[72px]'>
                                    <img
                                        className='w-[150px] h-[150px] rounded-full'
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

export default BrgyOfficials