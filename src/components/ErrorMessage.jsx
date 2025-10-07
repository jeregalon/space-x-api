export default function ErrorMessage ({ errorMessage }) {
    return (
        <div
            className="flex flex-col mx-auto bg-red-300 justify-between w-[70vw] my-6 bg-[#fff] opacity-80 rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300 p-6"
        >
            <h1 className="text-2xl font-semibold text-red-800 mb-2 line-clamp-2">
                Error al cargar los datos
            </h1>
            <p className="text-gray-600 text-base line-clamp-3 mb-4">
                {errorMessage}
            </p>
        </div>
    )
}