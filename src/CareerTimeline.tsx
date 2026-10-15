import { career } from './content/career';
import { TeamMoments } from './TeamMoments';

export function CareerTimeline({ showTeamMoments = false }: { showTeamMoments?: boolean }) {
  return <ol className="timeline">{career.map(company => <li key={company.company}>
    <span className="timeline-date">{company.dates}</span>
    <h3>{company.company}</h3>
    {company.roles.map(role => <div className="career-role" key={`${role.title}-${role.dates}`}>
      <h4>{role.title}</h4>
      <span className="timeline-date">{role.dates}</span>
      <p className="career-employment">{role.employment}</p>
      <ul className="career-responsibilities">{role.responsibilities.map(text => <li key={text}>{text}</li>)}</ul>
    </div>)}
    {showTeamMoments && company.company === 'China Bank PH' && <TeamMoments/>}
  </li>)}</ol>;
}
