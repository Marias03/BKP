"use client";
import { QRCodeCanvas } from "qrcode.react";

export default function codigoqr() {
  const data = "https://tudominio.com/usuario/12345";

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl p-6 max-w-md w-full text-center space-y-6">
        <div className="bg-green-100 text-green-800 rounded-xl p-4 text-sm font-medium shadow-sm">
          ✅ Tus documentos han sido verificados con éxito. <br />
          Este es tu QR de identificación:
        </div>

        <div className="flex justify-center">
          <QRCodeCanvas value={data} size={200} />
        </div>

        <p className="text-gray-500 text-xs">
          Escanea este código QR para validar tu identidad en cualquier lugar
          autorizado.
        </p>
      </div>
    </div>
  );
}
