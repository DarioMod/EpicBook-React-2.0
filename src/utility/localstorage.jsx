export const saveToLocalStorage = (key, data) => {
  localStorage.setItem(key, JSON.stringify(data));
};

export const getFromLocalStorage = (key) => {
  if (!key) {
    throw new Error("This key not exist");
  }
  return JSON.parse(localStorage.getItem(key));
};
