import { model, Schema, Model, Document } from 'mongoose';

export type Token = {
  id_token: string;
  access_token: string;
  refresh_token: string;
};

export interface UserType {
  _id: string;
  stitcherID: string;
  token?: Token;
  isPremium?: boolean;
}

const schema = new Schema(
  {
    stitcherID: { type: String, sparse: true, unique: true, index: true },
    token: {
      id_token: String,
      access_token: String,
      refresh_token: String
    },
    isPremium: Boolean
  },
  {
    timestamps: true
  }
);

let User: Model<UserType & Document>;
try {
  User = model('User');
} catch (error: any) {
  User = model('User', schema);
}

export default User;
