"use client";

import { UserType } from "@/lib/dal/user";
import { Button } from "@heroui/button";
import { Card, CardHeader, CardBody } from "@heroui/card";
import { Modal,ModalContent, ModalHeader, ModalBody, useDisclosure } from "@heroui/modal";
import { QRCodeCanvas } from "qrcode.react";
import { useState } from "react";
import createQRCode from "@/actions/createQRCode";
import findActiveQRCode from "@/actions/findActiveQRCode";
import { useTranslations } from "next-intl";

const UserDashboard = ({ user }: { user: UserType }) => {
  const t = useTranslations("Admin")
  const {isOpen, onOpen, onOpenChange} = useDisclosure();
  const [qrData, setQrData] = useState("");

  const handleOnOpenChange = async () => {
    const qrcode = await findActiveQRCode(user.id);

    if(!qrcode) {
      const newQRCode = await createQRCode(user.id);
      const fullUrl = `${window.location.origin}/info/${user.id}/token/${newQRCode.token}`;
      setQrData(fullUrl)
      return;
    }

    const fullUrl = `${window.location.origin}/info/${user.id}/token/${qrcode.token}`;
    setQrData(fullUrl)
    onOpen()
  }

  const handleOnQRUpdate = async () => {
    const qrcode = await createQRCode(user.id);
    setQrData(qrcode.token)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-6">
      <div className="max-w-6xl mx-auto">
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-indigo-900">{t("your verification")}</h1>      
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="shadow-lg">
            <CardHeader className="flex gap-4 bg-gradient-to-r from-indigo-500 to-purple-600 text-white p-6">
              <div>
                <h2 className="text-xl font-bold">{t("user")}</h2>
                <p className="text-indigo-100">{user.email}</p>
              </div>
            </CardHeader>
            <CardBody className="p-6">
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-500">{t("role")}</p>
                  <p className="font-medium capitalize">{user.role.toLowerCase()}</p>
                </div>
                {user.approvedState && (
                  <div>
                    <p className="text-sm text-gray-500">{t("approvalStatus")}</p>
                    <p className="font-medium capitalize">{user.approvedState.state.toLowerCase()}</p>
                    <p className="text-xs text-gray-400">
                      {t("lastUpdated")}: {new Date(user.approvedState.updatedAt).toLocaleString()}
                    </p>
                  </div>
                )}
              </div>
            </CardBody>
          </Card>

          <Card className="shadow-lg">
            <CardHeader className="flex gap-4 bg-gradient-to-r from-indigo-500 to-purple-600 text-white p-6">
              <div>
                <h2 className="text-xl font-bold">{t("qrCode")}</h2>
                <p className="text-indigo-100">{t("clickToViewQR")}</p>
              </div>
            </CardHeader>
            <CardBody className="p-6">
              <Button 
                color="primary"
                variant="shadow"
                onPress={() => handleOnOpenChange()}
                className="w-full"
              >
                {t("showQRCode")}
              </Button>

              <Modal 
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                size="md"
              >
                <ModalContent>
                  <ModalHeader className="flex justify-between items-center">
                    <h3 className="text-xl font-bold text-gray-900">{t("yourQRCode")}</h3>
                  </ModalHeader>
                  <ModalBody>
                    <div className="w-48 h-48 flex justify-center items-center mx-auto bg-white p-4 rounded-lg">
                      <QRCodeCanvas value={qrData} size={200} />
                    </div>
                    <p className="text-sm text-gray-500 text-center mt-4">
                      {t("scanQRMessage")}
                    </p>
                    <Button 
                      title={t("updateQR")}
                      color="primary"
                      onPress={() => handleOnQRUpdate()}
                    > {t("generateNewQR")} </Button>
                  </ModalBody>
                </ModalContent>
              </Modal>
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
