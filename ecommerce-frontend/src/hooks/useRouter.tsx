import { useRouter as useRouterNext } from "next/router";

const useRouter = () => {
  if (process?.env?.STORYBOOK || process?.env?.NODE_ENV === "test") {
    return {
      push: () => {},
      pathname: "/",
      query: {},
      asPath: "/",
      back: () => {},
      prefetch: () => {},
      beforePopState: () => {},
    };
  }

  return useRouterNext();
};

export default useRouter;
