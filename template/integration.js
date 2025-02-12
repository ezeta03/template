const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const notion = require("@notionhq/client");

const app = express();
const port = 3000;

const client = new notion.Client({
  auth: process.env.NOTION_KEY
});

app.use(bodyParser.json());

// Serve the HTML file
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.post('/delete-block', async (req, res) => {
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

app.get('/list-blocks', async (req, res) => {
  const pageId = process.env.NOTION_PAGE_ID; // Replace with your page ID
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

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});