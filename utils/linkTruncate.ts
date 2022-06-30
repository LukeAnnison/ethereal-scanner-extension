const linkTruncate = (link: string) => {
  const searchTerm = "video/";
  const indexOfFirst = link.indexOf(searchTerm);

  return  link.slice(indexOfFirst + 6, indexOfFirst + 25)
};

export default linkTruncate;
