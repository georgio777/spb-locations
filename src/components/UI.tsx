import {LiquidBackground} from "./data-containers/LiquidBackground";
import { Sidebar } from "./data-containers/Sidebar";
import { ThemeToggle } from "./ThemeToggle";
import './UI.css';

export const UI = () => {
  return (
    <div className="ui-container">
      <LiquidBackground />
      <ThemeToggle />
      <Sidebar />
    </div>
  );
};
