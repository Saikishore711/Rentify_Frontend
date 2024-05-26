import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadProductListData } from "../redux/Action/action";

const libraries = [
  {
    name: "Vite",
    id: "vite",
  },
  {
    name: "React",
    id: "react",
  },
  {
    name: "Redux",
    id: "redux",
  },
  {
    name: "TailwindCSS",
    id: "tailwind",
  },
  {
    name: "MUI",
    id: "mui",
  },
  {
    name: "emotion",
    id: "emotion",
  },
];

export default function Hello() {
  const dispatch = useDispatch();

  const { productList } = useSelector((state) => state.data);

  useEffect(() => {
    dispatch(loadProductListData());
  }, []);

  return (
    <div className="min-h-screen min-w-screen flex justify-center items-center bg-gray-100">
      <div className="text-center">
        <div className="animate-bounce text-green-700 text-5xl font-bold mb-6">
          Hello
        </div>
        <div className="text-lg font-semibold mb-4">
          This Project setup Template includes the following. <br />
          Happy Coding!
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 px-4">
          {libraries.map((library) => (
            <div
              key={library?.id}
              className="flex flex-col items-center p-4 rounded-lg shadow-md bg-white hover:bg-gray-200 transition duration-300 ease-in-out"
            >
              <img
                src={`https://skillicons.dev/icons?i=${library.id}&size=1x`}
                srcSet={`https://skillicons.dev/icons?i=${library.id}&size=1x 1x`}
                alt={`${library.name} Logo`}
                className="w-16 h-16 mb-2"
              />
              <div className="text-gray-800">{library.name}</div>
            </div>
          ))}
        </div>
        {productList?.length > 0 && (
          <div className="mt-5 space-y-1">
            <div className="text-lg font-medium">
              This bottom list is fetched from Api -&gt; redux -&gt; here
            </div>
            <div>{JSON.stringify([...productList.map((o) => o?.title)])}</div>
          </div>
        )}
      </div>
    </div>
  );
}
