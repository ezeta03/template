import React, { useState, useEffect } from 'react';
import { fetchPages } from '../../assets/api/apiService';
import '../../../assets/sass/modules/Calendar.module.scss';

const Calendar = () => {
  const [pages, setPages] = useState([]);

  useEffect(() => {
    async function getPages() {
      const response = await fetchPages();
      if (response.success) {
        setPages(response.pages.map(page => ({
          id: page.id,
          created_time: page.created_time,
          last_edited_time: page.last_edited_time,
          properties: page.properties,
        })));
      }
    }
    getPages();
  }, []);

  return (
    <>
      <h1>Database Pages</h1>
      <table>
        <thead>
          <tr>
            <th>Content</th>
            <th>Estado</th>
            <th>Clasificación</th>
            <th>Inicio</th>
            <th>Final</th>
            <th>Page ID</th>
            {/* <th>Created Time</th>
            <th>Last Edited Time</th> */}
          </tr>
        </thead>
        <tbody>
          {pages.map(page => (
            <tr key={page.id}>
              <td>{page.properties.Nombre.title[0].plain_text}</td>
              <td>{page.properties.Estado.status.name}</td>
              <td>{page.properties.Selección.select.name}</td>
              <td>{page.properties.Fecha?.date?.start || "No date"}</td>
              <td>{page.properties.Fecha?.date?.end || "No date"}</td>

              <td>{page.id}</td>
              {/* <td>{page.created_time}</td>
              <td>{page.last_edited_time}</td> */}
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default Calendar;
