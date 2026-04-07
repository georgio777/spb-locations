import { Sidebar } from "./sidebar/Sidebar";
import { ToolBar } from "./Tools/ToolBar";
import './UI.css';
import { OptionalMenu } from "./OptionalMenu/OptionalMenu";
import { UtilComponents } from "./UtilComponents";

export const UI = () => {
  return (
    <div className="ui-container">
      <ToolBar />
      <OptionalMenu />
      <Sidebar />
      <UtilComponents />
    </div>
  );
};
