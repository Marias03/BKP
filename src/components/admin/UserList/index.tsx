"use client";

import {
  User,
  Cita,
  Registracion,
  Cmedico,
  Passport,
  FingerPrints,
  Visa,
  VisaPayment,
} from "@prisma/client";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { useState } from "react";

type UserWithRelations = User & {
  citas: Cita[];
  registraciones: Registracion[];
  cmedicos: Cmedico[];
  passports: Passport[];
  fingerPrints: FingerPrints[];
  visas: Visa[];
  visaPayments: VisaPayment[];
};

export default function UserList({ users }: { users: UserWithRelations[] }) {
  const [expandedUserId, setExpandedUserId] = useState<string | null>(null);

  const toggleExpand = (userId: string) => {
    setExpandedUserId(expandedUserId === userId ? null : userId);
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        Listado de Usuarios
      </h2>

      {users.length === 0 ? (
        <p className="text-gray-500">No hay usuarios registrados</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Usuario
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Rol
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Documentos
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {users.map((user) => (
                <>
                  <tr
                    key={user.id}
                    className="hover:bg-gray-50 cursor-pointer"
                    onClick={() => toggleExpand(user.id)}
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        {user.image && (
                          <div className="flex-shrink-0 h-10 w-10">
                            <img
                              className="h-10 w-10 rounded-full"
                              src={user.image}
                              alt=""
                            />
                          </div>
                        )}
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {user.name || "Sin nombre"}
                          </div>
                          <div className="text-sm text-gray-500">{user.id}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {user.email}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                        ${
                          user.role === "admin"
                            ? "bg-purple-100 text-purple-800"
                            : "bg-blue-100 text-blue-800"
                        }`}
                      >
                        {user.role}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div className="flex space-x-2">
                        <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">
                          CM: {user.cmedicos.length}
                        </span>
                        <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                          Pass: {user.passports.length}
                        </span>
                        <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded">
                          FP: {user.fingerPrints.length}
                        </span>
                        <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded">
                          Visa: {user.visas.length}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button className="text-indigo-600 hover:text-indigo-900 mr-3">
                        Editar
                      </button>
                    </td>
                  </tr>

                  {/* Expanded details */}
                  {expandedUserId === user.id && (
                    <tr className="bg-gray-50">
                      <td colSpan={5} className="px-6 py-4">
                        <div className="space-y-6">
                          {/* Document Sections */}
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Cmedicos Section */}
                            <div className="border rounded-lg p-4 bg-white">
                              <h3 className="text-lg font-medium text-gray-900 mb-3 flex items-center">
                                <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded mr-2">
                                  {user.cmedicos.length}
                                </span>
                                Certificados Médicos
                              </h3>
                              {user.cmedicos.length > 0 ? (
                                <div className="space-y-4">
                                  {user.cmedicos.map((doc) => (
                                    <div
                                      key={doc.id}
                                      className="border-b pb-3 last:border-b-0"
                                    >
                                      <p className="text-sm font-medium">
                                        Serial: {doc.serial}
                                      </p>
                                      <p className="text-sm">
                                        Número: {doc.numberdoc}
                                      </p>
                                      <p className="text-sm">
                                        Fecha: {doc.datedoc}
                                      </p>
                                      {doc.imageUrl && (
                                        <a
                                          href={doc.imageUrl}
                                          target="_blank"
                                          rel="noopener noreferrer"
                                          className="text-blue-600 text-sm underline"
                                        >
                                          Ver documento
                                        </a>
                                      )}
                                    </div>
                                  ))}
                                </div>
                              ) : (
                                <p className="text-gray-500 text-sm">
                                  No hay certificados médicos
                                </p>
                              )}
                            </div>

                            {/* Passports Section */}
                            <div className="border rounded-lg p-4 bg-white">
                              <h3 className="text-lg font-medium text-gray-900 mb-3 flex items-center">
                                <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded mr-2">
                                  {user.passports.length}
                                </span>
                                Pasaportes
                              </h3>
                              {user.passports.length > 0 ? (
                                <div className="space-y-4">
                                  {user.passports.map((doc) => (
                                    <div
                                      key={doc.id}
                                      className="border-b pb-3 last:border-b-0"
                                    >
                                      <p className="text-sm font-medium">
                                        Serial: {doc.seriall}
                                      </p>
                                      <p className="text-sm">
                                        Número: {doc.numberpas}
                                      </p>
                                      <p className="text-sm">
                                        Emisión: {doc.emisionp}
                                      </p>
                                      <p className="text-sm">
                                        Fecha: {doc.datepas}
                                      </p>
                                      {doc.imageUrl && (
                                        <a
                                          href={doc.imageUrl}
                                          target="_blank"
                                          rel="noopener noreferrer"
                                          className="text-blue-600 text-sm underline"
                                        >
                                          Ver documento
                                        </a>
                                      )}
                                    </div>
                                  ))}
                                </div>
                              ) : (
                                <p className="text-gray-500 text-sm">
                                  No hay pasaportes
                                </p>
                              )}
                            </div>

                            {/* FingerPrints Section */}
                            <div className="border rounded-lg p-4 bg-white">
                              <h3 className="text-lg font-medium text-gray-900 mb-3 flex items-center">
                                <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded mr-2">
                                  {user.fingerPrints.length}
                                </span>
                                Huellas Digitales
                              </h3>
                              {user.fingerPrints.length > 0 ? (
                                <div className="space-y-4">
                                  {user.fingerPrints.map((doc) => (
                                    <div
                                      key={doc.id}
                                      className="border-b pb-3 last:border-b-0"
                                    >
                                      <p className="text-sm font-medium">
                                        Serial: {doc.serialf}
                                      </p>
                                      <p className="text-sm">
                                        Número: {doc.numberf}
                                      </p>
                                      <p className="text-sm">
                                        Emisión: {doc.emision}
                                      </p>
                                      <p className="text-sm">
                                        Fecha: {doc.datef}
                                      </p>
                                      {doc.imageUrl && (
                                        <a
                                          href={doc.imageUrl}
                                          target="_blank"
                                          rel="noopener noreferrer"
                                          className="text-blue-600 text-sm underline"
                                        >
                                          Ver documento
                                        </a>
                                      )}
                                    </div>
                                  ))}
                                </div>
                              ) : (
                                <p className="text-gray-500 text-sm">
                                  No hay registros de huellas
                                </p>
                              )}
                            </div>

                            {/* Visas Section */}
                            <div className="border rounded-lg p-4 bg-white">
                              <h3 className="text-lg font-medium text-gray-900 mb-3 flex items-center">
                                <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded mr-2">
                                  {user.visas.length}
                                </span>
                                Visas
                              </h3>
                              {user.visas.length > 0 ? (
                                <div className="space-y-4">
                                  {user.visas.map((doc) => (
                                    <div
                                      key={doc.id}
                                      className="border-b pb-3 last:border-b-0"
                                    >
                                      <p className="text-sm font-medium">
                                        {doc.namev} {doc.surnamev}
                                      </p>
                                      <p className="text-sm">
                                        Número: {doc.nump}
                                      </p>
                                      <p className="text-sm">
                                        Emisión: {doc.emisiondate}
                                      </p>
                                      <p className="text-sm">
                                        Entrada: {doc.entry}
                                      </p>
                                      <p className="text-sm">
                                        Válido hasta: {doc.until}
                                      </p>
                                      {doc.imageUrl && (
                                        <a
                                          href={doc.imageUrl}
                                          target="_blank"
                                          rel="noopener noreferrer"
                                          className="text-blue-600 text-sm underline"
                                        >
                                          Ver documento
                                        </a>
                                      )}
                                    </div>
                                  ))}
                                </div>
                              ) : (
                                <p className="text-gray-500 text-sm">
                                  No hay visas
                                </p>
                              )}
                            </div>
                          </div>

                          {/* Visa Payments Section */}
                          <div className="border rounded-lg p-4 bg-white">
                            <h3 className="text-lg font-medium text-gray-900 mb-3">
                              Pagos de Visa ({user.visaPayments.length})
                            </h3>
                            {user.visaPayments.length > 0 ? (
                              <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200">
                                  <thead className="bg-gray-100">
                                    <tr>
                                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Fecha
                                      </th>
                                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Cantidad
                                      </th>
                                    </tr>
                                  </thead>
                                  <tbody className="bg-white divide-y divide-gray-200">
                                    {user.visaPayments.map((payment) => (
                                      <tr key={payment.id}>
                                        <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">
                                          {format(
                                            new Date(payment.date),
                                            "PPPp",
                                            { locale: es }
                                          )}
                                        </td>
                                        <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">
                                          ${payment.amount.toString()}
                                        </td>
                                      </tr>
                                    ))}
                                  </tbody>
                                </table>
                              </div>
                            ) : (
                              <p className="text-gray-500 text-sm">
                                No hay pagos registrados
                              </p>
                            )}
                          </div>

                          {/* Registraciones Section */}
                          <div className="border rounded-lg p-4 bg-white">
                            <h3 className="text-lg font-medium text-gray-900 mb-3">
                              Registraciones ({user.registraciones.length})
                            </h3>
                            {user.registraciones.length > 0 ? (
                              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {user.registraciones.map((reg) => (
                                  <div
                                    key={reg.id}
                                    className="border rounded-lg p-3 bg-gray-50"
                                  >
                                    <h4 className="font-medium text-gray-800">
                                      Residencia: {reg.residence}
                                    </h4>
                                    <p className="text-sm text-gray-600">
                                      Ciudad: {reg.city}
                                    </p>
                                    <p className="text-sm text-gray-600">
                                      Dirección: {reg.adress}
                                    </p>
                                    <p className="text-sm text-gray-600">
                                      Apartamento: {reg.apartamentNumber}
                                    </p>
                                    <p className="text-sm text-gray-600">
                                      Estado: {reg.validation}
                                    </p>
                                    {reg.finished && (
                                      <p className="text-sm text-gray-600">
                                        Finalizado:{" "}
                                        {format(new Date(reg.finished), "PPP", {
                                          locale: es,
                                        })}
                                      </p>
                                    )}
                                    {reg.imageUrl && (
                                      <div className="mt-2">
                                        <a
                                          href={reg.imageUrl}
                                          target="_blank"
                                          rel="noopener noreferrer"
                                          className="text-blue-600 text-sm underline"
                                        >
                                          Ver comprobante
                                        </a>
                                      </div>
                                    )}
                                  </div>
                                ))}
                              </div>
                            ) : (
                              <p className="text-gray-500 text-sm">
                                No hay registraciones
                              </p>
                            )}
                          </div>

                          {/* Citas Section */}
                          <div className="border rounded-lg p-4 bg-white">
                            <h3 className="text-lg font-medium text-gray-900 mb-3">
                              Citas ({user.citas.length})
                            </h3>
                            {user.citas.length > 0 ? (
                              <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200">
                                  <thead className="bg-gray-100">
                                    <tr>
                                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Fecha
                                      </th>
                                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Título
                                      </th>
                                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Horario
                                      </th>
                                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Dirección
                                      </th>
                                    </tr>
                                  </thead>
                                  <tbody className="bg-white divide-y divide-gray-200">
                                    {user.citas.map((cita) => (
                                      <tr key={cita.id}>
                                        <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">
                                          {format(new Date(cita.fecha), "PPP", {
                                            locale: es,
                                          })}
                                        </td>
                                        <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">
                                          {cita.title || "Sin título"}
                                          {cita.descripcion && (
                                            <p className="text-xs text-gray-500">
                                              {cita.descripcion}
                                            </p>
                                          )}
                                        </td>
                                        <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">
                                          {format(new Date(cita.inicio), "p", {
                                            locale: es,
                                          })}{" "}
                                          -{" "}
                                          {format(new Date(cita.fin), "p", {
                                            locale: es,
                                          })}
                                        </td>
                                        <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">
                                          {cita.direccion}
                                        </td>
                                      </tr>
                                    ))}
                                  </tbody>
                                </table>
                              </div>
                            ) : (
                              <p className="text-gray-500 text-sm">
                                No hay citas programadas
                              </p>
                            )}
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}
                </>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
