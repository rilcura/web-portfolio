import { useEffect, useRef } from 'react';
import { landmarks } from './island-world';
import { Landmark } from './Landmark';
import { ProjectCard } from './ProjectCard';
import { projects } from './content/projects';
import { career, education } from './content/career';
import { hobbies } from './content/hobbies';

const introductions: Record<string,{eyebrow:string;text:string}> = {
  mobile:{eyebrow:'ENTER THE MOBILE LAB',text:'Small screens, big possibilities. Browse the apps and foundations taking shape on this side of the island.'},
  systems:{eyebrow:'STEP INTO THE WORKSHOP',text:'Behind every great experience is a thoughtful system. Take a peek at the tools on the workbench.'},
  experience:{eyebrow:'FOLLOW THE CAREER TRAIL',text:'Every stop adds something. These are the teams, challenges, and experiences along my journey.'},
  education:{eyebrow:'WELCOME TO THE ACADEMY',text:'The learning quest never ends. Here are the studies and training behind the builder.'},
  hobbies:{eyebrow:'PULL UP A LOG',text:'A quieter corner for hobbies, side quests, and life beyond the keyboard.'},
};

export function LandmarkPopup({id,onClose}:{id:string;onClose:()=>void}) {
  const dialog=useRef<HTMLDialogElement>(null);
  const heading=useRef<HTMLHeadingElement>(null);
  const landmark=landmarks.find(l=>l.id===id)!;
  const intro=introductions[id];
  useEffect(()=>{
    const opener=document.activeElement as HTMLElement|null;
    const previousOverflow=document.body.style.overflow;
    const element=dialog.current!;
    document.body.style.overflow='hidden';
    element.showModal();heading.current?.focus({preventScroll:true});
    return ()=>{element.close();document.body.style.overflow=previousOverflow;if(opener?.isConnected)opener.focus({preventScroll:true});};
  },[]);
  return <dialog ref={dialog} className={`landmark-popup popup-${landmark.kind}`} aria-labelledby="landmark-popup-title" aria-describedby="landmark-popup-description" onCancel={event=>{event.preventDefault();onClose();}} onClick={event=>{
    if(event.target!==event.currentTarget)return;
    const box=event.currentTarget.getBoundingClientRect();
    if(event.clientX<box.left||event.clientX>box.right||event.clientY<box.top||event.clientY>box.bottom)onClose();
  }}>
    <div className="popup-topbar"><span>BUILDER ISLAND / {landmark.title.toUpperCase()}</span><button className="popup-close" onClick={onClose} aria-label="Close landmark popup">×</button></div>
    <header className="popup-header"><Landmark kind={landmark.kind}/><div><p className="eyebrow">{intro.eyebrow}</p><h2 id="landmark-popup-title" ref={heading} tabIndex={-1}>{landmark.title}</h2><p id="landmark-popup-description">{intro.text}</p></div></header>
    <div className="popup-content">
      {(id==='mobile'||id==='systems')&&<div className="popup-projects">{projects.filter(p=>p.district===id).sort((a,b)=>Number(b.featured)-Number(a.featured)).map(p=><ProjectCard key={p.id} project={p} idPrefix="popup-project"/>)}</div>}
      {id==='experience'&&<ol className="timeline">{career.map(c=><li key={c.company}><span className="timeline-date">{c.dates}</span><h3>{c.company}</h3><strong>{c.role}</strong><p>{c.description}</p></li>)}</ol>}
      {id==='education'&&<div className="popup-education">{education.map(e=><article key={e.title}><span className="eyebrow">{e.dates}</span><h3>{e.title}</h3><p>{e.detail}</p></article>)}</div>}
      {id==='hobbies'&&(hobbies.length?<div className="popup-education">{hobbies.map(h=><article key={h.title}><h3>{h.title}</h3><p>{h.description}</p></article>)}</div>:<div className="popup-campfire"><Landmark kind="hobbies"/><span className="eyebrow">THIS SIDE QUEST IS STILL LOADING</span><h3>Campfire stories coming soon.</h3><p>The fire is lit. The stories are still being gathered.<br/>Check back for hobbies, interests, and little adventures.</p></div>)}
    </div>
    <footer className="popup-footer"><span>Your island adventure continues right where you left it.</span><button className="button primary" onClick={onClose}>Back to the island <span aria-hidden="true">↩</span></button></footer>
  </dialog>;
}
