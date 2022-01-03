import Comment from "../models/Comment";
import Study from "../models/Study";

/*
댓글 달기
POST /users/comment/:id
response -> 상세페이지의 전체 댓글 반환
request body에 userId 포함해서 드리겠습니다
*/

export const sendComment = async (req, res, next) => {
  const studyId = req.params.id;

  //유저 정보 조회

  //저장 유저정보
  await Comment.create({
    creator: userId,
    content: req.body.content,
  });
};
