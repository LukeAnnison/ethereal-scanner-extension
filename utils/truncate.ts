const truncate = (text: string, num: number) => {
  if (text.length > num) {
    return text.substring(0, num) + "..";
  } else {
    return text;
  }

  return null;
};

export default truncate;
