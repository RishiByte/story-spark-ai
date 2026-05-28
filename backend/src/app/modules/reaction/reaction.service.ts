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

  try {
    const newReaction = await Reaction.create({
      postId: new Types.ObjectId(postId),
      userId: user._id,
      type: type,
    });

    await Post.updateOne(
      { _id: postId },
      { $inc: { likesCount: 1 }, $addToSet: { reactions: newReaction._id } }
    );

    return { message: "Reaction added", likesCount: post.likesCount + 1 };
  } catch (error: any) {
    if (error?.code !== 11000) {
      throw error;
    }

    const deletedReaction = await Reaction.findOneAndDelete({
      postId: new Types.ObjectId(postId),
      userId: user._id,
      type: type,
    });

    if (deletedReaction) {
      await Post.updateOne(
        { _id: postId },
        { $inc: { likesCount: -1 }, $pull: { reactions: deletedReaction._id } }
      );

      await Post.updateOne(
        { _id: postId, likesCount: { $lt: 0 } },
        { $set: { likesCount: 0 } }
      );
    }

    return {
      message: "Reaction removed",
      likesCount: Math.max(0, post.likesCount - 1),
    };
  }
};

export const ReactionService = {
  toggleReaction,
};
