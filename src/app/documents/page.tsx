"use client";

import Datos from "@/components/formularios/Datosform";
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
        <TabPanel></TabPanel>
        <TabPanel>Content for Tab 3</TabPanel>
        <TabPanel>Content for Tab 4</TabPanel>
        <TabPanel>Content for Tab 5</TabPanel>
        <TabPanel>Content for Tab 6</TabPanel>
      </Tabs>
    </>
  );
}
