import { useState, useEffect, useMemo } from "react";
import axios from "axios";
import { find, forEach, map } from "lodash";

import linkTruncate from "../utils/linkTruncate";
import organiseResults from "../utils/organiseResults";

import getHashtags from "../utils/getHashtags";

const UseSearch = () => {
  const [search, setSearch] = useState("");
  const [video, setVideos] = useState<any>(null);
  const [results, setResults] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [originalHashtags, setOriginalHashtags] = useState([]);

  const fetchData = async () => {
    setLoading(true);
    console.info("fetchData");
    const result = await axios.get(`/api/video?id=${search}`);
    setVideos(result.data.data);

    if (result.data.data) {
      try {
        const description = result.data.data.shareMeta.desc;
        const author = result.data.data.itemInfo.itemStruct.author.secUid;
        const song = result.data.data.itemInfo.itemStruct.music.id;
        const songTitle = result.data.data.itemInfo.itemStruct.music.title;

        let songResults = await axios.get(`/api/song?id=${song}`);

        // use song and hashtags if we have them
        if (description.match(/#\w+/g)) {
          const hashtags =
            description.match(/#\w+/g).map((x: string) => x.substring(1)) || [];
          setOriginalHashtags(hashtags);
          const hashTagResults: Array<Object> = [];
          // map through each hashtag to send an axios request for each one

          const done = Promise.all(
            hashtags.map(async (hashTag: string, index: number) => {
              const hashTagResult = await axios.get(
                `/api/hashtag?name=${hashTag}`
              );
              hashTagResults.push(hashTagResult.data.data);
            })
          ).then(() => {
            setLoading(false);

            const organisedResults = organiseResults(
              song,
              songTitle,
              songResults,
              hashtags,
              hashTagResults
            );
            setResults(organisedResults);
          });

          // else use description content and song content
        } else {
          const descriptionTags =
            description.match(/ \w+/g).map((x: string) => x.substring(1)) || [];

          const hashTagResults: Array<Object> = [];
          // map through each hashtag to send an axios request for each one

          const done = Promise.all(
            descriptionTags.map(async (hashTag: string, index: number) => {
              const hashTagResult = await axios.get(
                `/api/hashtag?name=${hashTag}`
              );
              hashTagResults.push(hashTagResult.data.data);
            })
          ).then(() => {
            setLoading(false);

            const organisedResults = organiseResults(
              song,
              songTitle,
              songResults,
              descriptionTags,
              hashTagResults
            );

            setResults(organisedResults);
          });
        }
      } catch (error) {
        setLoading(false);
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(linkTruncate(e.target.value));
  };

  return {
    video,
    search,
    loading,
    results,
    fetchData,
    handleChange,
  };
};

export default UseSearch;
