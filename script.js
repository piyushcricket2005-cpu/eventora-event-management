const events = [
  {id:1,title:'Neon Nights Festival',category:'Music',date:'NOV 14, 2026',time:'6:30 PM onwards',location:'Ekamra Haat, Bhubaneswar',price:799,tag:'Selling fast',image:'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?auto=format&fit=crop&w=900&q=80',description:'A night of electric performances, immersive light installations and the kind of music that stays with you long after the last song. Bring your friends and find your rhythm.'},
  {id:2,title:'Future Forward Summit',category:'Technology',date:'NOV 18, 2026',time:'10:00 AM – 5:00 PM',location:'KIIT Convention Centre, Bhubaneswar',price:499,tag:'Popular',image:'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=900&q=80',description:'Meet the minds shaping tomorrow. Explore AI, product thinking and emerging technology through talks, hands-on sessions and conversations with builders.'},
  {id:3,title:'The Art of Being',category:'Art',date:'NOV 21, 2026',time:'11:00 AM – 7:00 PM',location:'Odisha State Museum, Bhubaneswar',price:299,tag:'New experience',image:'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?auto=format&fit=crop&w=900&q=80',description:'Step into a world of colour, craft and creative expression. Discover independent artists, live demonstrations and an exhibition celebrating the many forms of art.'},
  {id:4,title:'The Sunday Brunch Club',category:'Food',date:'NOV 22, 2026',time:'11:30 AM – 2:30 PM',location:'Mayfair Lagoon, Bhubaneswar',price:999,tag:'Limited seats',image:'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=900&q=80',description:'Good food tastes even better together. Enjoy a relaxed afternoon of delicious plates, fresh flavours and conversations in a beautiful setting.'},
  {id:5,title:'Startup Stories Live',category:'Business',date:'NOV 26, 2026',time:'4:00 PM – 8:00 PM',location:'Toshali Sands, Bhubaneswar',price:399,tag:'Community pick',image:'https://images.unsplash.com/photo-1559223607-a43c990c692c?auto=format&fit=crop&w=900&q=80',description:'Real stories from people who dared to build something from scratch. Hear honest lessons on starting up, finding customers and navigating the messy middle.'},
  {id:6,title:'Acoustic Under the Stars',category:'Music',date:'NOV 29, 2026',time:'7:00 PM – 10:00 PM',location:'Forest Park, Bhubaneswar',price:599,tag:'Outdoor',image:'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=900&q=80',description:'An intimate open-air music evening with soulful acoustic sets, warm lights and a sky full of stars. Bring a blanket, settle in and let the music take over.'},
  {id:7,title:'Design Thinking Workshop',category:'Technology',date:'DEC 03, 2026',time:'9:30 AM – 1:00 PM',location:'KIIT School of Technology, Bhubaneswar',price:199,tag:'Hands-on',image:'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=900&q=80',description:'Turn everyday problems into thoughtful solutions. Learn practical design-thinking methods, collaborate in small teams and leave with a prototype and a fresh perspective.'},
  {id:8,title:'Culture & Craft Bazaar',category:'Art',date:'DEC 06, 2026',time:'10:00 AM – 6:00 PM',location:'Janata Maidan, Bhubaneswar',price:0,tag:'Free entry',image:'https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=900&q=80',description:'Celebrate local creativity at a lively gathering of makers, artists and independent brands. Browse handcrafted finds, watch live craft demonstrations and meet the people behind the work.'}
];

const grid = document.getElementById('eventGrid');
const searchInput = document.getElementById('searchInput');
const categoryFilters = document.getElementById('categoryFilters');
const resultsCount = document.getElementById('resultsCount');
const emptyState = document.getElementById('emptyState');
const modal = document.getElementById('eventModal');
let activeCategory = 'All';
let searchTerm = '';
let toastTimer;

function getSavedEvents(){try{return JSON.parse(localStorage.getItem('eventoraSaved')||'[]')}catch{return []}}
function setSavedEvents(ids){localStorage.setItem('eventoraSaved',JSON.stringify(ids))}
function renderEvents(){
  const filtered=events.filter(event=>{
    const categoryMatch=activeCategory==='All'||event.category===activeCategory;
    const haystack=`${event.title} ${event.category} ${event.location} ${event.description}`.toLowerCase();
    return categoryMatch&&haystack.includes(searchTerm);
  });
  resultsCount.textContent=`Showing ${filtered.length} ${filtered.length===1?'experience':'experiences'}`;
  document.getElementById('allCount').textContent=String(events.length).padStart(2,'0');
  emptyState.hidden=filtered.length!==0;
  grid.innerHTML=filtered.map(event=>{
    const saved=getSavedEvents().includes(event.id);
    return `<article class="event-card" data-id="${event.id}" tabindex="0" role="button" aria-label="View ${event.title}">
      <div class="event-image"><img src="${event.image}" alt="${event.title}" loading="lazy"><span class="event-tag">${event.tag}</span><button class="save-event ${saved?'saved':''}" data-save="${event.id}" aria-label="${saved?'Remove saved event':'Save event'}" title="Save event">${saved?'♥':'♡'}</button></div>
      <div class="event-info"><div class="event-date">${event.date}</div><h3>${event.title}</h3><div class="event-location"><span>⌖</span>${event.location}</div><div class="event-card-bottom"><div class="event-price">${event.price===0?'FREE':`₹${event.price.toLocaleString('en-IN')} <small>/ person</small>`}</div><span class="event-arrow">↗</span></div></div>
    </article>`;
  }).join('');
}
function showToast(message){const toast=document.getElementById('toast');toast.textContent=message;toast.classList.add('show');clearTimeout(toastTimer);toastTimer=setTimeout(()=>toast.classList.remove('show'),2800)}
function openEvent(id){const event=events.find(item=>item.id===Number(id));if(!event)return;document.getElementById('selectedEventId').value=event.id;document.getElementById('modalImage').style.backgroundImage=`url("${event.image}")`;document.getElementById('modalCategory').textContent=`${event.category} · ${event.date}`;document.getElementById('modalTitle').textContent=event.title;document.getElementById('modalDescription').textContent=event.description;document.getElementById('modalMeta').innerHTML=`<span>◷ ${event.time}</span><span>⌖ ${event.location}</span><span>₹${event.price===0?'0':event.price.toLocaleString('en-IN')} / person</span>`;document.getElementById('formError').textContent='';modal.classList.add('open');modal.setAttribute('aria-hidden','false');document.body.style.overflow='hidden';document.getElementById('fullName').focus()}
function closeModal(){modal.classList.remove('open');modal.setAttribute('aria-hidden','true');document.body.style.overflow=''}

