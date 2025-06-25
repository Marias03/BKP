import Carrusel from "@/components/carrusel";
import authenticate from "@/auth/authenticate";

async function App() {
  await authenticate();

  return (
    <>
      <div className="min-h-screen bg-blue-100 flex flex-col">
        <div className="flex-1 flex items-center justify-center p-0">
          <Carrusel />
        </div>
      </div>
    </>
  );
}

export default App;
