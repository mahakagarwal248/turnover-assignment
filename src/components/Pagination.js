/* eslint-disable @typescript-eslint/no-unsafe-call */
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
export default function PaginationComp({
  numberOfPages,
  currentPage,
  updateCurrentPage,
}) {
  let items = [];

  // If there are fewer than 5 pages, display all pages
  if (numberOfPages <= 5) {
    items = Array.from({ length: numberOfPages }, (_, index) => index + 1);
  } else {
    // Determine the starting page based on the current page
    let startPage = currentPage - 2;
    if (startPage < 1) {
      startPage = 1;
    } else if (startPage + 4 > numberOfPages) {
      startPage = numberOfPages - 4;
    }

    // Display the appropriate items based on the starting page
    for (let i = startPage; i < startPage + 5; i++) {
      items.push(i);
    }

    // Add "..." if necessary
    if (startPage > 1) {
      items.unshift("...");
    }
    if (startPage + 4 < numberOfPages) {
      items.push("...");
      items.push(numberOfPages);
    }
  }

  const handlePageChange = (page) => {
    updateCurrentPage(page);
  };

  return (
    <div className="flex flex-row justify-evenly">
      <p
        className={`mr-2 cursor-pointer ${currentPage === 1 ? "text-gray-500" : ""}`}
        onClick={() => handlePageChange(currentPage > 1 ? currentPage - 1 : 1)}
      >
        &lt;
      </p>
      {items.map((item, index) => (
        <p
          key={index}
          className={`cursor-pointer rounded-full px-3 py-1 ${
            item === currentPage ? "bg-blue-400" : ""
          }`}
          onClick={() => {
            if (typeof item === "number") handlePageChange(item);
          }}
        >
          {item}
        </p>
      ))}
      <p
        className={`ml-2 cursor-pointer ${
          currentPage === numberOfPages ? "text-gray-500" : ""
        }`}
        onClick={() =>
          handlePageChange(
            currentPage < numberOfPages ? currentPage + 1 : currentPage,
          )
        }
      >
        &gt;
      </p>
    </div>
  );
}
