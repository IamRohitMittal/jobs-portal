const sqlCode = {
  1452: {
    errorMessage: "Something went wrong. Please try again.",
    httpErrorCode: 409,
  },
  1216: {
    errorMessage: "Something went wrong. Please try again.",
    httpErrorCode: 409,
  },
  1406: {
    errorMessage: "",
    httpErrorCode: 400,
  }
};

export const getSqlErrorMessage = (code, errorMessage) => {
  let errorObject = sqlCode[code];
  if (errorMessage && errorObject.errorMessage === "") {
    errorObject.errorMessage = errorMessage;
  }

  return (
    errorObject || {
      errorMessage: "ERROR NOT DEFINED",
      httpErrorCode: 404,
    }
  );
};
