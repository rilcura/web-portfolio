import { useEffect, useRef } from 'react';
import { profile } from './content/profile';

export function ContactPopup({onClose}:{onClose:()=>void}) {
  const dialog=useRef<HTMLDialogElement>(null);
  const heading=useRef<HTMLHeadingElement>(null);
  useEffect(()=>{
    const opener=document.activeElement as HTMLElement|null;
    const previousOverflow=document.body.style.overflow;
    const element=dialog.current!;
    document.body.style.overflow='hidden';
    element.showModal();heading.current?.focus({preventScroll:true});
    return ()=>{element.close();document.body.style.overflow=previousOverflow;if(opener?.isConnected)opener.focus({preventScroll:true});};
  },[]);
  return <dialog ref={dialog} className="landmark-popup contact-popup" aria-labelledby="contact-popup-title" onCancel={event=>{event.preventDefault();onClose();}} onClick={event=>{
    if(event.target!==event.currentTarget)return;
    const box=event.currentTarget.getBoundingClientRect();
    if(event.clientX<box.left||event.clientX>box.right||event.clientY<box.top||event.clientY>box.bottom)onClose();
  }}>
    <div className="popup-topbar"><span>BUILDER ISLAND / MESSAGE IN A BOTTLE</span><button className="popup-close" onClick={onClose} aria-label="Close contact popup">×</button></div>
    <header className="popup-header"><div><p className="eyebrow">THE NEXT ADVENTURE STARTS WITH HELLO</p><h2 ref={heading} tabIndex={-1} id="contact-popup-title">Let’s connect.</h2><p>{profile.name} · {profile.title}<br/>{profile.location}</p></div></header>
    <div className="popup-content contact-options">
      <a href={`mailto:${profile.email}`}><span className="eyebrow">EMAIL</span><strong>{profile.email}</strong><small>Open your email app ↗</small></a>
      <a href={profile.linkedin} target="_blank" rel="noreferrer"><span className="eyebrow">LINKEDIN</span><strong>linkedin.com/in/rilcura</strong><small>View my professional profile ↗</small></a>
      <a href={profile.github} target="_blank" rel="noreferrer"><span className="eyebrow">GITHUB</span><strong>github.com/rilcura</strong><small>Explore my repositories ↗</small></a>
    </div>
    <footer className="popup-footer"><span>Pick the channel that works for you.</span><button className="button primary" onClick={onClose}>Back to the island ↩</button></footer>
  </dialog>;
}
