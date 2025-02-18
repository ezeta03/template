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
    const { cursor } = req.query;
    const response = await client.databases.query({
      database_id: databaseId,
      start_cursor: cursor || undefined,
      page_size: 20,
    });
    
    const pages = await Promise.all(
      response.results.map(async (page) => {
        const pageDetails = await client.pages.retrieve({ page_id: page.id });
        return {
          id: pageDetails.id,
          created_time: pageDetails.created_time,
          last_edited_time: pageDetails.last_edited_time,
          properties: pageDetails.properties,
        };
      })
    );

    res.json({ success: true, pages, nextCursor: response.next_cursor, hasMore: response.has_more });
  } catch (error) {
    console.error('Error retrieving pages:', error);
    res.json({ success: false, error });
  }
});

// Inicia el servidor en el puerto especificado
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});