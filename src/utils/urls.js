export const API_URL = "http://192.168.18.6:1234";

/**
 * Given an image return the url
 * works for both local and deployed strapis
 * @param {any} image
 */
export const fromImageToUrl = (image, path) => {
  if (!image) {
    return "/vercel.svg";
  }
  if (image.url?.indexOf("/") === 0) {
    return `${API_URL}${path}${image.url}`;
  }
  return image.url && `${API_URL}/${path}/${image.url}`;
};

// export const fromImageToUrl = (image) => {
//   if (!image) {
//     return "/vercel.svg";
//   }
//   if (image.url?.indexOf("/") === 0) {
//     return `${API_URL}${image.url}`;
//   }

//   return image.url;
// };
