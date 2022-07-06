const getHashtags = (description: string) => {
    if (description != null) {
        //@ts-ignore
        return description.match(/#\w+/g).map((x: string) => x.substring(1));

    }
};

export default getHashtags;
