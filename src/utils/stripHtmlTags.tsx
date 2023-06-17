const stripHtmlTags = (str: string) => str.replace(/<[^>]*>?/gm, "");

export default stripHtmlTags;
