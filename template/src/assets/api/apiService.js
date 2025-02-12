// src/assets/api/apiService.js
const API_BASE_URL = "http://localhost:3001/api"; // Asegúrate de que esta URL apunte al servidor Express

export async function deleteBlock(blockId) {
  const response = await fetch(`${API_BASE_URL}/delete-block`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ blockId }),
  });
  return response.json();
}

export async function listBlocks() {
  const response = await fetch(`${API_BASE_URL}/list-blocks`);
  return response.json();
}
