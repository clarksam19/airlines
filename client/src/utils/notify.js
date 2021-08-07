const notify = (name) => {
  return {
    reset: {
      type: "",
      message: "",
    },
    success: {
      add: {
        type: "success",
        message: "route successfully added!",
      },
      remove: {
        type: "success",
        message: "route successfully removed!",
      },
      signup: {
        type: "success",
        message: "signup successfull! you may now login",
      },
      login: {
        type: "success",
        message: `hello ${name}!`,
      },
      logout: {
        type: "success",
        message: "logout successfull!",
      },
    },
    error: {
      add: {
        type: "error",
        message:
          "sorry, an error occurred on our end in trying to add this route",
      },
      remove: {
        type: "error",
        message:
          "sorry, an error occurred on our end in trying to remove this route",
      },
      signup: {
        type: "error",
        message:
          "sorry, we were unable to create your account. you either left a field blank or the username you provided already exists",
      },
      login: {
        type: "error",
        message: "invalid username and/or password",
      },
    },
    deny: {
      add: {
        type: "error",
        message:
          "if you'd like to save this route, please login to your account",
      },
    },
  };
};

export default notify;
