import { type Project } from './content/projects';
import { Landmark } from './Landmark';
export function ProjectCard({project:p,idPrefix='project'}:{project:Project;idPrefix?:string}) {
  const construction=p.status==='construction';
  return <article id={`${idPrefix}-${p.id}`} className={`project-card ${construction?'construction':''}`}>
    <div className={`project-art art-${p.district}`}><span className="project-kind">{construction?'SITE UNDER CONSTRUCTION':p.kind}</span>{construction?<div className="scaffold" aria-hidden="true"><span>!</span><i/><i/></div>:<Landmark kind={p.district}/>}<span className="art-number">{p.district==='mobile'?'MOBILE /':'SYSTEMS /'} {p.id.toUpperCase()}</span></div>
    <div className="project-body"><h3>{p.title}</h3><p>{p.summary}</p>{p.technologies.length>0&&<ul className="tags" aria-label="Technologies">{p.technologies.map(t=><li key={t}>{t}</li>)}</ul>}
    {!construction&&<details><summary>{p.kind==='Personal project'?'Explore case study':'Explore contribution'} <span aria-hidden="true">↗</span></summary><ul className="contributions">{p.contribution.map(c=><li key={c}>{c}</li>)}</ul><p className="disclosure">{p.kind==='Personal project'?'Personal project case study. Source code and account-specific materials remain private.':'Professional contribution summary. Product code and internal materials are not published here.'}</p></details>}
    {p.images?.map(i=><img className="project-image" key={i.src} src={`${import.meta.env.BASE_URL}${i.src.replace(/^\//,'')}`} alt={i.alt} loading="lazy"/>)}
    {!construction&&p.links?.map(l=><a className="project-link" key={l.url} href={l.url} target="_blank" rel="noreferrer">{l.label} ↗</a>)}{construction&&<span className="construction-note">Hard hat area. Check back for the reveal.</span>}</div>
  </article>;
}
