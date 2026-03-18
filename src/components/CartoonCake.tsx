const CartoonCake = () => {
  return (
    <div
      className="relative flex items-center justify-center"
      style={{
        animation: "cake-breathe 2s ease-in-out infinite",
        zIndex: 10,
        width: "clamp(180px, 40vw, 340px)",
        height: "clamp(220px, 50vw, 400px)",
      }}
    >
      <svg
        viewBox="0 0 300 380"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
        aria-label="Birthday cake"
        role="img"
      >
        {/* Plate */}
        <ellipse cx="150" cy="355" rx="140" ry="18" fill="#F8BBD0" opacity="0.5" />

        {/* Bottom tier */}
        <rect x="50" y="250" width="200" height="90" rx="20" fill="#F48FB1" />
        <rect x="50" y="250" width="200" height="30" rx="15" fill="#F8BBD0" />

        {/* Bottom tier frosting drips */}
        {[70, 100, 130, 160, 190, 220].map((x, i) => (
          <ellipse key={`drip-b-${i}`} cx={x} cy={280} rx={8} ry={12 + (i % 3) * 4} fill="#F8BBD0" />
        ))}

        {/* Bottom tier sprinkles */}
        {[
          { x: 80, y: 300, r: 15, c: "#B3E5FC" },
          { x: 120, y: 310, r: -10, c: "#FFF9C4" },
          { x: 160, y: 295, r: 25, c: "#E1BEE7" },
          { x: 200, y: 315, r: -20, c: "#B3E5FC" },
          { x: 230, y: 290, r: 5, c: "#FFF9C4" },
          { x: 100, y: 325, r: 30, c: "#E1BEE7" },
          { x: 180, y: 330, r: -5, c: "#B3E5FC" },
        ].map((s, i) => (
          <rect
            key={`sp-b-${i}`}
            x={s.x}
            y={s.y}
            width="3"
            height="10"
            rx="1.5"
            fill={s.c}
            transform={`rotate(${s.r} ${s.x + 1.5} ${s.y + 5})`}
          />
        ))}

        {/* Top tier */}
        <rect x="85" y="165" width="130" height="90" rx="18" fill="#F8BBD0" />
        <rect x="85" y="165" width="130" height="25" rx="12" fill="white" opacity="0.7" />

        {/* Top tier frosting drips */}
        {[105, 130, 155, 180].map((x, i) => (
          <ellipse key={`drip-t-${i}`} cx={x} cy={190} rx={6} ry={10 + (i % 2) * 5} fill="white" opacity="0.7" />
        ))}

        {/* Top tier sprinkles */}
        {[
          { x: 105, y: 210, r: 20, c: "#FFF9C4" },
          { x: 135, y: 220, r: -15, c: "#B3E5FC" },
          { x: 165, y: 205, r: 30, c: "#E1BEE7" },
          { x: 190, y: 225, r: -10, c: "#FFF9C4" },
        ].map((s, i) => (
          <rect
            key={`sp-t-${i}`}
            x={s.x}
            y={s.y}
            width="3"
            height="8"
            rx="1.5"
            fill={s.c}
            transform={`rotate(${s.r} ${s.x + 1.5} ${s.y + 4})`}
          />
        ))}

        {/* Candle */}
        <rect x="143" y="105" width="14" height="62" rx="5" fill="#B3E5FC" />
        {/* Candle stripes */}
        <rect x="143" y="115" width="14" height="4" rx="2" fill="white" opacity="0.5" />
        <rect x="143" y="125" width="14" height="4" rx="2" fill="white" opacity="0.5" />
        <rect x="143" y="135" width="14" height="4" rx="2" fill="white" opacity="0.5" />
        <rect x="143" y="145" width="14" height="4" rx="2" fill="white" opacity="0.5" />
        {/* Candle wick */}
        <rect x="148" y="95" width="3" height="12" rx="1.5" fill="#880E4F" opacity="0.6" />

        {/* Flame group */}
        <g
          style={{
            transformOrigin: "150px 80px",
            animation: "flame-flicker 0.8s ease-in-out infinite, flame-glow 1.5s ease-in-out infinite",
          }}
        >
          {/* Outer glow */}
          <ellipse cx="150" cy="82" rx="16" ry="20" fill="#FFF9C4" opacity="0.3" />
          {/* Outer flame */}
          <path
            d="M150 60 C153 68, 162 78, 158 88 C156 94, 152 96, 150 96 C148 96, 144 94, 142 88 C138 78, 147 68, 150 60Z"
            fill="#FFF9C4"
          />
          {/* Inner flame */}
          <path
            d="M150 70 C151 75, 156 80, 154 86 C153 89, 151 90, 150 90 C149 90, 147 89, 146 86 C144 80, 149 75, 150 70Z"
            fill="white"
            opacity="0.9"
          />
        </g>

        {/* Decorative ribbon between tiers */}
        <path
          d="M85 250 Q150 240 215 250"
          stroke="#E1BEE7"
          strokeWidth="4"
          fill="none"
          strokeLinecap="round"
        />

        {/* Small hearts on cake */}
        <g fill="#F48FB1" opacity="0.6">
          <path d="M110 200 C110 197 106 195 106 198 C106 201 110 204 110 204 C110 204 114 201 114 198 C114 195 110 197 110 200Z" transform="scale(0.8) translate(20 30)" />
          <path d="M110 200 C110 197 106 195 106 198 C106 201 110 204 110 204 C110 204 114 201 114 198 C114 195 110 197 110 200Z" transform="scale(0.8) translate(100 20)" />
        </g>
      </svg>
    </div>
  );
};

export default CartoonCake;
