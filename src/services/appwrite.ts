import { Account, Client, ID, Query, TablesDB } from "appwrite";

const DB_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID;

export const client: Client = new Client();

client
  .setEndpoint(import.meta.env.VITE_APPWRITE_ENDPOINT)
  .setProject(import.meta.env.VITE_APPWRITE_PROJECT_ID);

const account = new Account(client);
const tablesDB = new TablesDB(client);

export { ID } from "appwrite";

export async function getAllRecipes() {
  const document = await tablesDB.listRows({
    databaseId: DB_ID,
    tableId: "recipe",
    queries: [
      Query.select([
        "*",
        "categories.label",
        "categories.value",
        "categories.group.label",
        "categories.group.value",
        "feedbacks.*",
      ]),
    ],
  });
  if (document.total === 0) {
    console.log("No recipes found");
    return [];
  }
  console.log("document: ", document.rows);
  const recipes = document.rows.map((item) => ({
    id: item.$id,
    name: item.name,
    description: item.description,
    image: item.imageUrl,
    previewImage: item.previewImageUrl,
    rating: item.feedbacks
      ? item.feedbacks.reduce((acc: any, feedback: any) => acc + feedback.rating, 0) /
        item.feedbacks.length
      : 0,
    reviews: item.feedbacks ? item.feedbacks.length : 200,
    prepTime: item.prepTime,
    cookTime: item.cookTime,
    calories: item.calories,
    protein: item.protein,
    isHighProtein: item.isHighProtein,
    timeOfDay: item.timeOfDay,
    servingSuggestions: item.servingSuggestions,
    tipsAndTricks: item.tipsAndTricks,
    categories: [
      ...item.categories?.map((item: any) => ({
        label: item.label,
        value: item.value,
        id: item.$id,
      })),
    ],
    group: [
      ...item.categories?.map((item: any) => ({
        label: item.group.label,
        value: item.group.value,
        id: item.group.$id,
      })),
    ],
    nutritionClassification: JSON.parse(item.nutritionClassification),
    ...JSON.parse(item.body),
  }));

  //   console.log("Fetched recipes: ", document.rows[0], recipes);
  if (recipes.length === 0) {
    console.log("No recipes found");
    return [];
  }

  return recipes;
}

export async function getRecipeById(id: string) {
  if (!id) {
    throw new Error("id is required");
  }

  const document = await tablesDB.getRow({
    databaseId: DB_ID,
    tableId: "recipe",
    rowId: id,
    queries: [Query.select(["*", "categories.label", "categories.value"])],
  });

  if (!document.$id) {
    throw new Error("Recipe not found");
  }
  console.log("getRecipeById: ", document)
  const recipe = {
    id: document.$id,
    name: document.name,
    description: document.description,
    image: document.imageUrl,
    previewImage: document.previewImageUrl,
    rating: document.feedbacks
      ? document.feedbacks.reduce((acc: any, feedback: any) => acc + feedback.rating, 0) /
        document.feedbacks.length
      : 0,
    reviews: document.feedbacks ? document.feedbacks.length : 200,
    prepTime: document.prepTime,
    cookTime: document.cookTime,
    calories: document.calories,
    protein: document.protein,
    isHighProtein: document.isHighProtein,
    timeOfDay: document.timeOfDay,
    categories: [
      ...document.categories?.map((item: any) => ({
        label: item.label,
        value: item.value,
        id: item.$id,
      })),
    ],
    servingSuggestions: document.servingSuggestions,
    tipsAndTricks: document.tipsAndTricks,
    nutritionClassification: JSON.parse(document.nutritionClassification),
    ...JSON.parse(document.body),
  };

  return recipe;
}

export async function createUser({ name, email, password }: { name: string, email: string, password: string}) {
  if (!name || !email || !password) {
    throw new Error("name, email, and password are required");
  }

  const user = account.create({
    email,
    password,
    name,
    userId: ID.unique(),
  });

  if (!user) {
    throw new Error("Failed to create user");
  }

  return user;
}

export async function loginUser({ email, password }: { email: string, password: string }) {
  if (!email || !password) {
    throw new Error("email and password are required");
  }

  const session = await account.createEmailPasswordSession({ email, password });

  if (!session.$id) {
    throw new Error("Failed to create session");
  }

  return session;
}

export async function logoutUser({ sessionId, all=false }: {sessionId: string; all: boolean}) {
  if (all) {
    await account.deleteSessions()
  }
  account.deleteSession({ sessionId })
}

export async function getCurrentUser() {
  const user = await account.get();

  if (!user.$id) {
    throw new Error("No user logged in");
  }

  return user;
}

export async function getCategoryGroup() {
  const groups = await tablesDB.listRows({
    databaseId: DB_ID,
    tableId: "groups",
    queries: [Query.select(["*", "categories.label", "categories.value"])],
  });
  console.log("getCategoriesGroup: ", groups);
  if (groups.total > 0) {
    return groups.rows.map((item) => ({
      id: item.$id,
      label: item.label,
      value: item.value,
      categories: item.categories
        ? item.categories?.map((cat: any) => ({
            id: cat.$id,
            label: cat.label,
            value: cat.value,
          }))
        : [],
    }));
  }

  return [];
}
