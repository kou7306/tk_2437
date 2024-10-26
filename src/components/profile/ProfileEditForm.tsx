// components/profile/ProfileEditForm.tsx

import React, { useState } from "react";
import { User } from "@/components/profile/options";

interface ProfileEditFormProps {
  user: User;
  onSave: (updatedUser: User) => void;
  onCancel: () => void;
}

const ProfileEditForm: React.FC<ProfileEditFormProps> = ({
  user,
  onSave,
  onCancel,
}) => {
  const [updatedUser, setUpdatedUser] = useState<User>({ ...user });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUpdatedUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSave(updatedUser);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md"
    >
      <h2 className="text-2xl font-semibold mb-4">プロフィールを編集</h2>
      <div className="mb-4">
        <label className="block text-gray-700">名前</label>
        <input
          type="text"
          name="name"
          value={updatedUser.name}
          onChange={handleChange}
          className="mt-1 block w-full border border-gray-300 p-2 rounded"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">性別</label>
        <input
          type="text"
          name="sex"
          value={updatedUser.sex}
          onChange={handleChange}
          className="mt-1 block w-full border border-gray-300 p-2 rounded"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">年齢</label>
        <input
          type="text"
          name="age"
          value={updatedUser.age}
          onChange={handleChange}
          className="mt-1 block w-full border border-gray-300 p-2 rounded"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">場所</label>
        <input
          type="text"
          name="place"
          value={updatedUser.place}
          onChange={handleChange}
          className="mt-1 block w-full border border-gray-300 p-2 rounded"
        />
      </div>
      <div className="flex justify-between">
        <button
          type="button"
          onClick={onCancel}
          className="bg-gray-300 text-gray-700 py-2 px-4 rounded"
        >
          キャンセル
        </button>
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded"
        >
          保存する
        </button>
      </div>
    </form>
  );
};

export default ProfileEditForm;