categoryFilters.addEventListener('click',event=>{const button=event.target.closest('[data-category]');if(!button)return;activeCategory=button.dataset.category;categoryFilters.querySelectorAll('.filter-chip').forEach(chip=>chip.classList.toggle('active',chip===button));renderEvents()});
searchInput.addEventListener('input',event=>{searchTerm=event.target.value.trim().toLowerCase();renderEvents()});
grid.addEventListener('click',event=>{const saveButton=event.target.closest('[data-save]');if(saveButton){event.stopPropagation();const id=Number(saveButton.dataset.save);let saved=getSavedEvents();saved=saved.includes(id)?saved.filter(item=>item!==id):[...saved,id];setSavedEvents(saved);renderEvents();showToast(saved.includes(id)?'Event saved to your favourites.':'Event removed from your favourites.');return}const card=event.target.closest('.event-card');if(card)openEvent(card.dataset.id)});
grid.addEventListener('keydown',event=>{if((event.key==='Enter'||event.key===' ')&&event.target.classList.contains('event-card')){event.preventDefault();openEvent(event.target.dataset.id)}});
document.getElementById('clearFilters').addEventListener('click',()=>{activeCategory='All';searchTerm='';searchInput.value='';categoryFilters.querySelectorAll('.filter-chip').forEach(chip=>chip.classList.toggle('active',chip.dataset.category==='All'));renderEvents()});
document.getElementById('modalClose').addEventListener('click',closeModal);
modal.addEventListener('click',event=>{if(event.target===modal)closeModal()});
document.addEventListener('keydown',event=>{if(event.key==='Escape'&&modal.classList.contains('open'))closeModal()});

document.getElementById('registrationForm').addEventListener('submit',event=>{
  event.preventDefault();const name=document.getElementById('fullName').value.trim();const email=document.getElementById('email').value.trim();const phone=document.getElementById('phone').value.replace(/\D/g,'');const tickets=Number(document.getElementById('ticketCount').value);const consent=document.getElementById('consent').checked;const error=document.getElementById('formError');
  if(name.length<2){error.textContent='Please enter your full name (at least 2 characters).';return}
  if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)){error.textContent='Please enter a valid email address.';return}
  if(!/^\d{10}$/.test(phone)){error.textContent='Please enter a valid 10-digit phone number.';return}
  if(!consent){error.textContent='Please accept the event update consent to continue.';return}
  const eventId=Number(document.getElementById('selectedEventId').value);const eventData=events.find(item=>item.id===eventId);let registrations=[];try{registrations=JSON.parse(localStorage.getItem('eventoraRegistrations')||'[]')}catch{}
  const registration={reference:`EVT-${Date.now().toString().slice(-7)}`,eventId,eventTitle:eventData.title,name,email,phone,tickets,registeredAt:new Date().toISOString()};registrations.push(registration);localStorage.setItem('eventoraRegistrations',JSON.stringify(registrations));event.target.reset();closeModal();showToast(`You're on the list, ${name.split(' ')[0]}! Ref: ${registration.reference}`);
});

document.getElementById('themeToggle').addEventListener('click',()=>{document.body.classList.toggle('dark');const isDark=document.body.classList.contains('dark');localStorage.setItem('eventoraTheme',isDark?'dark':'light');document.getElementById('themeToggle').textContent=isDark?'☾':'☼'});
if(localStorage.getItem('eventoraTheme')==='dark'){document.body.classList.add('dark');document.getElementById('themeToggle').textContent='☾'}
document.getElementById('menuToggle').addEventListener('click',()=>{const nav=document.getElementById('navLinks');const open=nav.classList.toggle('open');document.getElementById('menuToggle').setAttribute('aria-expanded',String(open))});
document.querySelectorAll('#navLinks a').forEach(link=>link.addEventListener('click',()=>{document.getElementById('navLinks').classList.remove('open');document.getElementById('menuToggle').setAttribute('aria-expanded','false')}));
document.getElementById('newsletterForm').addEventListener('submit',event=>{event.preventDefault();const email=document.getElementById('newsletterEmail').value.trim();let subscribers=[];try{subscribers=JSON.parse(localStorage.getItem('eventoraSubscribers')||'[]')}catch{}if(!subscribers.includes(email)){subscribers.push(email);localStorage.setItem('eventoraSubscribers',JSON.stringify(subscribers))}document.getElementById('newsletterMessage').textContent='You’re on the list. Look out for something good!';event.target.reset()});
renderEvents();
