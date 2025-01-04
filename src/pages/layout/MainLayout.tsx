import { Outlet, useLocation } from "react-router-dom";
import { sidebarTabs } from "../../routes";
import classNames from "classnames";
import { useNavigate } from "react-router";

const MainLayout = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const handleNavigate = (path: string) => {
    navigate(`/${path}`);
  };

  return (
    <div className="w-screen h-screen flex">
      <div className="w-1/6 flex flex-col items-center pt-10 gap-10">
        <p className="text-2xl font-bold">TanStack POC</p>
        <div className="flex flex-col gap-5 w-full p-2 overflow-auto">
          {sidebarTabs.map((tab) => {
            console.log(tab.name, tab.color);
            return (
              <button
                onClick={() => handleNavigate(tab.path)}
                className={classNames(
                  `bg-[#222] py-4 px-8 rounded-full hover:opacity-80 font-medium text-lg duration-300`,
                  { "bg-opacity-50 text-[#333] ": pathname.includes(tab.path) }
                )}
                style={{
                  backgroundColor: pathname.includes(tab.path)
                    ? tab.color
                    : "#222",
                }}
              >
                {tab.name}
              </button>
            );
          })}
        </div>
      </div>
      <div className="flex-1 p-6">
        <Outlet />
      </div>
    </div>
  );
};

export default MainLayout;
