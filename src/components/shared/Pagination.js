import ReactPaginate from "react-paginate";
import { MdArrowLeft, MdArrowRight } from "react-icons/md";
import "../../assets/css/components/layouts/Pagination.css";

function Pagination({ handlePageClick, pageCount, refStep }) {
  return (
    <div
      ref={refStep}
      style={{
        position: "fixed",
        bottom: 15,
        left: "33%",
        width: "35%",
        height: 50,
      }}
    >
      <ReactPaginate
        breakLabel="..."
        nextLabel={<MdArrowRight className="arrow" />}
        onPageChange={handlePageClick}
        pageRangeDisplayed={3}
        pageCount={pageCount}
        previousLabel={<MdArrowLeft className="arrow" />}
        containerClassName="pagination"
        activeClassName="active"
      />
    </div>
  );
}

export default Pagination;
