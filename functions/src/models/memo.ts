import mongoose from "mongoose";
import {UserDoc} from "./user";

interface MemoAttrs {
  title: string;
  content: string;
  user: UserDoc;
}
interface MemoModel extends mongoose.Model<MemoDoc> {
  build(attrs: MemoAttrs): MemoDoc;
}
interface MemoDoc extends mongoose.Document {
  title: string;
  content: string;
  isDeleted: boolean;
  user: UserDoc;
}

const memoSchema = new mongoose.Schema(
    {
      title: {
        type: String,
        required: true,
      },
      content: {
        type: String,
        required: true,
      },
      isDeleted: {
        type: Boolean,
        default: false,
      },
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
      },
    },
    {
      toJSON: {
        transform(doc, ret) {
          ret.id = ret._id;
          delete ret._id;
          delete ret.__v;
        },
      },
      timestamps: true,
    }
);

memoSchema.pre("save", async function() {});

memoSchema.statics.build = (attrs: MemoAttrs) => {
  return new Memo(attrs);
};

const Memo = mongoose.model<MemoDoc, MemoModel>("Memo", memoSchema);

export {Memo};
