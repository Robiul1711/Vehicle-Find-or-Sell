import React from "react";
import ReactPaginate from "react-paginate";

const PaginationComponent = ({ pageCount, setPageCount, forcePage, scrollContainerId }) => {
  const handlePageChange = (event) => {
    setPageCount(event.selected + 1);
    if (scrollContainerId) {
      const element = document.getElementById(scrollContainerId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  };

  return (
    <div>
      <ReactPaginate
        breakLabel="..."
        pageCount={pageCount || 1}
        pageRangeDisplayed={3}
        marginPagesDisplayed={2}
        onPageChange={handlePageChange}
        containerClassName="flex items-center md:gap-3 gap-1 flex-wrap"
        previousLabel={
          <>
            <span className="hidden md:inline">Previous</span>
            <span className="md:hidden">&lt;</span>
          </>
        }
        nextLabel={
          <>
            <span className="hidden md:inline">Next</span>
            <span className="md:hidden">&gt;</span>
          </>
        }
        previousClassName="px-2 py-1.5 md:px-4 md:py-2 text-xs md:text-sm font-medium text-gray-700 bg-white border rounded-md cursor-pointer"
        nextClassName="px-2 py-1.5 md:px-4 md:py-2 text-xs md:text-sm font-medium text-gray-700 bg-white border rounded-md cursor-pointer"
        activeClassName="font-[700] bg-primary rounded-lg border-none"
        activeLinkClassName="text-white"
        disabledClassName="opacity-50 cursor-not-allowed"
        breakClassName="px-2 py-1.5 md:px-4 md:py-2 text-xs md:text-sm font-medium"
        pageClassName="mx-1 cursor-pointer"
        pageLinkClassName="w-8 h-8 md:w-[42px] md:h-[36px] border border-primary flex justify-center items-center text-xs md:text-sm text-black rounded-md hover:bg-primary hover:text-white transition-colors"
        forcePage={forcePage - 1}
      />
    </div>
  );
};

export default PaginationComponent;
