import ReactPaginate from "react-paginate";
import { MdArrowLeft, MdArrowRight } from "react-icons/md";
import "../../assets/css/components/layouts/Pagination.css";

function Pagination({ handlePageClick, pageCount }) {
  return (
    <>
      <ReactPaginate
        breakLabel="..."
        nextLabel={<MdArrowRight className="arrow" />}
        onPageChange={handlePageClick}
        pageRangeDisplayed={3}
        pageCount={pageCount}
        previousLabel={<MdArrowLeft className="arrow" />}
        containerClassName="pagination "
        activeClassName="active"
      />
    </>
  );
}

export default Pagination;
