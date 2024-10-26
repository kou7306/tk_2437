import React, { useState } from "react";
import { User } from "@/types/User";

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

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
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
        <select
          name="sex"
          value={updatedUser.sex?.toString() || ""}
          onChange={handleChange}
          className="mt-1 block w-full border border-gray-300 p-2 rounded"
        >
          <option value="">性別を選択</option>
          <option value="0">男性</option>
          <option value="1">女性</option>
        </select>
      </div>

      <div className="mb-4">
        <label className="block text-gray-700">年齢</label>
        <select
          name="age"
          value={updatedUser.age?.toString() || ""}
          onChange={handleChange}
          className="mt-1 block w-full border border-gray-300 p-2 rounded"
        >
          <option value="">年齢を選択</option>
          {Array.from({ length: 100 }, (_, i) => (
            <option key={i} value={i + 1}>
              {i + 1}歳
            </option>
          ))}
        </select>
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

      <div className="mb-4">
        <label className="block text-gray-700">メッセージ</label>
        <textarea
          name="message"
          value={updatedUser.message}
          onChange={handleChange}
          className="mt-1 block w-full border border-gray-300 p-2 rounded"
          rows={4} // 行数を指定
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
