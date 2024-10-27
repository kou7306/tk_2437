"use client";

import React, { useEffect, useState } from "react";
import { User } from "@/types/User";
import ProfileCard from "@/components/profile/ProfileCard";
import Loading from "@/components/core/Loading";
import toast from "react-hot-toast";
import { getUser } from "@/utils/getUser";
import { useParams } from "next/navigation";

const MyPage: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [uuid, setUuid] = useState<string | null>(null);
  const params = useParams();
  const userUuid = params.uuid;

  useEffect(() => {
    // ユーザーデータを取得する関数
    const fetchProfile = async () => {
      if (typeof userUuid === "string") {
        try {
          const response = await getUser(userUuid);
          setUser(response);
          setUuid(userUuid);
        } catch (error) {
          console.error("Error fetching user data:", error);
          toast.error("ユーザー情報の取得に失敗しました");
        }
      }
    };

    fetchProfile();
  }, [userUuid]); // userUuidが変更されたときに再取得

  if (!user) {
    return <Loading />;
  }

  return (
    <div className="bg-white min-h-screen py-10">
      <ProfileCard user={user} isMe={false} /> {/* 編集ボタンは無効化 */}
    </div>
  );
};

export default MyPage;
