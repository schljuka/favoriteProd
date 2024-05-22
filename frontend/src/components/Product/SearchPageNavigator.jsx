import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { fetchAllProducts } from "../../redux/slices/ProductSlice";
import "./SearchPageNavigator.css";
import { calculatePagingAll } from "../../utils/CatalogUtils";

export const SearchPageNavigator = () => {
    const dispatch = useDispatch();
    const pagingInformation = useSelector(state => state.product.pagingInformation);
    const navigate = useNavigate();
    const { search } = useLocation();
    const products = useSelector(state => state.product.products);

    useEffect(() => {
        const params = new URLSearchParams(search);
        const page = params.get('page') || 1;
        const limit = params.get('limit') || 6;
        dispatch(fetchAllProducts({ page, limit }));
    }, [dispatch, search]);

    const updateURL = (newPage) => {
        const params = new URLSearchParams(search);
        params.set('page', newPage);
        if (!params.has('limit')) {
            params.set('limit', 6);
        }
        return `/products?${params.toString()}`;
    };

    const navigatePrevious = () => {
        if (pagingInformation && pagingInformation.currentPage > 1) {
            const previousPage = pagingInformation.currentPage - 1;
            navigate(updateURL(previousPage));
        }
    };

    const navigateToNumber = (e) => {
        e.preventDefault();
        navigate(updateURL(e.currentTarget.id));
    };

    const navigateNext = () => {
        if (pagingInformation && pagingInformation.currentPage < pagingInformation.totalPages) {
            const nextPage = pagingInformation.currentPage + 1;
            navigate(updateURL(nextPage));
        }
    };

    if (products.length === 0) {
        return <h2 className="mt-5">No Search Results Found</h2>;
    }

    return (
        <div className="catalog-search-page-navigator">
            <p className="catalog-search-page-navigator-navigate" onClick={navigatePrevious}>Prev</p>
            <div className="catalog-search-page-numbers">
                {pagingInformation && calculatePagingAll(pagingInformation).map((num) => {
                    if (num === `${pagingInformation.currentPage}`) return <p key={num} className="catalog-search-page-number number-active">{num}</p>
                    return <p key={num} id={num} className="catalog-search-page-number" onClick={navigateToNumber}>{num}</p>
                })}
            </div>
            <p className="catalog-search-page-navigator-navigate" onClick={navigateNext}>Next</p>
        </div>
    );
};

export default SearchPageNavigator;