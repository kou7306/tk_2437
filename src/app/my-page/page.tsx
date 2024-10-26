"use client";

import React, { useEffect, useState } from "react";
import { User } from "@/types/User";
import ProfileCard from "@/components/profile/ProfileCard";
import ProfileEditForm from "@/components/profile/ProfileEditForm";
import Loading from "@/components/core/Loading";
import toast from "react-hot-toast";
import { getUser } from "@/utils/getUser";
import { updateUser } from "@/utils/updateUser";
import { getUuidFromCookie } from "@/actions/users";

const MyPage: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [uuid, setUuid] = useState<string | null>(null);

  useEffect(() => {
    // ユーザーデータを取得する関数
    const fetchProfile = async () => {
      const userId = await getUuidFromCookie();
      if (userId) {
        try {
          setUuid(userId);
          const response = await getUser(userId);
          setUser(response);
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      }
    };

    fetchProfile();
  }, []);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = async (updatedUser: User) => {
    try {
      await updateUser(updatedUser); // ユーザー情報を更新
      setUser(updatedUser);
      setIsEditing(false);
      toast.success("プロフィールを更新しました");
    } catch (error) {
      console.error("Error updating user data:", error);
      toast.error("プロフィールの更新に失敗しました");
    }
  };

  if (!user) {
    return <Loading />;
  }

  return (
    <div className="bg-white min-h-screen py-10">
      {isEditing ? (
        <ProfileEditForm
          user={user}
          onSave={handleSave}
          onCancel={() => setIsEditing(false)}
        />
      ) : (
        <ProfileCard user={user} isMe={true} onEdit={handleEdit} />
      )}
    </div>
  );
};

export default MyPage;
