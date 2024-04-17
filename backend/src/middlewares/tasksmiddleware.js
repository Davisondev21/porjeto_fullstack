const validateFieldTitle = (request, response, next) => {
  const { body } = request;

  if (body.title === undefined) {
    return response
      .status(400)
      .json({ mensage: 'the field "title" is required' });
  }

  if (body.title === "") {
    return response.status(400).json({ mensage: "title cannot be empty" });
  }

  next();
};

const validateFieldStatus = (request, response, next) => {
  const { body } = request;

  if (body.status === undefined) {
    return response
      .status(400)
      .json({ mensage: 'the field "status" is required' });
  }

  if (body.title === "") {
    return response.status(400).json({ mensage: "title cannot be empty" });
  }

  next();
};

module.exports = {
  validateFieldTitle,
  validateFieldStatus
};
