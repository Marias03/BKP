"use client";
import { Tabs, TabList, Tab, TabPanel } from "react-tabs";
export default function necesarios() {
  return (
    <>
      <Tabs>
        <TabList>
          <Tab>Visa</Tab>
          <Tab>Registracion</Tab>
          <Tab>certificado medico estatal</Tab>
          <Tab>Pasaporte</Tab>
          <Tab>huellas dactilares </Tab>
        </TabList>
        <TabPanel>1</TabPanel>
        <TabPanel>2</TabPanel>
        <TabPanel>Content for Tab 3</TabPanel>
        <TabPanel>Content for Tab 4</TabPanel>
        <TabPanel>Content for Tab 5</TabPanel>
      </Tabs>
    </>
  );
}
