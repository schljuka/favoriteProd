import React from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import "./SearchPageNavigator.css"


import { calculatePaging } from "../../utils/CatalogUtils";


export const CatalogSearchPageNavigator = () => {
    const pagingInformation = useSelector(state => state.product.pagingInformation);

    const navigate = useNavigate();
    const { search } = useLocation();
    

    const navigatePrevious = () => {
        if (pagingInformation && pagingInformation.currentPage !== 1) {
            if (search.includes("&page=")) {
                const splitString = search.split("&page=");
                const newTerms = splitString[0] + `&page=${pagingInformation.currentPage - 1}`;
                navigate(`/products${newTerms}`);
            } else {
                const newTerms = search + `&page=${pagingInformation.currentPage - 1}`;
                navigate(`/products${newTerms}`);
            }
        }
    }

    const navigateToNumber = (e) => {
        e.preventDefault();
        if (search.includes("&page=")) {
            const splitString = search.split("&page=");
            const newTerms = splitString[0] + `&page=${e.currentTarget.id}`;
            navigate(`/products${newTerms}`);
        } else {
            const newTerms = search + `&page=${e.currentTarget.id}`;
            navigate(`/products${newTerms}`);
        }
    }

    const navigateNext = () => {
        if (pagingInformation && pagingInformation.currentPage !== pagingInformation.totalPages) {
            if (search.includes("&page=")) {
                const splitString = search.split("&page=");
                const newTerms = splitString[0] + `&page=${pagingInformation.currentPage + 1}`;
                navigate(`/products${newTerms}`);
            } else {
                const newTerms = search + `&page=${pagingInformation.currentPage + 1}`;
                navigate(`/products${newTerms}`);
            }
        }
    }

    return (

        <div className="catalog-search-page-navigator">
            <p className="catalog-search-page-navigator-navigate" onClick={navigatePrevious}>Prev</p>
            <div className="catalog-search-page-numbers">
                {pagingInformation && calculatePaging(pagingInformation).map((num) => {
                    if (num === `${pagingInformation.currentPage}`) return <p key={num} className="catalog-search-page-number number-active">{num}</p>

                    return <p key={num} id={num} className="catalog-search-page-number" onClick={navigateToNumber}>{num}</p>
                })}
            </div>
            <p className="catalog-search-page-navigator-navigate" onClick={navigateNext}>Next</p>
        </div >
    )

}