import ApiError from "../../../errors/api_error";
import { ITokenPayload } from "../../../interfaces/token";
import { User } from "../user/user.model";
import httpStatus from "http-status";
import { Reaction } from "./reaction.model";
import { Types } from "mongoose";
import { Post } from "../post/post.model";

const toggleReaction = async (
  postId: string,
  type: string = "like",
  token: ITokenPayload
) => {
  const { email } = token;
  const user = await User.findOne({ email });
  if (!user) {
    throw new ApiError(httpStatus.BAD_REQUEST, "User not found!");
  }
  const post = await Post.findOne({ _id: postId, isDeleted: { $ne: true } });
  if (!post) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Post not found!");
  }

  const existingReaction = await Reaction.findOne({
    postId: new Types.ObjectId(postId),
    userId: user._id,
    type,
  });

  if (existingReaction) {
    await Reaction.deleteOne({ _id: existingReaction._id });
    await Post.updateOne({ _id: postId }, { $pull: { reactions: existingReaction._id } });
    return { message: "Reaction removed", reacted: false };
  } else {
    const newReaction = await Reaction.create({
      postId: new Types.ObjectId(postId),
      userId: user._id,
      type,
    });
    await Post.updateOne({ _id: postId }, { $addToSet: { reactions: newReaction._id } });
    return { message: "Reaction added", reacted: true };
  }
};

export const ReactionService = {
  toggleReaction,
};
