import { useEffect, useRef } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";
import { FiCamera, FiRefreshCw } from "react-icons/fi";

interface ScannerProps {
  scanning: boolean;
  onScan: (barcode: string) => void;
  onReset: () => void;
}

export const Scanner = ({ scanning, onScan, onReset }: ScannerProps) => {
  const scannerRef = useRef<Html5QrcodeScanner | null>(null);

  useEffect(() => {
    if (!scanning) return;

    const scanner = new Html5QrcodeScanner(
      "reader",
      {
        fps: 10,
        qrbox: { width: 250, height: 250 },
        aspectRatio: 1.0,
        rememberLastUsedCamera: true,
      },
      false,
    );

    scanner.render(
      async (decodedText) => {
        await scanner.clear();
        scannerRef.current = null;
        onScan(decodedText);
      },
      (error) => console.warn("Scan error", error),
    );

    scannerRef.current = scanner;

    return () => {
      if (scannerRef.current) {
        scannerRef.current.clear().catch(console.error);
      }
    };
  }, [scanning, onScan]);

  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-4 mb-6">
      {scanning ? (
        <div id="reader" className="w-full max-w-md mx-auto" />
      ) : (
        <div className="text-center py-8">
          <FiCamera className="mx-auto text-gray-400 text-4xl mb-3" />
          <p className="text-gray-500">Scanner paused</p>
          <button
            onClick={onReset}
            className="mt-3 inline-flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-emerald-700 bg-emerald-50 rounded-lg hover:bg-emerald-100"
          >
            <FiRefreshCw size={14} /> Scan Another
          </button>
        </div>
      )}
    </div>
  );
};
