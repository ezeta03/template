import { useState, useEffect } from "react";
import { deleteBlock, listBlocks } from "../../assets/api/apiService.js";
import styles from "../../../assets/sass/modules/Inicio.module.scss";
import SafeLink from "../SmallComponents/SafeLink.jsx";
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
      setBlocks(blocks.filter((block) => block.id !== blockId));
    }
  };

  return (
    <>
      <main>
        <div className={styles.heading}>
          <h1>Manage Notion Blocks</h1>
        </div>
        <div className={styles.content}>
          <div className={styles.menu}>
            <h2>Menu</h2>
            <SafeLink to="/calendar" target="_blank">
              Calendar
            </SafeLink>
          </div>
          <div className={styles.data}>
            <div className={styles.search}>
              <input type="text" id="blockId" placeholder="Enter Block ID" />
              <button id="deleteButton">Delete Block</button>
            </div>

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
                {blocks.map((block) => (
                  <tr key={block.id}>
                    <td>{block.type}</td>
                    <td>{block.id}</td>
                    <td>{block.content}</td>
                    <td>
                      <button onClick={() => handleDeleteBlock(block.id)}>
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </>
  );
};

export default Inicio;
