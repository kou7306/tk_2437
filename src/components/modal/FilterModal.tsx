// components/FilterModal.tsx
import React, { useState } from "react";
import Modal from "react-modal";
import tagOptions, { TagOption } from "@/components/tagOptions";

interface FilterModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  onSearch: (location: string, tags: TagOption[]) => void; // タグも受け取るように更新
}

const FilterModal: React.FC<FilterModalProps> = ({
  isOpen,
  onRequestClose,
  onSearch,
}) => {
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedTags, setSelectedTags] = useState<TagOption[]>([]); // 選択されたタグを管理

  const locations = ["Tokyo", "Osaka", "Kyoto", "Hokkaido"]; // 場所の候補

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault(); // フォームのデフォルトの動作を防止
    onSearch(selectedLocation, selectedTags); // 選択された場所とタグを親コンポーネントに渡す
    onRequestClose(); // モーダルを閉じる
  };

  const handleTagChange = (tag: TagOption) => {
    setSelectedTags((prev) => {
      // タグが選択されたら、既に選択されているかを確認し、追加または削除する
      if (prev.includes(tag)) {
        return prev.filter((t) => t !== tag);
      }
      return [...prev, tag];
    });
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={onRequestClose}>
      <h2>場所とタグを選択</h2>
      <form onSubmit={handleSearch}>
        <label>
          場所:
          <select
            value={selectedLocation}
            onChange={(e) => setSelectedLocation(e.target.value)}
          >
            <option value="">選択してください</option>
            {locations.map((location) => (
              <option key={location} value={location}>
                {location}
              </option>
            ))}
          </select>
        </label>
        <label>
          タグ:
          <div>
            {tagOptions.map((tag) => (
              <label key={tag}>
                <input
                  type="checkbox"
                  checked={selectedTags.includes(tag)}
                  onChange={() => handleTagChange(tag)} // タグの選択を管理
                />
                {tag}
              </label>
            ))}
          </div>
        </label>
        <button type="submit">検索</button>
      </form>
      <button onClick={onRequestClose}>キャンセル</button>
    </Modal>
  );
};

export default FilterModal;
