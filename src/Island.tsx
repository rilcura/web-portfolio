import { Landmark } from './Landmark';
export { Landmark } from './Landmark';
import { LandmarkPopup } from './LandmarkPopup';
import { landmarks, type Direction } from './island-world';
import { directionKeys, PixelCharacter, useExplorer } from './Explorer';
const Tree = ({x,y}:{x:number;y:number}) => <g transform={`translate(${x} ${y})`}><path fill="#6c5236" d="M-4 0h8v18h-8z"/><path fill="#387255" d="M-8-42H8v8h8v10h8v14h-48v-14h8v-10h8z"/><path fill="#54895c" d="M-8-42H8v8h8v10H0v8h-16v-8h8z"/></g>;
export function Island() {
  const explorer=useExplorer();
  const {active,character,nearby,visited}=explorer;
  const controls: {direction:Direction;symbol:string}[]=[{direction:'up',symbol:'↑'},{direction:'left',symbol:'←'},{direction:'down',symbol:'↓'},{direction:'right',symbol:'→'}];
  return <div className="exploration" onBlur={event=>{if(!event.currentTarget.contains(event.relatedTarget as Node|null))explorer.pause();}}>
  <div className="explorer-toolbar"><div><span className="eyebrow">YOUR ISLAND SIDE QUEST</span><p id="explorer-instructions">Arrow keys or WASD to walk. E or Enter to visit. Esc to pause.</p></div><div className="explorer-actions"><button className="button primary" onClick={active?explorer.pause:explorer.start}>{active?'Pause exploring':'Explore on foot'} <span aria-hidden="true">{active?'Ⅱ':'▶'}</span></button><button className="reset-explorer" onClick={explorer.reset}>Back to start ↺</button></div></div>
  <div className={`island-wrap island-stage ${active?'exploring':''}`} ref={explorer.stage} tabIndex={0} role="region" aria-label="Walkable island map" aria-describedby="explorer-instructions" onBlur={explorer.stop} onKeyDown={event=>{
    if(event.target!==event.currentTarget||event.altKey||event.ctrlKey||event.metaKey)return;
    const direction=directionKeys[event.key.toLowerCase()]||directionKeys[event.key];
    if(direction){event.preventDefault();if(!active)explorer.start();explorer.held.current.add(direction);}
    if(event.key==='Escape'){event.preventDefault();explorer.pause();}
    if(active&&nearby&&(event.key.toLowerCase()==='e'||event.key==='Enter')){event.preventDefault();explorer.open(nearby.id);}
  }} onKeyUp={event=>{const direction=directionKeys[event.key.toLowerCase()]||directionKeys[event.key];if(direction)explorer.held.current.delete(direction);}}>
  <svg className="island-art" viewBox="0 0 1000 560" preserveAspectRatio="none" role="img" aria-label="Pixel island with paths connecting five portfolio landmarks" shapeRendering="crispEdges">
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
  </svg><div className="landmarks">{landmarks.map(l=><button type="button" aria-haspopup="dialog" className={`landmark landmark-${l.kind} ${nearby?.id===l.id&&active?'nearby':''}`} key={l.id} onClick={()=>explorer.open(l.id)} style={{left:`${l.x}%`,top:`${l.y}%`}}><Landmark kind={l.kind}/><span className="landmark-label">{l.title}<small>{visited.includes(l.id)?'✓ Explored':l.subtitle}</small></span></button>)}</div>
  <div className="visitor" data-x={character.x.toFixed(2)} data-y={character.y.toFixed(2)} style={{left:`${character.x/10}%`,top:`${character.y/5.6}%`}}><PixelCharacter direction={character.direction} moving={active&&character.moving}/><span className="visitor-label">YOU</span></div>
  <span className="map-coordinate">ISLAND 01 / STILL GROWING</span></div>
  <div className="explorer-bottom"><div className="explorer-status"><p role="status" aria-live="polite">{active?(nearby?`You’re near ${nearby.title}. Ready to visit?`:'Follow your curiosity. Walk up to a landmark to visit.'):'Your adventure is optional. Every landmark is also a quick link.'}</p><span className="explored-count">{visited.length} / {landmarks.length} places explored</span></div>
  <div className="touch-controls" role="group" aria-label="Character movement controls">{controls.map(({direction,symbol})=><button key={direction} className={`move-${direction}`} aria-label={`Walk ${direction}`} onPointerDown={event=>{event.preventDefault();event.currentTarget.setPointerCapture(event.pointerId);explorer.start();explorer.held.current.add(direction);}} onPointerUp={()=>explorer.held.current.delete(direction)} onPointerCancel={()=>explorer.held.current.delete(direction)} onLostPointerCapture={()=>explorer.held.current.delete(direction)} onClick={event=>{if(event.detail===0){explorer.start();explorer.held.current.add(direction);setTimeout(()=>explorer.held.current.delete(direction),180);}}}>{symbol}</button>)}</div>
  <button className="visit-landmark" disabled={!nearby} onClick={()=>{if(nearby)explorer.open(nearby.id);}}>{nearby?`Visit ${nearby.title} ↗`:'Walk to a landmark'}<small>{nearby?'E / ENTER':'Your next discovery awaits'}</small></button></div>{explorer.selected&&<LandmarkPopup id={explorer.selected} onClose={explorer.close}/>}</div>;
}
