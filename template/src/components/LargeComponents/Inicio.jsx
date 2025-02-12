import { useState, useEffect } from 'react';
import { deleteBlock, listBlocks } from '../../assets/api/apiService.js';
import "../../../assets/sass/modules/Inicio.module.scss";

const Inicio = () => {
    const [blocks, setBlocks] = useState([]);

    useEffect(() => {
      async function fetchBlocks() {
        const response = await listBlocks();
        if (response.success) {
          setBlocks(response.blocks);
        }
      }
      fetchBlocks();
    }, []);
  
    const handleDeleteBlock = async (blockId) => {
      const response = await deleteBlock(blockId);
      if (response.success) {
        setBlocks(blocks.filter(block => block.id !== blockId));
      }
    };

  return (
    <>
      <h1>Manage Notion Blocks</h1>
      <input type="text" id="blockId" placeholder="Enter Block ID" />
      <button id="deleteButton">Delete Block</button>
      <h2>Block List</h2>
      <table>
        <thead>
          <tr>
            <th>Type</th>
            <th>ID</th>
            <th>Content</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {blocks.map(block => (
            <tr key={block.id}>
              <td>{block.type}</td>
              <td>{block.id}</td>
              <td>{block.content}</td>
              <td>
                <button onClick={() => handleDeleteBlock(block.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default Inicio;
