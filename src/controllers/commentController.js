import Comment from "../models/Comment";
import Study from "../models/Study";

export const sendComment = async (req, res, next) => {
  const studyId = req.params.id;
  //studyId가 안온다면 요청할때, parms로 id가 안오는거니 아래 콘솔 확인해주세요
  //console.log(req.params,"parameter")
  //console.log(studyId,"sutdy ID")
  const authorization = req.get("Authorization");

  try {
    const accessToken = parseToken(authorization);
    const decoded = jwt.verify(accessToken, secretKey);
    const { userId } = decoded;

    await Comment.create({
      creator: userId,
      content: req.body.content,
    });

    await Study.findByIdAndUpdate(studyId, {
      $push: { comments: userId },
    });

    const comments = await Study.findById(studyId).populate("comments");

    return res
      .status(201)
      .json({ message: "success to add comment", comments });
  } catch (error) {
    console.log(error, "error");
    return res.json({ message: "mongoose Error" });
  }
};
