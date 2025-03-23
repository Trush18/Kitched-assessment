export interface User {
  id: number;
  name: string;
  avatar: string;
  cuisine: string;
  recipeCount: number;
  collectionCategory: string;
}

export const usersData: User[] = [
  {
    id: 1,
    name: "Lianna Patete",
    avatar: "../../../../images/lianna.png",
    cuisine: "Mexican",
    recipeCount: 13,
    collectionCategory: "Family Dinner"
  },
  {
    id: 2,
    name: "Amber Arnold",
    avatar: "../../../../images/amber.png",
    cuisine: "Italian",
    recipeCount: 20,
    collectionCategory: "Weekend-night"
  },
  {
    id: 3,
    name: "Trusha Gajjar",
    avatar: "../../../../images/trusha.png",
    cuisine: "Asian",
    recipeCount: 18,
    collectionCategory: "Kids Special"
  },
  {
    id: 4,
    name: "Aakash Mistry",
    avatar: "../../../../images/Aakash.png",
    cuisine: "Thai",
    recipeCount: 30,
    collectionCategory: "Birthday Special"
  }
]
export const searchSuggestions:string[] = ["Italian", "Mexican", "Asian", "Thai", "Trusha Gajjar", "Aakash Mistry", "Lianna Patete", "Amber Arnold"];