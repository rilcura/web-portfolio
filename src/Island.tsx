const Tree = ({x,y}:{x:number;y:number}) => <g transform={`translate(${x} ${y})`}><path fill="#6c5236" d="M-4 0h8v18h-8z"/><path fill="#387255" d="M-8-42H8v8h8v10h8v14h-48v-14h8v-10h8z"/><path fill="#54895c" d="M-8-42H8v8h8v10H0v8h-16v-8h8z"/></g>;
export function Landmark({kind}:{kind:string}) {
  return <svg viewBox="0 0 96 84" aria-hidden="true" shapeRendering="crispEdges">
    {kind==='mobile' ? <><path fill="#21483f" d="M18 22h60v54H18z"/><path fill="#e3d9b5" d="M22 26h52v46H22z"/><path fill="#de8155" d="M14 14h68v16H14zM24 6h48v8H24z"/><path fill="#599caf" d="M30 38h14v16H30zm24 0h14v16H54z"/><path fill="#244b3f" d="M42 56h14v20H42z"/><path fill="#f7db83" d="M40 0h18v20H40z"/><path fill="#244b3f" d="M44 4h10v10H44z"/></> : kind==='systems' ? <><path fill="#21483f" d="M14 28h68v48H14z"/><path fill="#9eaca0" d="M18 32h60v40H18z"/><path fill="#526c69" d="M10 20h76v12H10zM60 4h12v16H60z"/><path fill="#f0ca77" d="M26 44h18v14H26zm28 0h14v28H54z"/><path fill="#21483f" d="M30 48h10v6H30z"/><path fill="#e8b864" d="M10 68h76v8H10z"/></> : kind==='career' ? <><path fill="#76553b" d="M44 8h8v70h-8z"/><path fill="#efce8b" d="M14 18h62v20H14zM24 44h62v20H24z"/><path fill="#244b3f" d="M24 26h36v4H24zm14 26h36v4H38z"/></> : kind==='education' ? <><path fill="#e7dabb" d="M16 30h64v44H16z"/><path fill="#667fa0" d="M10 22h76v12H10zM20 14h56v8H20zM32 6h32v8H32z"/><path fill="#294b42" d="M24 44h12v14H24zm36 0h12v14H60zM42 48h12v26H42z"/><path fill="#e1b860" d="M42 22h12v12H42z"/></> : <><path fill="#70513d" d="M18 66h60v8H18zM26 58h44v8H26z"/><path fill="#ee8950" d="M30 36h36v26H30zM38 20h20v16H38zM46 10h8v18H46z"/><path fill="#f8d578" d="M42 38h16v24H42zM46 30h8v10H46z"/><path fill="#5c7755" d="M8 42h12v20H8zm68 0h12v20H76z"/></>}
  </svg>;
}
export const landmarks = [
  {id:'mobile',title:'Mobile Lab',subtitle:'Apps & experiences',x:30,y:30,kind:'mobile'},
  {id:'systems',title:'Systems Workshop',subtitle:'Tools & foundations',x:69,y:38,kind:'systems'},
  {id:'experience',title:'Career Trail',subtitle:'The journey so far',x:20,y:67,kind:'career'},
  {id:'education',title:'Learning Academy',subtitle:'Always levelling up',x:51,y:64,kind:'education'},
  {id:'hobbies',title:'Campfire',subtitle:'Beyond the keyboard',x:79,y:74,kind:'hobbies'},
];
export function Island() {
  return <div className="island-wrap"><svg className="island-art" viewBox="0 0 1000 560" role="img" aria-label="Pixel island with paths connecting five portfolio landmarks" shapeRendering="crispEdges">
    <defs><pattern id="water" width="100" height="64" patternUnits="userSpaceOnUse"><path d="M12 20h22m24 26h18" stroke="#b8d9d9" strokeWidth="3"/></pattern></defs>
    <path fill="#d5e6e4" d="M0 0h1000v560H0z"/><path fill="url(#water)" d="M0 0h1000v560H0z"/>
    <path fill="#9bbec0" d="M140 126h70V94h186V74h230v30h138v52h84v76h34v158h-42v66H702v34H354v-20H190v-40h-70V232h20z"/>
    <path fill="#e9d49e" d="M140 110h70V78h186V58h230v30h138v52h84v76h34v158h-42v66H702v34H354v-20H190v-40h-70V216h20z"/>
    <path fill="#a5c486" d="M164 120h68V94h170V78h208v30h136v50h82v74h30v128h-40v62H692v30H360v-20H204v-40h-64V228h24z"/>
    <path fill="#b4ce91" d="M232 120h300v36h180v76h72v124H648v58H340v-32H198V230h34z"/>
    <path d="M300 156v122h216v78m0-78h174v-58M300 278h-98v82m314-4h266v48" fill="none" stroke="#dfcd99" strokeWidth="24"/>
    <path d="M300 156v122h216v78m0-78h174v-58M300 278h-98v82m314-4h266v48" fill="none" stroke="#f0dfb3" strokeWidth="14"/>
    {[ [190,170],[420,132],[560,134],[778,234],[140,318],[336,382],[628,392],[854,330],[716,124] ].map(([x,y])=><Tree key={`${x}-${y}`} x={x} y={y}/>)}
    <path fill="#6d97a2" d="M440 182h58v12h20v34h-18v14h-60v-12h-18v-34h18z"/><path fill="#a9d1d1" d="M448 190h42v8h20v20h-20v12h-44v-10h-16v-20h18z"/>
    <path fill="#8a6442" d="M92 362h108v12H92zm0 20h108v12H92zm0 20h108v12H92zM92 352h8v74h-8zm92 0h8v74h-8z"/>
    <g fill="#6b985f">{[[260,110],[378,210],[620,174],[590,370],[250,404],[754,330]].map(([x,y])=><path key={`${x}-${y}`} d={`M${x} ${y}h4v-8h4v8h4v4h-12z`}/>)}</g>
    <g fill="#f5e3ac"><path d="M56 126h46v4H56zm780 346h48v4h-48zM350 510h40v4h-40z"/></g>
    <g fill="#faf6e9"><path d="M48 48h60v10H48zm12-10h34v10H60zM846 54h90v10h-90zm16-14h48v14h-48z"/></g>
  </svg><div className="landmarks">{landmarks.map(l=><a className={`landmark landmark-${l.kind}`} key={l.id} href={`#${l.id}`} style={{left:`${l.x}%`,top:`${l.y}%`}}><Landmark kind={l.kind}/><span className="landmark-label">{l.title}<small>{l.subtitle}</small></span></a>)}</div><span className="map-coordinate">ISLAND 01 / STILL GROWING</span></div>;
}
