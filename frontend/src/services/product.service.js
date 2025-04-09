import api from "./api";

// ตั้งค่า URL ให้ถูกต้อง
const API_URL = "/api/v1/product"; // ต้องเพิ่ม /api/v1/ ให้ตรงกับ backend

const getAllProducts = async () => {
  return await api.get(`${API_URL}`);
};

const createProduct = async (product) => {
  return await api.post(API_URL, product, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

const getProductById = async (id) => {
  return await api.get(`${API_URL}/${id}`);
};

const updateProduct = async (id, product) => {
  return await api.put(`${API_URL}/${id}`, product, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

const deleteProductById = async (id) => {
  return await api.delete(`${API_URL}/${id}`);
};

const ProductService = {
  getAllProducts,
  createProduct,
  getProductById,
  updateProduct,
  deleteProductById,
};

export default ProductService;
