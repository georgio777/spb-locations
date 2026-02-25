import { ErrorBoundary } from "react-error-boundary";
import { FetchDetails } from "./FetchDetails";
import { Suspense } from "react";
import React from "react";
import { LocationsLoader } from "../loaders/Loaders";
import './SideBsrContent.css';

export const SideBarContent = React.memo(({id}: {id: string | undefined}) => {
  return (
    <div className="sidebar-content__wrapper">
      { id ? (
        <ErrorBoundary fallback={<div>Упс! Не удалось загрузить персонажей. Попробуйте позже.</div>}>
          <Suspense fallback={<LocationsLoader >Загрузка описаний ...</LocationsLoader>}>
            <FetchDetails id={id}/>
          </Suspense>
        </ErrorBoundary>
        ) : (
          <div>Выберите персонажа, чтобы увидеть детали</div>
        )
      }
    </div>
  );
});