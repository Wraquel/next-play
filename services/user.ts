import { UserType } from "@/utils/user";

const BASE_URL = "http://localhost:8000";

// POST
export const createUser = async (user: UserType): Promise<UserType> => {
  await new Promise(resolve => setTimeout(resolve, 1000))
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

// GET
export const fetchUsers = async (): Promise<UserType[]> => {
  const response = await fetch(`${BASE_URL}/users`);
  if (!response.ok) {
    console.log("Error");
  }

  return response.json();
};
