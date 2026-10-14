import { teamPhotos, type TeamPhoto } from './content/team-moments';

function TeamPhotoFigure({photo}:{photo:TeamPhoto}) {
  const imageUrl=(src:string)=>`${import.meta.env.BASE_URL}${src}`;
  return <figure className="team-photo">
    <img src={imageUrl(photo.src)} srcSet={`${imageUrl(photo.smallSrc)} 720w, ${imageUrl(photo.src)} 1440w`} sizes="(max-width: 650px) calc(100vw - 90px), 740px" width={photo.width} height={photo.height} alt={photo.alt} loading="lazy" decoding="async"/>
    <figcaption>{photo.caption}</figcaption>
  </figure>;
}

export function TeamMoments() {
  const [featured,...otherPhotos]=teamPhotos;
  if(!featured)return null;
  return <section className="team-moments" aria-label="Team moments at China Bank">
    <p className="eyebrow">PEOPLE BEHIND THE JOURNEY</p>
    <h4>Team moments</h4>
    <TeamPhotoFigure photo={featured}/>
    {otherPhotos.length>0&&<details className="team-photo-more"><summary>More team moments <span aria-hidden="true">＋</span></summary>{otherPhotos.map(photo=><TeamPhotoFigure key={photo.id} photo={photo}/>)}</details>}
  </section>;
}
