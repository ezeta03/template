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

// Nueva función para obtener los datos de la base de datos
export async function fetchProperties() {
  const response = await fetch(`${API_BASE_URL}/properties`);
  return response.json();
}

export async function fetchPages(page = 1) {
  try {
    const response = await fetch(`${API_BASE_URL}/pages?page=${page}`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return await response.json();
  } catch (error) {
    console.error('Error in fetchPages:', error);
    throw error;
  }
}