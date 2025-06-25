"use client";

import { UserType } from "@/lib/dal/user";
import { Button } from "@heroui/button";
import { Card, CardHeader, CardBody } from "@heroui/card";
import { signOut } from "next-auth/react";
import { useState } from "react";

const UserDashboard = ({ user }: { user: UserType }) => {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split("T")[0]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-6">
      <div className="max-w-6xl mx-auto">
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-indigo-900">User Dashboard</h1>
          <Button
            color="danger"
            variant="shadow"
            onPress={() => signOut({ callbackUrl: "/en/auth/sign-in" })}
            className="font-semibold"
          >
            Sign out
          </Button>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="shadow-lg">
            <CardHeader className="flex gap-4 bg-gradient-to-r from-indigo-500 to-purple-600 text-white p-6">
              <div>
                <h2 className="text-xl font-bold">User</h2>
                <p className="text-indigo-100">{user.email}</p>
              </div>
            </CardHeader>
            <CardBody className="p-6">
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-500">Role</p>
                  <p className="font-medium capitalize">{user.role.toLowerCase()}</p>
                </div>
                {user.approvedState && (
                  <div>
                    <p className="text-sm text-gray-500">Approval Status</p>
                    <p className="font-medium capitalize">{user.approvedState.state.toLowerCase()}</p>
                    <p className="text-xs text-gray-400">
                      Last updated: {new Date(user.approvedState.updatedAt).toLocaleString()}
                    </p>
                  </div>
                )}
              </div>
            </CardBody>
          </Card>

        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
