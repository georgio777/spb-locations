import { Sidebar } from "./data-containers/Sidebar";
import { ToolBar } from "./Tools/ToolBar";
import './UI.css';

export const UI = () => {
  return (
    <div className="ui-container">
      <ToolBar />
      <Sidebar />
    </div>
  );
};
