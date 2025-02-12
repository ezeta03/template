import { useState } from "react";
import "../../../assets/sass/modules/Inicio.module.scss";

const Inicio = () => {
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
        <tbody id="blockList"></tbody>
      </table>
    </>
  );
};

export default Inicio;
