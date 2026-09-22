import API from '../axios';
import { ENDPOINTS } from '../endpoints';
import type { ApiResponse, PaginatedData, Product } from '../../types/product.types';



// Get all Collections first to represent The TAB ALL in the Shop Page, then get products for each collection to display in the shop page
export const collectionServices = {

    getAllCollections: (): Promise<PaginatedData<Product>> => {
        
        return API.get<ApiResponse<PaginatedData<Product>>>(ENDPOINTS.COLLECTIONS).then(res => res.data.data);
    },

    getNewArrivals: (limit: number = 10): Promise<PaginatedData<Product>> => {
        return API.get(`${ENDPOINTS.COLLECTIONS}/new-arrivals`, { params: { limit } }).then(res => res.data.data);
    },

     getBestSellers: (limit: number = 10): Promise<PaginatedData<Product>> => {
        return API.get(`${ENDPOINTS.COLLECTIONS}/best-sellers`, { params: { limit } }).then(res => res.data.data);
    },

    getTrending: (limit: number = 10): Promise<PaginatedData<Product>> => {
        return API.get(`${ENDPOINTS.COLLECTIONS}/trending`, { params: { limit } }).then(res => res.data.data);
    },

     getFeatured:(limit: number = 10): Promise<PaginatedData<Product>> => {
        return API.get(`${ENDPOINTS.COLLECTIONS}/featured`, { params: { limit } }).then(res => res.data.data);
    }


   
}
