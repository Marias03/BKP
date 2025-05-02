import Carrusel from "@/components/carrusel";
import { useTranslations } from "next-intl";

function App() {
  const t = useTranslations("HomePage");

  return (
    <>
      <div className="min-h-screen bg-blue-100 flex flex-col">
        <h1 className="text-5xl font-bold text-blue-500 text-center py-4">
          {t("title")}
        </h1>
        <div className="flex-1 flex items-center justify-center p-0">
          <Carrusel />
        </div>
      </div>
    </>
  );
}

export default App;
