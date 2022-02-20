import { json, LoaderFunction } from "remix";

export const loader: LoaderFunction = async () => {
  const data = {
    commit: { message: "HELLO" },
  };
  return json(data);
};
