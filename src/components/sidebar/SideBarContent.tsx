import { ErrorBoundary } from "react-error-boundary";
import { FetchDetails } from "./FetchDetails";
import { Suspense } from "react";
import React from "react";
import { LocationsLoader } from "../loaders/Loaders";
import './SideBarContent.css';
import { SideBarHeader } from "./SideBarHeader";
import { Divider } from "./Divider";
import { CharactersList } from "./CharactersList";

export const SideBarContent = React.memo(({id}: {id: string | undefined}) => {
  return (
    <div className="sidebar-content__wrapper">
      <SideBarHeader />
      <Divider />
      { id ? (
        <ErrorBoundary fallback={<div>Упс! Не удалось загрузить детали. Попробуйте позже.</div>}>
          <Suspense fallback={<LocationsLoader >Загрузка описаний ...</LocationsLoader>}>
            <FetchDetails id={id}/>
          </Suspense>
        </ErrorBoundary>
        ) : (
          <CharactersList />
        )
      }
    </div>
  );
});