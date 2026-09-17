const description = number => {
  if(number<=13) return 'Aerial view of the residence and Calusa neighborhood';
  if(number<=17) return 'Front exterior and entrance';
  if(number<=22) return 'Light-filled open living spaces';
  if(number<=29) return 'Modern kitchen and island';
  if(number===30) return 'Interior hallway';
  if(number<=34) return 'Bedroom and closet spaces';
  if(number<=37) return 'Bathroom with wood vanity and glass shower';
  if(number<=40) return 'Bedroom';
  if(number===41) return 'Bathroom';
  if(number<=44) return 'Bedroom';
  if(number<=53) return 'Backyard pool, patio and outdoor spaces';
  return 'Garage and laundry area';
};
const photos = Array.from({length:55},(_,i)=>({src:`assets/photos/${String(i+1).padStart(2,'0')}.jpg`,alt:description(i+1)}));
const selected = [[14,'A warm welcome'],[22,'Room to breathe'],[24,'The heart of the home'],[36,'Thoughtful details'],[31,'Your quiet retreat'],[47,'Life by the pool']];
const gallery=document.querySelector('#gallery-grid'), all=document.querySelector('#all-photos'), dialog=document.querySelector('#lightbox');
let current=0,trigger;
function makePhotoButton(index,label,featured=false){
  const button=document.createElement('button'); button.type='button';
  if(featured)button.className='gallery-card';
  button.setAttribute('aria-label',`View photo ${index+1}: ${photos[index].alt}`);
  const img=document.createElement('img');img.src=photos[index].src;img.alt=photos[index].alt;img.loading='lazy';img.width=800;img.height=533;button.append(img);
  if(featured){const caption=document.createElement('span');caption.className='gallery-label';const title=document.createElement('span');title.textContent=label;const icon=document.createElement('span');icon.textContent='↗';icon.setAttribute('aria-hidden','true');caption.append(title,icon);button.append(caption);}
  button.addEventListener('click',()=>{trigger=button;current=index;updatePhoto();dialog.showModal();});return button;
}
selected.forEach(([n,label])=>gallery.append(makePhotoButton(n-1,label,true)));
let loaded=false;document.querySelector('.all-photos').addEventListener('toggle',event=>{if(event.target.open&&!loaded){loaded=true;photos.forEach((p,i)=>all.append(makePhotoButton(i)));}});
function updatePhoto(){const p=photos[current];document.querySelector('#lightbox-image').src=p.src;document.querySelector('#lightbox-image').alt=p.alt;document.querySelector('#photo-caption').textContent=p.alt;document.querySelector('#photo-count').textContent=`${current+1} / ${photos.length}`;}
function movePhoto(amount){current=(current+amount+photos.length)%photos.length;updatePhoto();}
document.querySelector('.photo-prev').addEventListener('click',()=>movePhoto(-1));document.querySelector('.photo-next').addEventListener('click',()=>movePhoto(1));document.querySelector('.close-lightbox').addEventListener('click',()=>dialog.close());
dialog.addEventListener('keydown',e=>{if(e.key==='ArrowLeft'){e.preventDefault();movePhoto(-1);}if(e.key==='ArrowRight'){e.preventDefault();movePhoto(1);}});
dialog.addEventListener('click',e=>{if(e.target===dialog){const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)dialog.close();}});
dialog.addEventListener('close',()=>trigger?.focus());
