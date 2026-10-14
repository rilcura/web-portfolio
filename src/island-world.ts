export interface Point { x: number; y: number }
export type Direction = 'up' | 'down' | 'left' | 'right';
export const spawn: Point = { x: 270, y: 278 };
export const landmarks = [
  {id:'mobile',title:'Mobile Lab',subtitle:'Apps & experiences',x:30,y:30,kind:'mobile'},
  {id:'systems',title:'Systems Workshop',subtitle:'Tools & foundations',x:69,y:38,kind:'systems'},
  {id:'experience',title:'Career Trail',subtitle:'The journey so far',x:20,y:67,kind:'career'},
  {id:'education',title:'Learning Academy',subtitle:'Always levelling up',x:51,y:64,kind:'education'},
  {id:'hobbies',title:'Campfire',subtitle:'Beyond the keyboard',x:79,y:74,kind:'hobbies'},
];
// The sandy shoreline from the SVG, in its 1000 × 560 world coordinates.
const shore = [[140,110],[210,110],[210,78],[396,78],[396,58],[626,58],[626,88],[764,88],[764,140],[848,140],[848,216],[882,216],[882,374],[840,374],[840,440],[702,440],[702,474],[354,474],[354,454],[190,454],[190,414],[120,414],[120,216],[140,216]];
const trees = [[190,170],[420,132],[560,134],[778,234],[140,318],[336,382],[628,392],[854,330],[716,124]];
function insideShore({x,y}: Point) {
  let inside = false;
  for (let i=0,j=shore.length-1;i<shore.length;j=i++) {
    const [xi,yi]=shore[i], [xj,yj]=shore[j];
    if ((yi>y)!==(yj>y) && x<(xj-xi)*(y-yi)/(yj-yi)+xi) inside=!inside;
  }
  return inside;
}
export function canWalk(p: Point) {
  if (![-7,7].every(dx=>[-5,5].every(dy=>insideShore({x:p.x+dx,y:p.y+dy})))) return false;
  if(p.x>416 && p.x<525 && p.y>176 && p.y<249) return false;
  if(trees.some(([x,y])=>Math.hypot(p.x-x,p.y-(y+8))<15)) return false;
  return !landmarks.some(l=>Math.abs(p.x-l.x*10)<29 && p.y>l.y*5.6-42 && p.y<l.y*5.6+6);
}
export function moveCharacter(p: Point, dx: number, dy: number, seconds: number): Point {
  const magnitude=Math.hypot(dx,dy);
  if(!magnitude) return p;
  const distance=150*Math.min(Math.max(seconds,0),0.04);
  const nextX={x:p.x+dx/magnitude*distance,y:p.y};
  const afterX=canWalk(nextX)?nextX:p;
  const nextY={x:afterX.x,y:afterX.y+dy/magnitude*distance};
  return canWalk(nextY)?nextY:afterX;
}
export function nearbyLandmark(p: Point) {
  return landmarks.map(l=>({landmark:l,distance:Math.hypot(p.x-l.x*10,p.y-(l.y*5.6+30))}))
    .filter(l=>l.distance<85).sort((a,b)=>a.distance-b.distance)[0]?.landmark;
}
