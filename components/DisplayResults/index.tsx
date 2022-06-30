import { ReactEventHandler, useEffect, useState } from "react";
import styles from "./displayResults.module.scss";
import UseSearch from "../../hooks/useSearch";
import TikTokVid from "../TikTokVid";
import Filter from "../Filter";
import map from "lodash/map";

interface Props {
  video: any;
  results: [
    {
      searchTerm: string;
      name: string;
      list: object;
    }
  ];
}

const DisplayResults = ({ results, video }: Props) => {
  const [selected, setSelected] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [type, setType] = useState<string>("");
  const [hovered, setHovered] = useState<string>("");
  const [selectedList, setSelectedList] = useState<object>({});

  const handleClick = (name: string, searchTerm: string, type: string) => {
    setSelected(name);
    setSearchTerm(searchTerm);
    setType(type);
  };

  const handleHoverEnter = (hovered: any) => {
    setHovered(hovered.id);
  };

  const handleHoverExit = () => {
    setHovered("");
  };

  // show selected list with filter
  useEffect(() => {
    if (results) {
      const selectedList = results.find((result) => result.name === selected);
      if (selectedList) {
        setSelectedList(selectedList.list);
      }
    }
  }, [selected]);

  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          maxWidth: "95%",
          flexWrap: "wrap",
        }}
      >
        {map(results, (result, index) => (
          <Filter
            key={index}
            onClick={(e: ReactEventHandler) =>
              handleClick(result.name, result.searchTerm, result.type)
            }
            selected={selected}
            result={result}
          />
        ))}
      </div>

      <div className={styles.grid}>
        {map(selectedList, (item, index) => (
          <TikTokVid
            hovered={item.id === hovered}
            setHovered={(e: ReactEventHandler) => handleHoverEnter(item)}
            setExit={(e: ReactEventHandler) => handleHoverExit()}
            video={item}
            key={index}
          />
        ))}
      </div>
    </>
  );
};
export default DisplayResults;
