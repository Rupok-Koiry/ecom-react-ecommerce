import { FaRegTrashCan } from "react-icons/fa6";
import Button from "./Button";
import Spinner from "./Spinner";
import ErrorMessage from "./ErrorMessage";
import { useAllUsers } from "../hooks/users/useAllUsers";
import { useDeleteUser } from "../hooks/users/useDeleteUser";

const UserTable = () => {
  const { deleteUserMutation } = useDeleteUser();
  const { users, isLoading, error } = useAllUsers();

  if (error) return <ErrorMessage message={error.message} />;
  if (!users?.length && !isLoading)
    return <ErrorMessage message={"No Products Found"} />;

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
                  User Name
                </th>
                <th className="px-6 py-3 text-left tracking-wider whitespace-nowrap">
                  Email
                </th>
                <th className="px-6 py-3 text-left tracking-wider whitespace-nowrap">
                  Phone
                </th>
                <th className="px-6 py-3 text-left tracking-wider whitespace-nowrap">
                  Role
                </th>

                <th className="px-6 py-3 text-left tracking-wider whitespace-nowrap flex items-center gap-3">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-primary-background">
              {users.map((user: any, index: number) => (
                <tr
                  key={user._id}
                  className={`${
                    index % 2 === 0
                      ? "bg-secondary-background bg-opacity-20"
                      : ""
                  }`}
                >
                  <td className="pl-4">{index + 1}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{user.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{user.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{user.phone}</td>
                  <td className="px-6 py-4 whitespace-nowrap uppercase">
                    {user.role}
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap flex gap-2 items-center">
                    <Button
                      className="text-sm py-2 px-2"
                      onClick={() => deleteUserMutation(user._id)}
                    >
                      <FaRegTrashCan />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default UserTable;
