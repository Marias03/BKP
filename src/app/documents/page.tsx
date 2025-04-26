"use client";

import Datos from "@/components/formularios/Datosform";
import Registracion from "@/components/formularios/Registracionform";
import Cmedico from "@/components/formularios/Cmedicoform";
import Passport from "@/components/formularios/passport";
import FingerPrints from "@/components/formularios/fingerprintsfrom";
import Visa from "@/components/formularios/visaform";
import { Tabs, TabList, Tab, TabPanel } from "react-tabs";

export default function Documents() {
  return (
    <>
      <Tabs>
        <TabList>
          <Tab>Datos personales</Tab>
          <Tab>Registracion</Tab>
          <Tab>certificado medico estatal</Tab>
          <Tab>Pasaporte</Tab>
          <Tab>huellas dactilares </Tab>
          <Tab> Visa </Tab>
        </TabList>
        <TabPanel>
          <Datos />
        </TabPanel>
        <TabPanel>
          <Registracion />
        </TabPanel>
        <TabPanel>
          <Cmedico />
        </TabPanel>
        <TabPanel>
          <Passport />
        </TabPanel>
        <TabPanel>
          <FingerPrints />
        </TabPanel>
        <TabPanel>
          <Visa />
        </TabPanel>
      </Tabs>
    </>
  );
}
