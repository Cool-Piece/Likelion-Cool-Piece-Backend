export const home = (req, res, next) => {
  res.send("ok home page");
};

export const showProject = (req, res, next) => {
  res.send("project route");
};

export const showInterview = (req, res, next) => {
  res.send("interview banner Route");
};

export const showStudy = (req, res, next) => {
  res.send("Study nav banner Route");
};
