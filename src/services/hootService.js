const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/hoots`;


const index = async () => {
  try {
    const res = await fetch(BASE_URL, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    });
    
    const data = await res.json();
    
    if (data.err) {
      throw new Error(data.err);
    }
    
    return data;
  } catch (error) {
    console.error('Error fetching hoots:', error);
    throw error;
  }
};


// src/services/hootService.js

const show = async (hootId) => {
  try {
    const res = await fetch(`${BASE_URL}/${hootId}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    });
    
    const data = await res.json();
    
    if (data.err) {
      throw new Error(data.err);
    }
    
    return data;
  } catch (error) {
    console.error('Error fetching hoot:', error);
    throw error;
  }
};

export { 
  index,
  show,
};
