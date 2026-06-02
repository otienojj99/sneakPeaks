import API from '../axios'
import { ENDPOINTS } from '../endpoints'
import type { BarcodeLookupResult, ScanPayload, ScanResponse } from '../../types/scan.types';

export const scanService = {
     /**
   * Look up product by barcode
   */
  lookupBarcode: async (barcode: string): Promise<BarcodeLookupResult> => {
    const response = await API.get(`${ENDPOINTS.BARCODES}/lookup`, { params: { barcode } });
    return response.data.data;
  },

  /**
   * Process a check‑in / check‑out transaction
   */

  processTransaction: async (payload: ScanPayload): Promise<ScanResponse> => {
    try {
      const response = await API.post(ENDPOINTS.SCAN, payload);
      return response.data.data;
    } catch (error: unknown) {
      console.error('scanService.processTransaction failed', {
        payload,
        endpoint: ENDPOINTS.SCAN,
        error,
      });

      // If using Axios, extract more useful info
      if (typeof error === 'object' && error !== null && 'response' in error) {
        // @ts-ignore
        console.error('API error response', error.response);
      }

      throw error;
    }
  }
}