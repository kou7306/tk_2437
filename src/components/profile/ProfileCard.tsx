import React from "react";
import { User } from "@/components/profile/options";
import Image from "next/image";
import ActivityList from "../activity/ActivityList";
import MbtiGauges from "../activity/Mbti";

// ProfileCard Props
interface ProfileCardProps {
  user: User;
  isMe: boolean;
  onEdit: () => void;
}

const ProfileCard: React.FC<ProfileCardProps> = ({ user, isMe, onEdit }) => {
  return (
    <div className="p-6">
      {/* Profile Card */}
      <div className="flex overflow-hidden items-center mb-6">
        <div className="flex flex-col items-center justify-center">
          {/* User Image with Margin */}
          <Image
            className="h-auto object-cover rounded-full ml-24 mr-24"
            src="/user.svg"
            alt={user.name}
            width={200}
            height={200}
          />
          {/* Centered Name and Greeting */}
          <h2 className="text-2xl font-semibold my-4 text-center">
            {user.name}
          </h2>
          <p className="bg-gray-200 text-center px-4 py-2 rounded">
            こんにちは
          </p>
        </div>

        {/* Profile Information Section */}
        <div className="flex flex-col justify-center w-2/3 bg-white shadow-md rounded-lg p-4 min-h-64">
          {/* プロフィール情報 */}
          <p className="text-gray-700 text-center">性別: {user.sex}</p>
          <p className="text-gray-700 text-center">年齢: {user.age}</p>
          <p className="text-gray-700 text-center">場所: {user.place}</p>

          {/* 中央に配置したボタン */}
          {isMe && (
            <div className="flex justify-center mt-4">
              <button
                onClick={onEdit}
                className="w-48 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition"
              >
                編集する
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Bottom Section with Gauges and Activity List */}
      <div className="flex gap-6">
        {/* 左側: MBTI Gauge */}
        <div className="w-1/2">
          <MbtiGauges />
        </div>

        {/* 右側: Activity List */}
        <div className="w-1/2">
          <ActivityList />
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
