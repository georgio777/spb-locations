import { Fragment } from 'react/jsx-runtime';
import type { CharacterDescriptions } from '../../types/locations.types';
import './Details.css';
import { Divider } from './Divider';

export const Details = ({ details }: { details: CharacterDescriptions}) => {
  
  return (
    <main className="sidebar-details-container">
      { details.map((description, index) => (
        <Fragment key={description.id}> 
          <div className="sidebar-details">
            <h2 className="sidebar-details__heading">{description.heading}</h2>
            { description.info.split('\r\n').map((p, index) => (
              <p key={`paragraph-${index}`} className="sidebar-details__paragraph">{p}</p>
            ))}
            
          </div>
          { index < details.length -1 && <Divider />}
        </Fragment>
      ))}
    </main>
  );
};
