import { Sidebar } from "./sidebar/Sidebar";
import { SearchComponent } from "./search/SearchComponent";
import { ToolBar } from "./Tools/ToolBar";
import './UI.css';
import { OptionalMenu } from "./OptionalMenu/OptionalMenu";
import { FilterComponent } from "./filter/FilterComponent";

export const UI = () => {
  return (
    <div className="ui-container">
      <ToolBar />
      <OptionalMenu />
      <Sidebar />
      <SearchComponent />
      <FilterComponent />
    </div>
  );
};
