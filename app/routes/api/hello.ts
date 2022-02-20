import { json, LoaderFunction } from "remix";

export const loader: LoaderFunction = async () => {
  const data = {
    commit: { message: "HELLO ELLIOT" },
  };
  return json(data);
};
