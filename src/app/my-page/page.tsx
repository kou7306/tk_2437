"use client";

import React, { useEffect, useState } from "react";
import { User } from "@/components/profile/options";
import ProfileCard from "@/components/profile/ProfileCard";
import ProfileEditForm from "@/components/profile/ProfileEditForm";
import Loading from "@/components/core/Loading";
import toast from "react-hot-toast";

const MyPage: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isEditing, setIsEditing] = useState<boolean>(false);

  // Mock user data
  const mockUserData: User = {
    id: "1", // Mock ID
    name: "John Doe", // Mock name
    sex: "男性", // Mock
    age: "30歳", // Mock age
    place: "Tokyo", // Mock place
  };

  useEffect(() => {
    // Simulate fetching user data
    const fetchProfile = async () => {
      // Simulating a delay like fetching from an API
      setTimeout(() => {
        setUser(mockUserData);
      }, 1000); // 1 second delay to mimic an API call
    };
    fetchProfile();
  }, []);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = async (updatedUser: User) => {
    // Mock saving updated user data
    setUser(updatedUser);
    setIsEditing(false);
    toast.success("プロフィールを更新しました");
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
