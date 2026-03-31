import { Sidebar } from "./sidebar/Sidebar";
import { SearchComponent } from "./Tools/SearchComponent";
import { ToolBar } from "./Tools/ToolBar";
import './UI.css';

export const UI = () => {
  return (
    <div className="ui-container">
      <ToolBar />
      <Sidebar />
      <SearchComponent />
    </div>
  );
};
