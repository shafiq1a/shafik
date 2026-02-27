// Nav scroll
const nav=document.getElementById('nav');
window.addEventListener('scroll',()=>nav.classList.toggle('scrolled',scrollY>30),{passive:true});

// Hamburger
const ham=document.getElementById('ham'),menu=document.getElementById('menu');
ham.addEventListener('click',()=>{ham.classList.toggle('open');menu.classList.toggle('open')});
menu.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{ham.classList.remove('open');menu.classList.remove('open')}));

// Active nav
const secs=document.querySelectorAll('section[id]');
const navAs=document.querySelectorAll('.nav-menu a');
new IntersectionObserver(es=>{es.forEach(e=>{if(!e.isIntersecting)return;navAs.forEach(a=>a.classList.toggle('active',a.getAttribute('href')==='#'+e.target.id))})},{rootMargin:'-40% 0px -55% 0px'}).observe;
const io=new IntersectionObserver(es=>{es.forEach(e=>{if(!e.isIntersecting)return;navAs.forEach(a=>a.classList.toggle('active',a.getAttribute('href')==='#'+e.target.id))})},{rootMargin:'-40% 0px -55% 0px'});
secs.forEach(s=>io.observe(s));

// Mobile menu

const overlay = document.getElementById("overlay");

ham.addEventListener("click", () => {
  menu.classList.toggle("active");
  ham.classList.toggle("active");
  overlay.classList.toggle("active");
});

overlay.addEventListener("click", () => {
  menu.classList.remove("active");
  ham.classList.remove("active");
  overlay.classList.remove("active");
});

// Typed
const words=['Backend .NET Developer','Full Stack Developer'];
let wi=0,ci=0,del=false;
const tel=document.getElementById('typed');
function type(){const w=words[wi];if(!del){tel.textContent=w.slice(0,++ci);if(ci===w.length){del=true;return setTimeout(type,1800)}setTimeout(type,75)}else{tel.textContent=w.slice(0,--ci);if(ci===0){del=false;wi=(wi+1)%words.length;return setTimeout(type,400)}setTimeout(type,40)}}
setTimeout(type,900);

// Scroll reveal
const ro=new IntersectionObserver(es=>{es.forEach(e=>{if(e.isIntersecting)e.target.classList.add('visible')})},{threshold:0.12});
document.querySelectorAll('.reveal,.reveal-left,.reveal-right').forEach(el=>ro.observe(el));

// Counters
const co=new IntersectionObserver(es=>{es.forEach(e=>{if(!e.isIntersecting)return;const el=e.target,t=+el.dataset.t;let c=0;const id=setInterval(()=>{c++;el.textContent=c+'+';if(c>=t){el.textContent=t+'+';clearInterval(id)}},Math.max(30,1200/t));co.unobserve(el)})},{threshold:0.6});
document.querySelectorAll('.counter').forEach(c=>co.observe(c));

// Back to top
const btt=document.getElementById('btt');
window.addEventListener('scroll',()=>btt.classList.toggle('show',scrollY>500),{passive:true});
btt.addEventListener('click',()=>window.scrollTo({top:0,behavior:'smooth'}));

// Form
const form=document.querySelector('.cform'),fmsg=document.getElementById('fmsg');
form?.addEventListener('submit',async e=>{
  e.preventDefault();
  const btn=form.querySelector('button');
  const orig=btn.innerHTML;
  btn.innerHTML='Sending <i class="fas fa-spinner fa-spin"></i>';btn.disabled=true;
  fmsg.className='form-msg';fmsg.textContent='';
  try{
    const r=await fetch(form.action,{method:'POST',body:new FormData(form),headers:{Accept:'application/json'}});
    if(r.ok){fmsg.textContent='✓ Message sent!';fmsg.classList.add('ok');form.reset()}
    else throw 0;
  }catch{fmsg.textContent='✗ Something went wrong.';fmsg.classList.add('err')}
  finally{btn.innerHTML=orig;btn.disabled=false}
});
