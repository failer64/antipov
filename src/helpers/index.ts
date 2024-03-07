export const setAuthToken = (token: string): void => {
  sessionStorage.setItem("authToken", JSON.stringify(token));
};

export const deleteAuthToken = (): void => {
  sessionStorage.removeItem("authToken");
};

export function saveFavorites(id: number) {
  const store = sessionStorage.getItem("favorites");

  let arr: number[] = [];

  if (store) {
    arr = JSON.parse(store);
  }

  if (arr.includes(id)) {
    arr = arr.filter((p) => p !== id);
  } else {
    arr = [...arr, id];
  }

  sessionStorage.setItem("favorites", JSON.stringify(arr));
}
