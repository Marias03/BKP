"use client";

import { ReactNode } from "react";
import Link from "next/link";
import { Button } from "@heroui/button";
import { signOut } from "next-auth/react";
import { Bell, User, Calendar } from "lucide-react";

interface AdminLayoutProps {
  children: ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const navItems = [
    {
      href: "/admin/appointments",
      icon: <Calendar className="w-5 h-5" />,
      label: "Записи",
    },
    {
      href: "/admin/users",
      icon: <User className="w-5 h-5" />,
      label: "Пользователи",
    },
  ];

  return (
    <div className="flex h-screen bg-gray-50">
      <div className="hidden md:flex md:w-64 md:flex-col">
        <div className="flex flex-col h-0 flex-1 border-r border-gray-200 bg-white">
          <div className="p-4 border-b border-gray-200">
            <h1 className="text-xl font-bold text-gray-800">Панель администратора</h1>
          </div>
          <nav className="flex-1 px-2 py-4 space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 rounded-md hover:bg-gray-100 group"
              >
                <span className="mr-3 text-gray-500 group-hover:text-gray-700">
                  {item.icon}
                </span>
                {item.label}
              </Link>
            ))}
            <Button
              color="danger"
              variant="shadow"
              onPress={() => signOut({ callbackUrl: "/en/auth/sign-in" })}
              className="font-semibold"
            >
              Выйти
            </Button>
          </nav>
        </div>
      </div>
      <div className="flex flex-col flex-1 overflow-hidden">
        <header className="bg-white shadow-sm">
          <div className="flex items-center justify-between px-4 py-3 sm:px-6">
            <h2 className="text-lg font-semibold text-gray-800">
              Обновления
            </h2>
            <div className="flex items-center space-x-4">
              <button
                type="button"
                className="p-1 text-gray-400 rounded-full hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <span className="sr-only">Уведомления</span>
                <Bell className="w-6 h-6" />
              </button>
              <div className="flex items-center">
                <img
                  className="w-8 h-8 rounded-full"
                  src="https://via.placeholder.com/40"
                  alt="Аватар пользователя"
                />
                <span className="ml-2 text-sm font-medium">Имя</span>
              </div>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-4 sm:p-6 bg-gray-50">
          {children}
        </main>
      </div>
    </div>
  );
}
