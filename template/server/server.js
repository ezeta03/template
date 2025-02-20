import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import { Client as NotionClient } from '@notionhq/client';
import dotenv from 'dotenv';

// Cargar variables de entorno desde el archivo .env
dotenv.config();

// Inicializa la aplicación Express
const app = express();
const port = 3001; // Usa un puerto diferente al del cliente

// Inicializa el cliente de Notion con la clave de la API
const client = new NotionClient({
  auth: process.env.NOTION_KEY
});

// Middleware para analizar el cuerpo de las solicitudes JSON
app.use(bodyParser.json());

// Middleware CORS
app.use(cors());

// Obtiene la ruta del directorio actual (necesario para ES6 modules)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ruta para eliminar un bloque en Notion
app.post('/api/delete-block', async (req, res) => {
  const { blockId } = req.body;
  try {
    const response = await client.blocks.delete({
      block_id: blockId,
    });
    res.json({ success: true, response });
  } catch (error) {
    console.error("Error deleting block:", error);
    res.json({ success: false, error });
  }
});

// Ruta para listar los bloques de una página en Notion
app.get('/api/list-blocks', async (req, res) => {
  const pageId = process.env.NOTION_PAGE_ID; // Reemplaza con tu ID de página
  try {
    const response = await client.blocks.children.list({
      block_id: pageId,
    });
    const blocks = response.results.map(block => ({
      id: block.id,
      type: block.type,
      content: block[block.type]?.rich_text?.[0]?.text?.content || 'N/A'
    }));
    res.json({ success: true, blocks });
    console.log(response.results.map);
  } catch (error) {
    console.error("Error listing blocks:", error);
    res.json({ success: false, error });
  }
});

// Nueva ruta para obtener los datos de la base de datos
app.get('/api/properties', async (req, res) => {
  try {
    const databaseId = process.env.NOTION_DATABASE_ID;
    const response = await client.databases.query({
      database_id: databaseId,
      filter_properties: ["title", "eKrO", "a%60D%5D", "~%7C%60r"] // Reemplaza con los IDs de las propiedades que deseas filtrar
    });
    console.log(response.results); // Agrega esto para ver la respuesta en la consola
    res.json({ success: true, properties: response.results });
  } catch (error) {
    console.error('Error retrieving properties:', error);
    res.json({ success: false, error });
  }
});

app.get('/api/pages', async (req, res) => {
  try {
    const databaseId = process.env.NOTION_DATABASE_ID;
    const pageSize = 20;
    
    // Realizar una consulta inicial para obtener el total de registros
    const initialQuery = await client.databases.query({
      database_id: databaseId,
      page_size: 100 // Máximo permitido por Notion
    });

    let allResults = [...initialQuery.results];
    let nextCursor = initialQuery.next_cursor;

    // Obtener todos los resultados usando el cursor
    while (nextCursor) {
      const response = await client.databases.query({
        database_id: databaseId,
        start_cursor: nextCursor,
        page_size: 100
      });
      allResults = [...allResults, ...response.results];
      nextCursor = response.next_cursor;
    }

    // Calcular la paginación
    const page = parseInt(req.query.page) || 1;
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const paginatedResults = allResults.slice(startIndex, endIndex);

    // Obtener los detalles de las páginas paginadas
    const pages = await Promise.all(
      paginatedResults.map(async (page) => {
        return {
          id: page.id,
          created_time: page.created_time,
          last_edited_time: page.last_edited_time,
          properties: page.properties,
        };
      })
    );

    res.json({
      success: true,
      pages,
      total: allResults.length,
      currentPage: page,
      totalPages: Math.ceil(allResults.length / pageSize)
    });

  } catch (error) {
    console.error('Error retrieving pages:', error);
    res.json({ success: false, error: error.message });
  }
});

// Inicia el servidor en el puerto especificado
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});