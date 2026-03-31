import { ErrorBoundary } from "react-error-boundary";
import { FetchDetails } from "./FetchDetails";
import { Suspense, useEffect, useRef } from "react";
import React from "react";
import { LocationsLoader } from "../loaders/Loaders";
import './SideBarContent.css';
import { SideBarHeader } from "./SideBarHeader";
import { Divider } from "./Divider";
import { NoCharacterSelected } from "./NoCharacterSelected";
import { ControlBar } from "./ControlBar";

export const SideBarContent = React.memo(({id}: {id: string | undefined}) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const targetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Сбрасываем скролл контейнера при изменении id
    if (wrapperRef.current) {
      wrapperRef.current.scrollTo(0, 0);
    }
  }, [id]);
  return (
    <div ref={wrapperRef} className="sidebar-content__wrapper">
      <SideBarHeader />
      <ControlBar wrapperRef={wrapperRef} targetRef={targetRef}/>
      <Divider ref={targetRef}/>
      { id ? (
        <ErrorBoundary fallback={<div>Упс! Не удалось загрузить детали. Попробуйте позже.</div>}>
          <Suspense fallback={<LocationsLoader >Загрузка описаний ...</LocationsLoader>}>
            <FetchDetails id={id}/>
          </Suspense>
        </ErrorBoundary>
        ) : (
          <NoCharacterSelected />
        )
      }
    </div>
  );
});