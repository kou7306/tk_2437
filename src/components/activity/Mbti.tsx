import React from "react";

// MbtiGauges コンポーネント
const MbtiGauges: React.FC = () => {
  // MBTIデータ (コンポーネント内で定義)
  const mbtiData = {
    type: "INFJ",
    role: "Counselor",
    pairs: [
      { labelA: "外交性", percentageA: 40, labelB: "内向性", percentageB: 60 },
      { labelA: "直観", percentageA: 70, labelB: "感覚", percentageB: 30 },
      { labelA: "思考", percentageA: 50, labelB: "感情", percentageB: 50 },
      { labelA: "判断", percentageA: 80, labelB: "認識", percentageB: 20 },
    ],
  };

  return (
    <div className="p-6 bg-white shadow-md rounded-lg w-full">
      {/* MBTIタイプと役職表示 */}
      <div className="text-center mb-4">
        <h2 className="text-2xl font-semibold">{mbtiData.type}</h2>
        <p className="text-gray-500">{mbtiData.role}</p>
      </div>

      {/* 各相反する要素のゲージ表示 */}
      <div className="flex flex-col space-y-4">
        {mbtiData.pairs.map((pair, index) => (
          <div key={index} className="w-full flex items-center">
            {/* 左側のラベルとパーセント表示 */}
            <div className="flex items-center justify-between w-1/4">
              <span className="text-sm text-gray-700">{pair.labelA}</span>
              <span className="text-sm text-gray-700">{pair.percentageA}%</span>
            </div>

            {/* ゲージ */}
            <div className="relative bg-gray-200 rounded-full h-4 w-1/2 mx-2">
              {/* 外交性などの左側の割合 */}
              <div
                className="absolute left-0 top-0 h-4 bg-blue-500 rounded-l-full"
                style={{ width: `${pair.percentageA}%` }}
              />
              {/* 内向性などの右側の割合 */}
              <div
                className="absolute right-0 top-0 h-4 bg-green-500 rounded-r-full"
                style={{ width: `${pair.percentageB}%` }}
              />
            </div>

            {/* 右側のラベルとパーセント表示 */}
            <div className="flex items-center justify-between w-1/4">
              <span className="text-sm text-gray-700">{pair.labelB}</span>
              <span className="text-sm text-gray-700">{pair.percentageB}%</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MbtiGauges;
