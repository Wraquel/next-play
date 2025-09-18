import { UserType } from "@/utils/user";

const BASE_URL = "http://localhost:8000";

// POST
export const createUser = async (user: UserType): Promise<UserType> => {
  const response = await fetch(`${BASE_URL}/users`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });
  if (!response.ok) {
    console.log("Error");
  }
    return response.json();
};
// PUT
export const updateUser = async (user: UserType): Promise<UserType> => {
  const userId= user.id;
  const response = await fetch(`http://localhost:8000/users/${userId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });
  if (!response.ok) {
    console.log("Error");
  }
    return response.json();
};

// GET
export const fetchUser = async (userId:string): Promise<UserType> => {
  const response = await fetch(`${BASE_URL}/users/${userId}`);
  if (!response.ok) {
    console.log("Error");
  }
  return response.json();
}; 
export const fetchUsers = async (): Promise<UserType[]> => {
  const response = await fetch(`${BASE_URL}/users`);
  if (!response.ok) {
    console.log("Error");
  }
  return response.json();
};
