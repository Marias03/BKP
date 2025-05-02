import Carrusel from "@/components/carrusel";

function App() {
  return (
    <>
      <div className="min-h-screen bg-blue-100 flex flex-col">
        <h1 className="text-5xl font-bold text-blue-500 text-center py-4">
          Bienvenidos
        </h1>
        <div className="flex-1 flex items-center justify-center p-0">
          <Carrusel />
        </div>
      </div>
    </>
  );
}

export default App;
