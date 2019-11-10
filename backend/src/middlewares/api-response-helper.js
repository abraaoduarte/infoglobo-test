export default function apiResponseHandler(req, res, next) {
  res.responseComposer = (data, success = true) => {
    res.send({
      success,
      data,
    });
  };

  next();
}
