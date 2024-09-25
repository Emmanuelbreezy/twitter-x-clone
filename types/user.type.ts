export type UserType = {
  id: number;
  name: string | null;
  username: string;
  bio: string | null;
  email: string;
  dateOfBirth: Date | null;
  emailVerified: Date | null;
  image: string | null;
  coverImage: string | null;
  profileImage: string | null;
  createdAt: Date;
  updatedAt: Date;
  followingIds: number[];
  hasNotification: boolean | null;
  isVerified: boolean;
  plan: string;
  followersCount?: number;
};
