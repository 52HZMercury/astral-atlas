import type { SpacecraftKind } from "./spacecraft";

// Deliberately schematic silhouettes: components identify the craft, not scale.
export function SpacecraftDrawing({ kind }: { kind: SpacecraftKind }) {
  const dish = <g><path d="M78 72Q120 110 162 72Q120 48 78 72Z" fill="#26323c" /><ellipse cx="120" cy="72" rx="42" ry="15" fill="#b6bdba" /><path d="M84 72L120 37L156 72M120 37V85" fill="none" /><circle cx="120" cy="37" r="3" fill="#e06236" /></g>;
  const panel = <g fill="#253f59"><path d="M111 25H129V84H111Z" /><path d="M111 37H129M111 49H129M111 61H129M111 73H129M120 25V84" stroke="#7891a4" strokeWidth=".7" /></g>;
  return <svg className="spacecraft-drawing" viewBox="0 0 240 190" aria-hidden="true" data-craft={kind}>
    <g stroke="#2f4c79" strokeWidth=".6" opacity=".7" fill="none"><circle cx="120" cy="95" r="75" strokeDasharray="2 6" /><path d="M8 95H232M120 8V182M20 16H36M20 16V32M220 158V174H204" /></g>
    <g stroke="#c5c9c6" strokeWidth="1.4" strokeLinejoin="round" fill="#677078">
      {kind === "voyager" && <>
        <path d="M117 96L36 159L26 157M113 101L40 161M46 149L48 156M62 137L65 143M79 123L82 129M92 111L97 115" fill="none" />
        <path d="M133 103L194 128M137 108L192 134" /><path d="M185 123L205 131L199 145L180 137Z" fill="#a68b64" />
        <path d="M183 128L202 136M181 133L200 141M187 123L181 138" />
        <path d="M99 88L136 89L147 109L128 123L99 110Z" fill="#b29b74" />
        <path d="M139 101L168 68L181 70M159 78L170 82" fill="none" /><rect x="169" y="61" width="18" height="12" />{dish}
      </>}
      {kind === "pioneer" && <>
        <path d="M107 107L38 132M133 107L202 132M120 115V171" fill="none" />
        <path d="M101 88H139L142 113L120 125L98 113Z" fill="#ad9369" />
        {[26, 190].map(x => <g key={x}><rect x={x} y="126" width="24" height="20" fill="#7c6f5b" /><path d={`M${x+5} 126V146M${x+12} 126V146M${x+19} 126V146`} /></g>)}
        {dish}<path d="M120 37L114 16" fill="none" />
      </>}
      {kind === "cassini" && <>
        <path d="M100 77H140V145L129 159H108L100 144Z" fill="#ad9163" />
        <path d="M100 96H140M100 122H140M110 78V143M130 78V143M108 159L102 169H134L129 159" />
        <path d="M100 106L76 89L68 47M140 105L168 87V35" fill="none" />
        <rect x="75" y="116" width="17" height="26" fill="#5b6064" />
        <ellipse cx="148" cy="130" rx="19" ry="22" fill="#c1a980" /><ellipse cx="148" cy="130" rx="12" ry="16" fill="#897a61" />
        <g transform="translate(0 -20)">{dish}</g>
      </>}
      {kind === "new-horizons" && <>
        <path d="M70 106L150 92L161 136L108 152L70 131Z" fill="#c0a36e" /><path d="M70 106L108 124L161 108M108 124V152" fill="none" />
        <path d="M76 116H44" /><rect x="23" y="102" width="27" height="32" fill="#626269" /><path d="M28 102V134M34 102V134M40 102V134M46 102V134" />
        <g transform="translate(12 0) scale(.9)">{dish}</g><path d="M151 98L183 75L190 41" fill="none" /><rect x="139" y="118" width="12" height="10" fill="#253f59" />
      </>}
      {kind === "juno" && <>
        {[0,120,240].map(a => <g key={a} transform={`rotate(${a} 120 100)`}>{panel}<path d="M120 84V94" /></g>)}
        <path d="M106 92L120 84L134 92V108L120 116L106 108Z" fill="#b5a582" /><ellipse cx="120" cy="97" rx="12" ry="8" fill="#d4d2bd" /><path d="M112 98L120 88L128 98" fill="none" />
      </>}
      {kind === "webb" && <>
        {[0,5,10,15].map(y => <path key={y} d={`M33 ${134+y}L119 ${105+y}L207 ${135+y}L129 ${162+y}Z`} fill={y % 10 ? "#8d8b94" : "#b5b1b0"} stroke="#353d49" />)}
        <path d="M120 117V143M83 110L91 143M157 110L145 143" fill="none" />
        {[-2,-1,0,1,2].flatMap(row => Array.from({length:5-Math.abs(row)}, (_,i) => {
          const count=5-Math.abs(row), x=120+(i-(count-1)/2)*22, y=66+row*19;
          if(row===0 && i===2) return null;
          return <polygon key={`${row}-${i}`} points={`${x},${y-13} ${x+11},${y-6.5} ${x+11},${y+6.5} ${x},${y+13} ${x-11},${y+6.5} ${x-11},${y-6.5}`} fill="#c4a15e" stroke="#524734" />;
        }))}
        <path d="M84 38L120 104L156 38M120 104V23" fill="none" stroke="#d9d2bc" /><ellipse cx="120" cy="104" rx="8" ry="5" fill="#777b80" />
      </>}
      {kind === "rosetta" && <>
        <path d="M93 88H34M147 88H206" />
        {[18,150].map(x => <g key={x}><rect x={x} y="65" width="72" height="50" fill="#253f59" />{[1,2,3,4,5].map(i=><path key={i} d={`M${x+i*12} 65V115`} stroke="#7891a4" strokeWidth=".7" />)}<path d={`M${x} 90H${x+72}`} stroke="#7891a4" /></g>)}
        <path d="M99 66L128 59L142 72V109L112 118L99 105Z" fill="#b5a077" /><path d="M99 66L112 80L142 72M112 80V118" />
        <ellipse cx="126" cy="51" rx="17" ry="7" fill="#d1cec0" /><path d="M126 51V40M126 58V62" />
        <path d="M166 140L176 136L187 143V155H168Z" fill="#b5a077" /><path d="M170 154L158 169H153M181 154L193 169H199M175 156V174H180" fill="none" />
      </>}
      {kind === "change-4" && <>
        <path d="M91 101L62 145H49M147 101L173 145H187M101 122L89 161H76M141 122L153 161H167" fill="none" strokeWidth="3" />
        <path d="M88 87L115 73L151 87V120L121 135L88 119Z" fill="#b29a70" /><path d="M88 87L120 103L151 87M120 103V135" />
        <path d="M86 87L33 74L20 99L82 111ZM155 87L207 74L220 99L159 111Z" fill="#253f59" />
        <path d="M35 81L83 94M29 91L83 103M54 80L44 105M72 84L64 109M157 94L204 81M159 103L213 91M183 80L194 105M166 84L175 109" stroke="#7891a4" strokeWidth=".7" />
        <path d="M125 80V51L141 43" fill="none" /><ellipse cx="141" cy="43" rx="17" ry="7" transform="rotate(-30 141 43)" fill="#c3c7c2" /><path d="M106 80V48H97" fill="none" />
        <path d="M183 143H212L218 153H187Z" fill="#b5a077" /><path d="M197 143V131H204" fill="none" />{[188,201,214].map(x=><circle key={x} cx={x} cy="158" r="4" fill="#343e49" />)}
      </>}
    </g>
  </svg>;
}
