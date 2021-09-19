import * as React from "react";

import * as apiClient from "./apiClient";

const Focus = () => {
  const [state, setState] = React.useState([]);

  const getState = () => apiClient.getJoined().then(setState);
  React.useEffect(() => {
    getState();
  }, []);

  // i feel dirty
  let names = [];
  state.map((creature) => names.push(creature.nickname));
  names = [...new Set(names)];
  console.log(` joined shit: ${state}`);
  const SpecimenTable = ({ specimen }) => {
    return (
      <table>
        <thead>
          <tr>
            <th>Nickname</th>
            <th>Species</th>
            <th>Location</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{specimen.nickname}</td>
            <td>{specimen.species}</td>
            <td>{specimen.recent_sightings}</td>
          </tr>
        </tbody>
      </table>
    );
  };
  const FocusSection = () => {
    return (
      <>
        <ul>
          {state.map((specimen) => (
            <li key={specimen.id}>
              <img alt={specimen.name} src={specimen.url} />
              <SpecimenTable key={specimen.id} specimen={specimen} />
            </li>
          ))}
        </ul>
      </>
    );
  };

  return (
    <>
      <FocusSection />
    </>
  );
};

export default Focus;
