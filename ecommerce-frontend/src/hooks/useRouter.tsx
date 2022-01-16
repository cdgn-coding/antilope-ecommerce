import { useRouter as useRouterNext } from "next/router";

const useRouter = () => {
  if (process?.env?.STORYBOOK) {
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
