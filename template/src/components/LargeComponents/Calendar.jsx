import React, { useState, useEffect } from "react";
import { fetchPages } from "../../assets/api/apiService";
import styles from "../../../assets/sass/modules/Calendar.module.scss";

const LoadingSpinner = () => (
  <div className={styles.loadingContainer}>
    <div className={styles.spinner}></div>
    <p>Loading data...</p>
  </div>
);

const Calendar = () => {
  const [pages, setPages] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadPages = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetchPages(currentPage);
        if (response.success) {
          setPages(response.pages);
          setTotalPages(response.totalPages);
        } else {
          setError(response.error || 'Error al cargar los datos');
        }
      } catch (err) {
        setError('Error de conexión al servidor');
        console.error('Error loading pages:', err);
      }
      setIsLoading(false);
    };

    loadPages();
  }, [currentPage]);

  const handlePageChange = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const getVisiblePageRange = () => {
    const delta = 2;
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
    <main className={styles.mainContainer}>
      <div className={styles.content}>
        <div className={styles.data}>
          <h2>Database Pages</h2>
          <div className={styles.search}>
            <input type="text" id="blockId" placeholder="Enter Block ID" />
            <button id="deleteButton">Delete Block</button>
          </div>
          
          <div className={styles.tableContainer}>
            <table>
              <thead>
                <tr>
                  <th className={styles.contentCol}>Content</th>
                  <th className={styles.statusCol}>Estado</th>
                  <th className={styles.classificationCol}>Clasificación</th>
                  <th className={styles.dateCol}>Inicio</th>
                  <th className={styles.dateCol}>Final</th>
                  <th className={styles.idCol}>Page ID</th>
                </tr>
              </thead>
              <tbody>
                {isLoading ? (
                  <tr>
                    <td colSpan="6">
                      <LoadingSpinner />
                    </td>
                  </tr>
                ) : error ? (
                  <tr>
                    <td colSpan="6" className={styles.error}>
                      {error}
                    </td>
                  </tr>
                ) : (
                  pages.map((page) => (
                    <tr key={page.id}>
                      <td className={styles.contentCol}>{page.properties.Nombre.title[0].plain_text}</td>
                      <td className={styles.statusCol}>{page.properties.Estado.status.name}</td>
                      <td className={styles.classificationCol}>{page.properties.Selección.select.name}</td>
                      <td className={styles.dateCol}>{String(page.properties.Fecha?.date?.start).split("T")[0].replaceAll("-", "/") || "No date"}</td>
                      <td className={styles.dateCol}>{String(page.properties.Fecha?.date?.end).split("T")[0].replaceAll("-", "/") || "No date"}</td>
                      <td className={styles.idCol}>{page.id}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {!isLoading && !error && (
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
          )}
        </div>
      </div>
    </main>
  );
};

export default Calendar;