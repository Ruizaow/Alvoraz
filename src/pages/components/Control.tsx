import React from 'react';

const Control: React.FC<{ 
  value: number;
  icon: string;
  label?: string;
  border: string;
  onChange: (newValue: number) => void;
  min?: number;
  max?: number;
}> = ({ value, icon, label, border, onChange, min = 0, max = 12 }) => {

  const handleDec = () => {
    if (value <= min) {
      onChange(max);
    } else {
      onChange(value - 1);
    }
  };
  const handleInc = () => {
    if (value >= max) {
      onChange(min);
    } else {
      onChange(value + 1);
    }
  };

  return (
    <div className="flex flex-col items-center gap-1">
      <div className="flex items-start gap-2">
        <div className="flex flex-col items-center gap-1">
          <div
            className={`w-24 h-24 bg-[#F7F1DE] bg-white border-2 rounded-full`}
            style={{ borderColor: border }}
          >
            <img
              src={icon}
              alt="Icon"
              className="flex justify-center items-center w-full h-full object-contain"/>
          </div>
          {label && <span className="text-[#1E1E1E] text-sm font-bold uppercase opacity-60">{label}</span>}
        </div>
        <div className="flex items-center rounded-full pt-6">
          <button onClick={handleDec} className="text-[#1E1E1E] flex items-center justify-center font-bold text-3xl hover:text-[#4A4A4A] transition-colors">◀</button>
          <span
            className="font-enriqueta w-14 text-4xl text-center text-[#1E1E1E] mb-1"
            style={{
              transform: value === 6 || value === 8 ? 'translateY(0.5rem)' : 'none',
            }}
          >
            {value}
          </span>
          <button onClick={handleInc} className="text-[#1E1E1E] flex items-center justify-center font-bold text-3xl hover:text-[#4A4A4A] transition-colors">▶</button>
        </div>
      </div>
    </div>
  )
};

export default Control;