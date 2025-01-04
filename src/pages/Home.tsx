import { getRandomColor } from "../utils/colors";

const Home = () => {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="flex flex-col items-center w-1/2 gap-5">
        <p className="text-2xl font-bold" style={{ color: getRandomColor() }}>
          🚀 Explore TanStack Query Like Never Before! 🎉
        </p>
        <p className="text-sm font-medium text-justify tracking-widest">
          This fun and interactive POC is your one-stop shop to master TanStack
          Query with React and TypeScript! Learn how to fetch, cache, and manage
          data like a pro with hands-on examples for every concept—queries,
          mutations, infinite scrolling, optimistic updates, and more! Perfect
          for beginners and seasoned devs alike, it’s packed with practical
          demos and cool features to make learning fast and fun. Dive in and
          level up your data-fetching game today! 💻⚡
        </p>
      </div>
    </div>
  );
};

export default Home;
