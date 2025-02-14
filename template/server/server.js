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
app.get('/api/get-database', async function (request, response) {
  const databaseId = process.env.NOTION_DATABASE_ID;

  try {
    const queryResponse = await client.databases.retrieve({
      database_id: databaseId,
    });
    response.json(queryResponse);
  } catch (error) {
    console.error('Error fetching data from Notion:', error);
    response.status(500).json({ message: 'Internal Server Error', error });
  }
});

// Inicia el servidor en el puerto especificado
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});