import { Link } from "react-router-dom";

export default function ChooseSonod() {
  const sonodTypes = [
    { name: "নাগরিক সনদ", path: "/choose-sonod/nagorikSonod" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-green-100 flex flex-col items-center py-10 px-4">
      <h1 className="text-2xl md:text-3xl font-bold text-green-800 mb-6">
        সনদ নির্বাচন করুন
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full max-w-4xl">
        {sonodTypes.map((sonod, index) => (
          <Link
            key={index}
            to={sonod.path}
            className="bg-white shadow-md hover:shadow-xl p-6 rounded-2xl text-center 
                       border border-green-200 hover:border-green-400 transition-all cursor-pointer"
          >
            <p className="text-lg font-semibold text-green-700">{sonod.name}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
