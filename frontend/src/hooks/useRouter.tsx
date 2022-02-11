import { useRouter as useRouterNext } from "next/router";

type Query = {
  [key: string]: string | string[];
};

const useRouter = () => {
  if (process?.env?.STORYBOOK || process?.env?.NODE_ENV === "test") {
    return {
      push: () => {},
      pathname: "/",
      query: {} as Query,
      asPath: "/",
      back: () => {},
      prefetch: () => {},
      beforePopState: () => {},
    };
  }

  return useRouterNext();
};

export default useRouter;
