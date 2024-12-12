import { FaPlus, FaRegPenToSquare, FaRegTrashCan } from "react-icons/fa6";
import Button from "./Button";
import { useState } from "react";
import Spinner from "./Spinner";
import ErrorMessage from "./ErrorMessage";
import { useAllCategories } from "../hooks/categories/useAllCategories";
import { useDeleteCategory } from "../hooks/categories/useDeleteCategory";
import CategoryModal from "./modals/CategoryModal";

const CategoryTable = () => {
  const { deleteMutation } = useDeleteCategory();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const { categories, error, isLoading } = useAllCategories();

  if (error) return <ErrorMessage message={error.message} />;
  if (!categories?.length && !isLoading)
    return <ErrorMessage message={"No Category Found"} />;

  return (
    <div>
      {isLoading ? (
        <Spinner />
      ) : (
        <div className="shadow overflow-x-auto rounded-lg">
          <table className="min-w-full text-sm text-secondary-text">
            <thead className="bg-secondary-background text-xs uppercase font-medium text-primary-text">
              <tr>
                <th></th>
                <th className="px-6 py-3 text-left tracking-wider whitespace-nowrap">
                  Category Name
                </th>

                <th className="px-6 py-3 text-left tracking-wider whitespace-nowrap flex items-center gap-3">
                  Actions
                  <Button
                    className="text-sm py-2 px-2"
                    onClick={() => {
                      setSelectedCategory(null);
                      setModalIsOpen(true);
                    }}
                  >
                    <FaPlus />
                  </Button>
                </th>
              </tr>
            </thead>
            <tbody className="bg-primary-background">
              {categories?.map((cat: any, index: number) => (
                <tr
                  key={cat._id}
                  className={`${
                    index % 2 === 0
                      ? "bg-secondary-background bg-opacity-20"
                      : ""
                  }`}
                >
                  <td className="pl-4">{index + 1}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{cat.name}</td>

                  <td className="px-6 py-4 whitespace-nowrap flex gap-2 items-center">
                    <Button
                      className="text-sm py-2 px-2"
                      onClick={() => {
                        setSelectedCategory(cat);
                        setModalIsOpen(true);
                      }}
                    >
                      <FaRegPenToSquare />
                    </Button>
                    <Button
                      className="text-sm py-2 px-2"
                      onClick={() => deleteMutation(cat._id)}
                    >
                      <FaRegTrashCan />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <CategoryModal
            modalIsOpen={modalIsOpen}
            setModalIsOpen={setModalIsOpen}
            category={selectedCategory}
          />
        </div>
      )}
    </div>
  );
};

export default CategoryTable;
