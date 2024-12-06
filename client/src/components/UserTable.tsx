import React, { useState } from "react";
import { FaPlus, FaRegPenToSquare, FaRegTrashCan } from "react-icons/fa6";
import { useUsers } from "../hooks/users/useUsers";
import { useDeleteUser } from "../hooks/users/useDeleteUser";
import Button from "./Button";
import UserModal from "./modals/UserModal";
import { UserTypes } from "../constants/types";
import Spinner from "./Spinner";
import ErrorMessage from "./ErrorMessage";

const getRoleBadgeColor = (role: string) => {
  switch (role) {
    case "admin":
      return "bg-primary-orange text-white";
    case "user":
      return "bg-primary-green text-white";
    default:
      return "bg-secondary-grey text-white";
  }
};

const UserTable: React.FC = () => {
  const { users, error, isLoading } = useUsers();
  const { deleteUser } = useDeleteUser();
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  const [selectedUser, setSelectedUser] = useState<UserTypes | null>(null);

  if (isLoading) return <Spinner />;
  if (error) return <ErrorMessage message={error.message} />;
  if (!users.length) return <ErrorMessage message={"No Users Found"} />;

  return (
    <div className="shadow overflow-x-auto rounded-lg">
      <table className="min-w-full text-sm text-secondary-text">
        <thead className="bg-secondary-background text-xs uppercase font-medium text-primary-text">
          <tr>
            <th></th>
            <th
              scope="col"
              className="px-6 py-3 text-left tracking-wider whitespace-nowrap"
            >
              Name
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left tracking-wider whitespace-nowrap"
            >
              Email
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left tracking-wider whitespace-nowrap"
            >
              Role
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left tracking-wider whitespace-nowrap"
            >
              Phone
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left tracking-wider whitespace-nowrap"
            >
              Address
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left tracking-wider whitespace-nowrap flex items-center gap-3"
            >
              Actions
              <Button
                className="text-sm py-2 px-2"
                onClick={() => {
                  setSelectedUser(null);
                  setModalIsOpen(true);
                }}
              >
                <FaPlus />
              </Button>
            </th>
          </tr>
        </thead>
        <tbody className="bg-primary-background">
          {users.map((user: UserTypes, index: number) => (
            <tr
              key={user._id}
              className={`${
                index % 2 === 0 ? "bg-secondary-background bg-opacity-20" : ""
              }`}
            >
              <td className="pl-4">{index + 1}</td>
              <td className="px-6 py-4 whitespace-nowrap">{user.name}</td>
              <td className="px-6 py-4 whitespace-nowrap">{user.email}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span
                  className={`px-2 py-1 rounded-full text-xs font-medium uppercase ${getRoleBadgeColor(
                    user.role || "user"
                  )}`}
                >
                  {user.role}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {user.phone || "N/A"}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {user.address || "N/A"}
              </td>
              <td className="px-6 py-4 whitespace-nowrap flex gap-2 items-center">
                <Button
                  className="text-sm py-2 px-2"
                  onClick={() => {
                    setSelectedUser(user);
                    setModalIsOpen(true);
                  }}
                >
                  <FaRegPenToSquare />
                </Button>
                <Button
                  className="text-sm py-2 px-2"
                  onClick={() => deleteUser(user._id)}
                >
                  <FaRegTrashCan />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <UserModal
        modalIsOpen={modalIsOpen}
        setModalIsOpen={setModalIsOpen}
        user={selectedUser}
      />
    </div>
  );
};

export default UserTable;
