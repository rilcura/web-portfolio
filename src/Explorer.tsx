import { useEffect, useRef, useState } from 'react';
import { moveCharacter, nearbyLandmark, spawn, type Direction } from './island-world';

export const directionKeys: Record<string, Direction> = {ArrowUp:'up',ArrowDown:'down',ArrowLeft:'left',ArrowRight:'right',w:'up',s:'down',a:'left',d:'right'};
export function useExplorer() {
  const [active,setActive]=useState(false);
  const [character,setCharacter]=useState({...spawn,direction:'down' as Direction,moving:false});
  const [visited,setVisited]=useState<string[]>([]);
  const held=useRef(new Set<Direction>());
  const stage=useRef<HTMLDivElement>(null);
  const stop=()=>held.current.clear();
  useEffect(()=>{
    if(!active) {held.current.clear();setCharacter(c=>c.moving?{...c,moving:false}:c);return;}
    let frame=0,previous=0;
    const tick=(time:number)=>{
      const delta=previous?(time-previous)/1000:0; previous=time;
      const dx=Number(held.current.has('right'))-Number(held.current.has('left'));
      const dy=Number(held.current.has('down'))-Number(held.current.has('up'));
      setCharacter(c=>{
        const next=moveCharacter(c,dx,dy,delta);
        const moving=next.x!==c.x||next.y!==c.y;
        const direction=dx?(dx>0?'right':'left'):dy?(dy>0?'down':'up'):c.direction;
        if(!moving&&c.moving===false&&direction===c.direction) return c;
        return {...next,moving,direction};
      });
      frame=requestAnimationFrame(tick);
    };
    frame=requestAnimationFrame(tick);
    const pause=()=>{held.current.clear();setActive(false);};
    const visibility=()=>{if(document.hidden)pause();};
    window.addEventListener('blur',pause);document.addEventListener('visibilitychange',visibility);
    return ()=>{cancelAnimationFrame(frame);held.current.clear();window.removeEventListener('blur',pause);document.removeEventListener('visibilitychange',visibility);};
  },[active]);
  const start=()=>{setActive(true);stage.current?.focus({preventScroll:true});};
  const pause=()=>{stop();setActive(false);};
  const open=(id:string)=>{
    pause();setVisited(v=>v.includes(id)?v:[...v,id]);window.location.hash=id;
    const target=document.getElementById(id);
    target?.setAttribute('tabindex','-1');target?.focus({preventScroll:true});target?.scrollIntoView();
  };
  const reset=()=>{stop();setCharacter({...spawn,direction:'down',moving:false});start();};
  return {active,character,visited,held,stage,stop,start,pause,open,reset,nearby:nearbyLandmark(character)};
}
export function PixelCharacter({direction,moving}:{direction:Direction;moving:boolean}) {
  return <svg className={`pixel-character facing-${direction} ${moving?'walking':''}`} viewBox="0 0 24 32" aria-hidden="true" shapeRendering="crispEdges">
    <ellipse cx="12" cy="30" rx="10" ry="2" fill="#244b3f40"/>
    <g className="character-body">
      <path fill="#4c352f" d="M7 1h10v2h3v10H4V3h3z"/>
      <path fill="#edba8c" d="M6 6h12v9H6zM9 15h6v3H9z"/>
      {direction!=='up'&&<path fill="#28382f" d={direction==='left'?'M6 8h2v2H6z':direction==='right'?'M16 8h2v2h-2z':'M7 8h2v2H7zm8 0h2v2h-2z'}/>}
      {direction==='up'&&<path fill="#4c352f" d="M6 4h12v9H6z"/>}
      <path fill="#edba8c" d="M3 18h3v7H3zm15 0h3v7h-3z"/>
      <path fill="#cc7448" d="M6 17h12v9H6z"/><path fill="#e6a966" d="M6 17h12v3H6z"/>
      {direction==='up'&&<path fill="#436651" d="M8 19h8v7H8z"/>}
      <path className="leg-left" fill="#29483e" d="M7 26h4v4H5v-2h2z"/>
      <path className="leg-right" fill="#29483e" d="M13 26h4v2h2v2h-6z"/>
    </g>
  </svg>;
}
