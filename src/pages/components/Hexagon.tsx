import React from 'react';

interface HexagonProps {
  children: React.ReactNode;
  color: string;
  size?: number;
  className?: string;
  onClick?: () => void;
  selected?: boolean;
}

const HEX_CLIP =
  'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)';

const Hexagon: React.FC<HexagonProps> = ({ 
  children, 
  color, 
  size = 120, 
  className = "", 
  onClick, 
  selected = false 
}) => {
  return (
    <div
      onClick={onClick}
      className={`relative cursor-pointer transition-transform hover:scale-105 ${className}`}
      style={{ width: size, height: size }}
    >
      {/* Fundo colorido */}
      <div
        className="absolute inset-0"
        style={{
          clipPath: HEX_CLIP,
          backgroundColor: color,
          opacity: selected ? 1 : 0.8,
        }}
      />

      {/* Área branca interna */}
      <div
        className={`absolute inset-2 bg-${color}`}
        style={{
          clipPath: HEX_CLIP,
        }}
      />

      {/* Conteúdo (imagem) — CLIPADO */}
      <div
        className="absolute inset-2 overflow-hidden"
        style={{
          clipPath: HEX_CLIP,
        }}
      >
        <div className="w-full h-full flex items-center justify-center">
          {children}
        </div>
      </div>

      {/* Borda — SEMPRE POR CIMA */}
      {selected && (
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            clipPath: HEX_CLIP,
            border: '4px solid',
            borderColor: color,
            boxShadow: `0 0 16px ${color}`
          }}
        />
      )}
    </div>
  );
};

export default Hexagon;