import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { fetchProductsByPage } from "../../redux/slices/ProductSlice";
import { calculatePaging } from "../../utils/CatalogUtils";
import "./PageNavigator.css";

const PageNavigator = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const paging = useSelector(state => state.product.paging);

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const page = parseInt(queryParams.get('page')) || 1;
    dispatch(fetchProductsByPage({ page }));
  }, [dispatch, location.search]);



  const navigatePrevious = () => {
    if (paging && paging.currentPage > 1) {
      const previousPage = paging.currentPage - 1;
      navigate(`/products/all?page=${previousPage}`);
    }
  };

  const navigateToNumber = (e) => {
    e.preventDefault();
    const newPage = parseInt(e.currentTarget.id);
    navigate(`/products/all?page=${newPage}`);
  };



  const navigateNext = () => {
    if (paging && paging.currentPage < paging.totalPages) {
      const nextPage = paging.currentPage + 1;
      navigate(`/products/all?page=${nextPage}`);
    }
  };

  if (!paging) {
    return null;
  }

  return (
    <div className="catalog-search-page-navigator">
      <p className="catalog-search-page-navigator-navigate" onClick={navigatePrevious}>Prev</p>
      <div className="catalog-search-page-numbers">
        {calculatePaging(paging).map((num) => {
          if (num === `${paging.currentPage}`) {
            return <p key={num} className="catalog-search-page-number number-active">{num}</p>;
          }
          return <p key={num} id={num} className="catalog-search-page-number" onClick={navigateToNumber}>{num}</p>;
        })}
      </div>
      <p className="catalog-search-page-navigator-navigate" onClick={navigateNext}>Next</p>
    </div>
  );
};

export default PageNavigator;



