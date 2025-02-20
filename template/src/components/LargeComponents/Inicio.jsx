import { useState, useEffect } from "react";
import { deleteBlock, listBlocks } from "../../assets/api/apiService.js";
import styles from "../../../assets/sass/modules/Inicio.module.scss";
// import SafeLink from "../SmallComponents/SafeLink.jsx";
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
      <main className={styles.mainContainer}>
        <div className={styles.content}>
          <div className={styles.data}>
            <h2>Block List</h2>
            <div className={styles.search}>
              <input type="text" id="blockId" placeholder="Enter Block ID" />
              <button id="deleteButton">Delete Block</button>
            </div>
            <div className={styles.tableContainer}>
              <table>
                <thead>
                  <tr>
                     <th className={styles.typeCol}>Type</th>
                     <th className={styles.idCol}>ID</th>
                     <th className={styles.contentCol}>Content</th>
                     <th className={styles.actionCol}>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {blocks.map((block) => (
                    <tr key={block.id}>
                      <td className={styles.typeCol}>{block.type}</td>
                      <td className={styles.idCol}>{block.id}</td>
                      <td className={styles.contentCol}>{block.content}</td>
                      <td className={styles.actionCol}>
                        <button
                          className={styles.buttonTable}
                          onClick={() => handleDeleteBlock(block.id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Inicio;
