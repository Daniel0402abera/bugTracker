// validation.js
export const validateRequired = (value) => !!value.trim();

export const validateEmail = (email) =>
  !!email.trim() &&
  email
    .toLowerCase()
    .match(
      // Regular expression for email validation
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );

export const validateUser = (user) => {
  return {
    fullName: !validateRequired(user.fullName)
      ? 'Full Name is Required'
      : '',
    email: !validateEmail(user.email) ? 'Incorrect Email Format' : '',
  };
};
