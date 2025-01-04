import { LoaderIcon } from "lucide-react";

const Loader = () => {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <LoaderIcon className="animate-spin" />
    </div>
  );
};

export default Loader;
