import { test } from 'node:test';
import assert from 'node:assert/strict';
import { canWalk, landmarks, moveCharacter, nearbyLandmark, spawn } from '../src/island-world.ts';

test('spawn is walkable and movement respects elapsed time',()=>{
  assert.ok(canWalk(spawn));
  assert.equal(moveCharacter(spawn,1,0,0.02).x,273);
  assert.deepEqual(moveCharacter(spawn,0,0,0.02),spawn);
});
test('diagonal travel is normalised and long frames are capped',()=>{
  const diagonal=moveCharacter(spawn,1,1,0.02);
  assert.ok(Math.abs(Math.hypot(diagonal.x-spawn.x,diagonal.y-spawn.y)-3)<0.0001);
  assert.equal(moveCharacter(spawn,1,0,10).x,276);
});
test('shoreline, pond, tree trunks and buildings block walking',()=>{
  for(const point of [{x:100,y:300},{x:470,y:210},{x:190,y:178},{x:300,y:150},{x:890,y:300}])assert.equal(canWalk(point),false);
  let p={x:130,y:280};for(let i=0;i<100;i++)p=moveCharacter(p,-1,0,0.04);
  assert.ok(p.x>=127);assert.ok(canWalk(p));
  const sliding=moveCharacter({x:414,y:200},1,1,0.04);
  assert.equal(sliding.x,414);assert.ok(sliding.y>200);
});
test('every landmark has a walkable approach and proximity prompt',()=>{
  for(const l of landmarks){const approach={x:l.x*10,y:l.y*5.6+20};assert.ok(canWalk(approach),l.id);assert.equal(nearbyLandmark(approach)?.id,l.id);}
  assert.equal(nearbyLandmark({x:600,y:270}),undefined);
});
test('all landmarks are reachable on foot from spawn',()=>{
  const queue=[spawn],seen=new Set<string>();const reached=new Set<string>();
  for(let i=0;i<queue.length;i++){
    const p=queue[i],key=`${p.x},${p.y}`;if(seen.has(key))continue;seen.add(key);
    if(!canWalk(p))continue;
    const landmark=nearbyLandmark(p);if(landmark)reached.add(landmark.id);
    for(const [dx,dy] of [[5,0],[-5,0],[0,5],[0,-5]]){const next={x:p.x+dx,y:p.y+dy};if(canWalk(next)&&!seen.has(`${next.x},${next.y}`))queue.push(next);}
  }
  assert.equal(reached.size,landmarks.length);
});
