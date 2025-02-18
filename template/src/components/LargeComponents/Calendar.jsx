import React, { useState, useEffect } from "react";
import { fetchPages } from "../../assets/api/apiService";
import useTable from "./useTable";
import styles from "../../../assets/sass/modules/Calendar.module.scss";

const Calendar = () => {
  const [pages, setPages] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const rowsPerPage = 20;

  useEffect(() => {
    async function getPages() {
      try {
        const response = await fetchPages();
        if (response.success) {
          setPages(response.pages);
          setTotalItems(response.pages.length);
        } else {
          console.error('Error fetching pages:', response.error);
        }
      } catch (error) {
        console.error('Error in getPages:', error);
      }
    }
    getPages();
  }, []);

  const { slice, range } = useTable(pages, currentPage, rowsPerPage);

  const totalPages = Math.ceil(totalItems / rowsPerPage);

  const handlePageChange = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Calculate visible page range
  const getVisiblePageRange = () => {
    const delta = 2; // Number of pages to show before and after current page
    const range = [];
    const rangeWithDots = [];

    for (
      let i = Math.max(2, currentPage - delta);
      i <= Math.min(totalPages - 1, currentPage + delta);
      i++
    ) {
      range.push(i);
    }

    if (currentPage - delta > 2) {
      rangeWithDots.push(1, '...');
    } else {
      rangeWithDots.push(1);
    }

    rangeWithDots.push(...range);

    if (currentPage + delta < totalPages - 1) {
      rangeWithDots.push('...', totalPages);
    } else if (totalPages > 1) {
      rangeWithDots.push(totalPages);
    }

    return rangeWithDots;
  };

  return (
    <main>
      <div className={styles.content}>
        <div className={styles.data}>
          <h2>Database Pages</h2>
          <div className={styles.search}>
            <input type="text" id="blockId" placeholder="Enter Block ID" />
            <button id="deleteButton">Delete Block</button>
          </div>
          
          <table>
            <thead>
              <tr>
                <th>Content</th>
                <th>Estado</th>
                <th>Clasificación</th>
                <th>Inicio</th>
                <th>Final</th>
                <th>Page ID</th>
              </tr>
            </thead>
            <tbody>
              {slice.map((page) => (
                <tr key={page.id}>
                  <td>{page.properties.Nombre.title[0].plain_text}</td>
                  <td>{page.properties.Estado.status.name}</td>
                  <td>{page.properties.Selección.select.name}</td>
                  <td>{page.properties.Fecha?.date?.start || "No date"}</td>
                  <td>{page.properties.Fecha?.date?.end || "No date"}</td>
                  <td>{page.id}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className={styles.pagination}>
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className={styles.paginationButton}
            >
              Anterior
            </button>

            {getVisiblePageRange().map((pageNumber, index) => (
              <button
                key={index}
                onClick={() => 
                  pageNumber !== '...' && handlePageChange(pageNumber)
                }
                className={`${styles.paginationButton} ${
                  pageNumber === currentPage ? styles.active : ''
                } ${pageNumber === '...' ? styles.dots : ''}`}
                disabled={pageNumber === '...'}
              >
                {pageNumber}
              </button>
            ))}

            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={styles.paginationButton}
            >
              Siguiente
            </button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Calendar;