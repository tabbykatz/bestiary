import * as React from "react";

import * as apiClient from "./apiClient";

const Focus = () => {
  const [specimenInfo, setSpecimenInfo] = React.useState([]);

  const getSpecimenInfo = () => apiClient.getJoined().then(setSpecimenInfo);
  React.useEffect(() => {
    getSpecimenInfo();
  }, []);

  const SpecimenTable = ({ specimen }) => {
    return (
      <table>
        <thead>
          <tr>
            <th>Nickname</th>
            <th>Species</th>
            <th>Most Recent Location</th>
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
          {specimenInfo.map((specimen) => (
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
