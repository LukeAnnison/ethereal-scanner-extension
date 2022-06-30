import { forEach } from "lodash";

const organiseResults = (
    searchTerm: string,
  songTitle: string,
  songResults: any,
  hashTags: string[],
  hashtagResults: object
) => {

  let organisedResults = [
    {
      searchTerm: searchTerm,
      name: songTitle,
      list: Object.assign({}, songResults.data.data.itemList),
      type: "song",
    },
  ];

  forEach(hashtagResults, (hashtag: any, index: any) => {
    organisedResults.push({
      searchTerm: hashTags[index],
      name: hashTags[index],
      //@ts-ignore
      list: hashtagResults[index].itemList,
      type: "hashtag",
    });
  });

  return organisedResults;
};

export default organiseResults;
