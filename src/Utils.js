export const getMovieIdFromUrl = () => {
  let urlFragments = window.location.href.split("/");
  return urlFragments[urlFragments.length - 1];
};

export const limitString = (inputString, titleString) => {
  let overviewCharacterLimit = 180 - titleString.length * 2;
  let outputString = "No overview available.";
  if (inputString.length > overviewCharacterLimit) {
    for (let i = 0; i < inputString.length - overviewCharacterLimit; i++) {
      if (inputString.charAt(overviewCharacterLimit + i) === " ") {
        return inputString.substring(0, overviewCharacterLimit + i) + " ...";
      }
    }
  } else {
    outputString = inputString;
  }

  return outputString;
}

export const checkStatus = (response) => {
  if (response.ok) {
    return Promise.resolve(response);
  } else {
    return Promise.reject(new Error(response.statusText));
  }
}

export const parseJSON = (response) => {
  return response.json();
}