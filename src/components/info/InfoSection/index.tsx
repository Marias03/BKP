"use client";

import { Prisma } from "@prisma/client";

export type UserWithAssosiations = Prisma.UserGetPayload<{
  include: {
    approvedState: true,
    registraciones: true,
    visas: true,
    passports: true,
  }
}>;

export default function InfoSection({user}: {user: UserWithAssosiations}) {
    return (
        <div className="space-y-8">
            {/* Basic User Info */}
            <div className="bg-white p-6 rounded-lg shadow">
                <h2 className="text-xl font-bold mb-4">Информация о пользователе</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <p className="text-gray-600">Электронная почта</p>
                        <p className="font-medium">{user.email}</p>
                    </div>
                    <div>
                        <p className="text-gray-600">Статус</p>
                        <div className="flex items-center gap-2">
                            {user.approvedState?.state === "APPROVED" ? (
                                <>
                                    <span className="font-medium text-green-600">Одобрено</span>
                                    <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                    </svg>
                                </>
                            ) : user.approvedState?.state === "REJECTED" ? (
                                <>
                                    <span className="font-medium text-red-600">Отклонено</span>
                                    <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </>
                            ) : (
                                <span className="font-medium text-gray-500">Не указано</span>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Registrations */}
            {user.registraciones.length > 0 && (
                <div className="bg-white p-6 rounded-lg shadow">
                    <h2 className="text-xl font-bold mb-4">Регистрации</h2>
                    <div className="space-y-6">
                        {user.registraciones.map((reg) => (
                            <div key={reg.id} className="border-b pb-4 last:border-b-0">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <p className="text-gray-600">Место жительства</p>
                                        <p className="font-medium">{reg.residence}</p>
                                    </div>
                                    <div>
                                        <p className="text-gray-600">Город</p>
                                        <p className="font-medium">{reg.city}</p>
                                    </div>
                                    <div>
                                        <p className="text-gray-600">Адрес</p>
                                        <p className="font-medium">{reg.adress}</p>
                                    </div>
                                    <div>
                                        <p className="text-gray-600">Номер квартиры</p>
                                        <p className="font-medium">{reg.apartamentNumber}</p>
                                    </div>
                                    <div>
                                        <p className="text-gray-600">Проверка</p>
                                        <p className="font-medium">{reg.validation}</p>
                                    </div>
                                    <div>
                                        <p className="text-gray-600">Завершено</p>
                                        <p className="font-medium">{new Date(reg.finished).toLocaleDateString()}</p>
                                    </div>
                                </div>
                                {reg.imageUrl && (
                                    <div className="mt-4">
                                        <p className="text-gray-600 mb-2">Изображение документа</p>
                                        <img 
                                            src={reg.imageUrl} 
                                            alt="Документ регистрации" 
                                            className="max-w-full h-auto max-h-60 rounded border"
                                        />
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {user.visas.length > 0 && (
                <div className="bg-white p-6 rounded-lg shadow">
                    <h2 className="text-xl font-bold mb-4">Визы</h2>
                    <div className="space-y-6">
                        {user.visas.map((visa) => (
                            <div key={visa.id} className="border-b pb-4 last:border-b-0">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <p className="text-gray-600">Имя</p>
                                        <p className="font-medium">{visa.namev}</p>
                                    </div>
                                    <div>
                                        <p className="text-gray-600">Фамилия</p>
                                        <p className="font-medium">{visa.surnamev}</p>
                                    </div>
                                    <div>
                                        <p className="text-gray-600">Номер паспорта</p>
                                        <p className="font-medium">{visa.nump}</p>
                                    </div>
                                    <div>
                                        <p className="text-gray-600">Дата выдачи</p>
                                        <p className="font-medium">{visa.emisiondate}</p>
                                    </div>
                                    <div>
                                        <p className="text-gray-600">Дата въезда</p>
                                        <p className="font-medium">{visa.entry}</p>
                                    </div>
                                    <div>
                                        <p className="text-gray-600">Действительно до</p>
                                        <p className="font-medium">{visa.until}</p>
                                    </div>
                                </div>
                                {visa.imageUrl && (
                                    <div className="mt-4">
                                        <p className="text-gray-600 mb-2">Изображение визы</p>
                                        <img 
                                            src={visa.imageUrl} 
                                            alt="Документ визы" 
                                            className="max-w-full h-auto max-h-60 rounded border"
                                        />
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Passports */}
            {user.passports.length > 0 && (
                <div className="bg-white p-6 rounded-lg shadow">
                    <h2 className="text-xl font-bold mb-4">Паспорта</h2>
                    <div className="space-y-6">
                        {user.passports.map((passport) => (
                            <div key={passport.id} className="border-b pb-4 last:border-b-0">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <p className="text-gray-600">Серия</p>
                                        <p className="font-medium">{passport.seriall}</p>
                                    </div>
                                    <div>
                                        <p className="text-gray-600">Номер паспорта</p>
                                        <p className="font-medium">{passport.numberpas}</p>
                                    </div>
                                    <div>
                                        <p className="text-gray-600">Место выдачи</p>
                                        <p className="font-medium">{passport.emisionp}</p>
                                    </div>
                                    <div>
                                        <p className="text-gray-600">Дата</p>
                                        <p className="font-medium">{passport.datepas}</p>
                                    </div>
                                </div>
                                {passport.imageUrl && (
                                    <div className="mt-4">
                                        <p className="text-gray-600 mb-2">Изображение паспорта</p>
                                        <img 
                                            src={passport.imageUrl} 
                                            alt="Документ паспорта" 
                                            className="max-w-full h-auto max-h-60 rounded border"
                                        />
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    )
}
