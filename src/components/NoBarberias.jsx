
export const NoBarberiasCard = () => {
  return (
    <div className="flex items-center justify-center w-full min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96 text-center">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">
          No hay barberías creadas
        </h2>
        <p className="text-gray-500 mb-6">
          Parece que aún no has agregado ninguna barbería. ¡Comienza creando tu primera!
        </p>
        <button className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 transition">
          Agregar Barbería
        </button>
      </div>
    </div>
  );
};