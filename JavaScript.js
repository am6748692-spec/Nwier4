(function(){
'use strict';

const ADMIN={
  user:'eslamadmin012@',
  pass:'eslammaged012@',
  searchCode:'01022537296012@'
};
const STORE='nawair_v4';

const CURRICULUM={
'اللغة العربية':{icon:'📖',lessons:[
{name:'النحو — المبتدأ والخبر',content:'المبتدأ هو الاسم المرفوع الذي نبدأ به الجملة الاسمية. الخبر هو الجزء الذي يكمل معنى المبتدأ. مثال: الطالبُ مجتهدٌ.',questions:[
{text:'ما المبتدأ في "الجوُّ جميلٌ"؟',options:['الجوُّ','جميلٌ','الجملة كلها','لا يوجد'],correct:0},
{text:'ما نوع الخبر في "الطالبُ مجتهدٌ"؟',options:['مفرد','جملة','شبه جملة','لا شيء'],correct:0}]},
{name:'البلاغة — التشبيه',content:'التشبيه هو عقد مقارنة بين شيئين يشتركان في صفة. أركانه: المشبه، المشبه به، أداة التشبيه، وجه الشبه.',questions:[
{text:'في "العلمُ كالنورِ" ما نوع التشبيه؟',options:['تام','مؤكد','مجمل','بليغ'],correct:0},
{text:'كم ركن للتشبيه؟',options:['2','3','4','5'],correct:2}]}]},
'اللغة الإنجليزية':{icon:'🇬🇧',lessons:[
{name:'Present Simple',content:'The present simple is used for habits and facts. Form: Subject + base verb (add -s for he/she/it).',questions:[
{text:'She ___ to school every day.',options:['go','goes','going','gone'],correct:1},
{text:'They ___ football on Fridays.',options:['plays','play','playing','played'],correct:1}]},
{name:'Past Simple',content:'Used for completed actions in the past.',questions:[
{text:'She ___ to Paris last year.',options:['go','goes','went','gone'],correct:2}]}]},
'الرياضيات':{icon:'📐',lessons:[
{name:'الأعداد المركبة',content:'العدد المركب هو عدد على الصورة a + bi حيث a و b أعداد حقيقية، و i² = -1.',questions:[
{text:'ما قيمة i²؟',options:['1','-1','0','i'],correct:1},
{text:'ما الجزء التخيلي في 3 + 4i؟',options:['3','4','7','i'],correct:1}]},
{name:'الهندسة التحليلية',content:'المسافة بين نقطتين = √((x₂-x₁)² + (y₂-y₁)²).',questions:[
{text:'ما قانون المسافة؟',options:['√((x₂-x₁)²+(y₂-y₁)²)','x₂-x₁','y₂-y₁','الفرق'],correct:0}]}]},
'العلوم المتكاملة':{icon:'🔬',lessons:[
{name:'الخلية',content:'الخلية هي وحدة بناء الكائن الحي. تحتوي على الغشاء البلازمي والسيتوبلازم والنواة والميتوكوندريا.',questions:[
{text:'ما وحدة بناء الكائن الحي؟',options:['النسيج','الخلية','العضو','الجهاز'],correct:1},
{text:'أين يحدث التنفس الخلوي؟',options:['النواة','الميتوكوندريا','الغشاء','الريبوسوم'],correct:1}]},
{name:'الحركة',content:'السرعة = المسافة / الزمن. العجلة = التغير في السرعة / الزمن.',questions:[
{text:'ما وحدة قياس السرعة؟',options:['متر','ثانية','م/ث','م/ث²'],correct:2}]}]},
'الفلسفة والمنطق':{icon:'🤔',lessons:[
{name:'مقدمة في الفلسفة',content:'الفلسفة هي حب الحكمة، وهي البحث العقلي في المشكلات الكبرى.',questions:[
{text:'ما معنى كلمة فلسفة؟',options:['حب المال','حب الحكمة','حب العلم','حب الفن'],correct:1}]},
{name:'المنطق',content:'المنطق هو علم القواعد التي تعصم الذهن من الخطأ في التفكير.',questions:[
{text:'ما هو المنطق؟',options:['علم القواعد','الرسم','الطبخ','الرياضة'],correct:0}]}]},
'التاريخ':{icon:'🏛️',lessons:[
{name:'الحضارة المصرية القديمة',content:'عصر بناة الأهرام شهد بناء الأهرامات في الدولة القديمة.',questions:[
{text:'من بنى الهرم الأكبر؟',options:['خفرع','خوفو','منقرع','رمسيس'],correct:1}]}]}
};

const $=id=>document.getElementById(id);
const esc=s=>String(s||'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));

function newMastery(){const m={};Object.keys(CURRICULUM).forEach(s=>m[s]=0);return m;}

function defaultState(){
  const m={'اللغة العربية':85,'اللغة الإنجليزية':78,'الرياضيات':45,'العلوم المتكاملة':70,'الفلسفة والمنطق':58,'التاريخ':80};
  const lm={};
  Object.keys(CURRICULUM).forEach(s=>CURRICULUM[s].lessons.forEach(l=>lm[s+':'+l.name]=70));
  return{
    student:{id:'eslam',name:'إسلام',grade:'خدمات',username:ADMIN.user,mastery:m,lessonMastery:lm,suspended:{},
      activity:[
        {icon:'🎉',text:'تم إنشاء الحساب',type:'success',time:Date.now()-172800000},
        {icon:'🎓',text:'حصل على شهادة تقدير',type:'success',time:Date.now()-86400000}],
      lastLogin:null,createdAt:Date.now()-172800000},
    addedStudents:[]
  };
}

function load(){try{const raw=localStorage.getItem(STORE);if(raw)return JSON.parse(raw);}catch(e){}
  const s=defaultState();save(s);return s;}
function save(s){try{localStorage.setItem(STORE,JSON.stringify(s));}catch(e){}}

let state=load();
let currentUser=null;
let quiz={subject:null,lesson:null,index:0,selected:null,answered:false,correct:0};

function calcAvg(st){let sum=0,c=0;Object.keys(CURRICULUM).forEach(k=>{const v=st.mastery[k];if(typeof v==='number'){sum+=v;c++;}});return c?Math.round(sum/c):0;}
function timeAgo(ts){if(!ts)return'لم يدخل بعد';const d=Date.now()-ts;if(d<60000)return'الآن';if(d<3600000)return Math.floor(d/60000)+' دقيقة';if(d<86400000)return Math.floor(d/3600000)+' ساعة';return new Date(ts).toLocaleDateString('ar-EG');}
function genUser(){return 'std'+Math.floor(1000+Math.random()*9000);}
function genPass(){const c='abcdefghjkmnpqrstuvwxyz23456789';let p='';for(let i=0;i<8;i++)p+=c.charAt(Math.floor(Math.random()*c.length));return p;}

/* SEARCH — icon toggle */
window.toggleSearch=()=>{
  const input=$('search-code');
  if(!input)return;
  const isOpen=input.classList.contains('is-open');
  if(isOpen){
    input.classList.remove('is-open');
    input.value='';
  }else{
    input.classList.add('is-open');
    setTimeout(()=>input.focus(),50);
  }
};

window.onSearch=e=>{
  if(e.key==='Escape'){toggleSearch();return;}
  if(e.key!=='Enter')return;
  const v=($('search-code').value||'').trim();
  if(v===ADMIN.searchCode){
    $('search-code').value='';
    $('search-code').classList.remove('is-open');
    $('add-error').hidden=true;
    $('add-name').value='';$('add-phone').value='';
    openModal('modal-add');
  }else if(v){
    $('search-code').value='';
    alert('❌ الكود غير صحيح');
  }
};

window.openModal=id=>{$(id).hidden=false;};
window.closeModal=id=>{$(id).hidden=true;};

window.addMember=()=>{
  const err=$('add-error');err.hidden=true;
  const name=($('add-name').value||'').trim();
  const phone=($('add-phone').value||'').trim();
  const grade=$('add-grade').value;
  if(!name){err.textContent='أدخل اسم الطالب';err.hidden=false;return;}
  if(!phone){err.textContent='أدخل رقم التليفون';err.hidden=false;return;}
  
  let username;let exists=true;
  while(exists){username=genUser();exists=state.addedStudents.some(s=>s.username===username)||username===ADMIN.user;}
  const password=genPass();
  
  state.addedStudents.push({
    id:'s_'+Date.now(),name,phone,grade,username,password,
    mastery:newMastery(),lessonMastery:{},suspended:{},
    activity:[{icon:'🎉',text:'تم إنشاء الحساب',type:'success',time:Date.now()}],
    lastLogin:null,createdAt:Date.now()
  });
  save(state);
  
  closeModal('modal-add');
  $('cred-user').textContent=username;
  $('cred-pass').textContent=password;
  openModal('modal-cred');
};

/* LOGIN */
window.switchRole=role=>{
  $('panel-student').hidden=role!=='student';
  $('panel-teacher').hidden=role!=='teacher';
  $('tab-student').classList.toggle('role-switch__btn--active',role==='student');
  $('tab-teacher').classList.toggle('role-switch__btn--active',role==='teacher');
  $('student-error').hidden=true;$('teacher-error').hidden=true;
};

window.login=(e,role)=>{
  e.preventDefault();
  const errId=role==='teacher'?'teacher-error':'student-error';
  const uId=role==='teacher'?'teacher-username':'student-username';
  const pId=role==='teacher'?'teacher-password':'student-password';
  const errEl=$(errId);errEl.hidden=true;
  const u=($(uId).value||'').trim(),p=($(pId).value||'').trim();
  if(!u||!p){errEl.textContent='أدخل البيانات كاملة';errEl.hidden=false;return;}
  
  if(u===ADMIN.user&&p===ADMIN.pass){
    currentUser={type:'main',data:state.student};
    state.student.lastLogin=Date.now();
    state.student.activity.unshift({icon:'🔓',text:'تسجيل دخول',type:'success',time:Date.now()});
    if(state.student.activity.length>30)state.student.activity=state.student.activity.slice(0,30);
    save(state);
    showScreen(role==='teacher'?'teacher':'student');
    if(role==='teacher')renderTeacher();else sNav('home');
    return;
  }
  
  const added=state.addedStudents.find(s=>s.username===u&&s.password===p);
  if(added){
    currentUser={type:'added',data:added};
    added.lastLogin=Date.now();
    added.activity.unshift({icon:'🔓',text:'تسجيل دخول',type:'success',time:Date.now()});
    save(state);
    showScreen('student');sNav('home');
    return;
  }
  
  errEl.textContent='بيانات الدخول غير صحيحة';errEl.hidden=false;
};

window.logout=()=>{
  currentUser=null;
  $('screen-login').hidden=false;
  $('screen-teacher').hidden=true;
  $('screen-student').hidden=true;
  ['student-username','student-password','teacher-username','teacher-password'].forEach(id=>$(id).value='');
};

function showScreen(s){
  $('screen-login').hidden=s!=='login';
  $('screen-teacher').hidden=s!=='teacher';
  $('screen-student').hidden=s!=='student';
  window.scrollTo(0,0);
}

function getStudent(){return currentUser?currentUser.data:state.student;}

/* TEACHER */
window.tNav=nav=>{
  $('t-list').hidden=nav!=='list';
  $('t-detail').hidden=nav!=='detail';
  $('t-insights').hidden=nav!=='insights';
  document.querySelectorAll('[data-tnav]').forEach(b=>b.classList.toggle('side-btn--active',b.getAttribute('data-tnav')===nav));
  if(nav==='insights')renderInsights();
};

function renderTeacher(){
  const all=[state.student,...state.addedStudents];
  $('t-total').textContent=all.length;
  $('t-avg').textContent=Math.round(all.reduce((s,x)=>s+calcAvg(x),0)/all.length)+'%';
  $('t-new').textContent=state.addedStudents.filter(s=>s.lastLogin).length;
  
  $('students-grid').innerHTML=all.map((s,i)=>{
    const avg=calcAvg(s);
    const isNew=s.lastLogin&&i>0;
    return `<div class="student-card${isNew?' student-card--new':''}" onclick="openStudent(${i})">
      <div class="student-card__head">
        <div class="student-card__avatar">${esc(s.name.charAt(0))}</div>
        <div>
          <div class="student-card__name">${esc(s.name)}${isNew?'<span class="student-card__badge">جديد</span>':''}</div>
          <div class="student-card__meta">${esc(s.grade)} • ${esc(s.username)}</div>
        </div>
      </div>
      <div class="student-card__progress-label"><span>التقدم</span><span>${avg}%</span></div>
      <div class="student-card__bar"><div class="student-card__bar-fill" style="width:${avg}%"></div></div>
      <div class="student-card__last">آخر دخول: ${timeAgo(s.lastLogin)}</div>
    </div>`;
  }).join('');
}

window.openStudent=idx=>{
  tNav('detail');
  const all=[state.student,...state.addedStudents];
  const s=all[idx];
  const avg=calcAvg(s);
  const last=s.lastLogin?new Date(s.lastLogin).toLocaleString('ar-EG'):'—';
  const created=new Date(s.createdAt).toLocaleDateString('ar-EG');
  
  let html=`<button class="btn btn--ghost btn--sm" onclick="tNav('list')" style="margin-bottom:16px">← رجوع</button>
    <div class="detail-card">
      <div class="detail-header">
        <div class="detail-avatar">${esc(s.name.charAt(0))}</div>
        <div><div class="detail-name">${esc(s.name)}</div><div class="detail-meta">${esc(s.grade)} • ${esc(s.username)}</div></div>
      </div>
      <div class="stats-row">
        <div class="stat"><div class="stat__v">${avg}%</div><div class="stat__l">التقدم</div></div>
        <div class="stat"><div class="stat__v" style="font-size:14px">${last.split(',')[0]}</div><div class="stat__l">آخر دخول</div></div>
        <div class="stat"><div class="stat__v" style="font-size:14px">${created}</div><div class="stat__l">الإنشاء</div></div>
      </div>
    </div>
    <div class="detail-card"><h2>🎛️ التحكم في المواد</h2>`;
  
  Object.keys(CURRICULUM).forEach(subj=>{
    const v=s.mastery[subj]||0;
    const sus=s.suspended[subj];
    html+=`<div class="subject-control${sus?' subject-control--suspended':''}">
      <div class="subject-control__info">
        <div class="subject-control__name">${CURRICULUM[subj].icon} ${esc(subj)}</div>
        <div class="subject-control__score">${v}%</div>
      </div>
      <input type="number" class="subject-control__input" min="0" max="100" value="${v}" onchange="setScore(${idx},'${subj}',this.value)"/>
      <button class="btn btn--${sus?'success':'danger'} btn--sm" onclick="toggleSus(${idx},'${subj}')">${sus?'تفعيل':'إيقاف'}</button>
    </div>`;
  });
  html+=`</div><div class="detail-card"><h2>📋 السجل (${s.activity.length})</h2><div class="activity-list">`;
  if(!s.activity.length)html+='<div style="color:var(--text-dim);padding:20px;text-align:center">لا يوجد نشاط</div>';
  s.activity.slice(0,30).forEach(a=>{
    html+=`<div class="activity-item activity-item--${a.type||'info'}">
      <div class="activity-item__icon">${a.icon}</div>
      <div class="activity-item__content">
        <div class="activity-item__text">${esc(a.text)}</div>
        <div class="activity-item__time">${new Date(a.time).toLocaleString('ar-EG')}</div>
      </div></div>`;
  });
  html+='</div></div>';
  
  $('t-detail').innerHTML=html;
};

window.setScore=(idx,subj,val)=>{
  const all=[state.student,...state.addedStudents];
  const s=all[idx];
  const n=Math.max(0,Math.min(100,parseInt(val)||0));
  s.mastery[subj]=n;
  s.activity.unshift({icon:'✏️',text:`المعلم عدّل ${subj} إلى ${n}%`,type:'warning',time:Date.now()});
  if(s.activity.length>30)s.activity=s.activity.slice(0,30);
  save(state);openStudent(idx);renderTeacher();
};

window.toggleSus=(idx,subj)=>{
  const all=[state.student,...state.addedStudents];
  const s=all[idx];
  s.suspended[subj]=!s.suspended[subj];
  s.activity.unshift({icon:s.suspended[subj]?'⛔':'✅',text:(s.suspended[subj]?'أوقف ':'فعّل ')+subj,type:s.suspended[subj]?'danger':'success',time:Date.now()});
  if(s.activity.length>30)s.activity=s.activity.slice(0,30);
  save(state);openStudent(idx);renderTeacher();
};

function renderInsights(){
  const all=[state.student,...state.addedStudents];
  $('t-insights').innerHTML=`<div class="page-head"><h1>رؤية عامة</h1><p>أداء كل الطلاب</p></div>`+
    all.map(s=>{
      const avg=calcAvg(s);
      return `<div class="detail-card">
        <h2>${esc(s.name)} <span style="font-size:13px;color:var(--text-muted);font-weight:600">${esc(s.grade)}</span></h2>
        <div class="overall-progress__bar"><div class="overall-progress__fill" style="width:${avg}%"></div></div>
        <div style="text-align:center;margin-top:14px;font-size:22px;font-weight:900;color:#a5b4fc">${avg}%</div>
      </div>`;
    }).join('');
}

/* STUDENT */
window.toggleSide=()=>{$('s-side').classList.toggle('is-open');};

window.sNav=nav=>{
  ['home','subjects','lesson','progress','cert'].forEach(v=>{
    const el=$('s-'+v);if(el)el.hidden=v!==nav;
  });
  document.querySelectorAll('[data-snav]').forEach(b=>b.classList.toggle('side-btn--active',b.getAttribute('data-snav')===nav));
  $('s-side').classList.remove('is-open');
  if(nav==='home')renderHome();
  if(nav==='subjects')renderSubjects();
  if(nav==='progress')renderProgress();
  if(nav==='cert')renderCert();
};

function renderHome(){
  const s=getStudent();
  const avg=calcAvg(s);
  const last=s.lastLogin?new Date(s.lastLogin).toLocaleString('ar-EG'):'—';
  $('s-header-name').textContent=s.name;
  $('s-home').innerHTML=`
    <div class="welcome-banner">
      <div class="welcome-avatar">${esc(s.name.charAt(0))}</div>
      <div><div class="welcome-title">أهلاً، <span>${esc(s.name)}</span> 👋</div>
      <div class="welcome-subtitle">${esc(s.grade)} • تحت إشراف فريق المعلمين</div></div>
    </div>
    <div class="overall-progress">
      <div class="overall-progress__head"><span class="overall-progress__title">📊 التقدم الكلي</span><span class="overall-progress__value">${avg}%</span></div>
      <div class="overall-progress__bar"><div class="overall-progress__fill" id="s-fill" style="width:0%"></div></div>
    </div>
    <div class="stats-row">
      <div class="stat"><div class="stat__v">${Object.keys(CURRICULUM).length}</div><div class="stat__l">المواد</div></div>
      <div class="stat"><div class="stat__v">${avg}%</div><div class="stat__l">تقدمك</div></div>
      <div class="stat"><div class="stat__v" style="font-size:13px">${last.split(',')[0]}</div><div class="stat__l">آخر دخول</div></div>
    </div>`;
  setTimeout(()=>{const f=$('s-fill');if(f)f.style.width=avg+'%';},100);
}

function renderSubjects(){
  const s=getStudent();
  $('s-subjects').innerHTML=`<div class="page-head"><h1>📚 المواد</h1><p>اضغط على مادة لبدء التعلم</p></div>
    <div class="subjects-grid">`+
    Object.keys(CURRICULUM).map(subj=>{
      const v=s.mastery[subj]||0;
      const sus=s.suspended[subj];
      return `<div class="subject-card${sus?' subject-card--suspended':''}" ${sus?'':`onclick="openSubject('${subj}')"`}>
        <div class="subject-card__icon">${CURRICULUM[subj].icon}</div>
        <div class="subject-card__name">${esc(subj)}</div>
        <div class="subject-card__progress-label"><span>${CURRICULUM[subj].lessons.length} دروس</span><span>${v}%</span></div>
        <div class="subject-card__bar"><div class="subject-card__bar-fill" style="width:${v}%"></div></div>
      </div>`;
    }).join('')+'</div>';
}

window.openSubject=subj=>{
  const s=getStudent();
  if(s.suspended[subj])return;
  const info=CURRICULUM[subj];
  $('s-lesson').innerHTML=`<button class="btn btn--ghost btn--sm" onclick="sNav('subjects')" style="margin-bottom:16px">← رجوع</button>
    <div class="page-head"><h1>${info.icon} ${esc(subj)}</h1><p>${info.lessons.length} دروس</p></div>
    <div class="progress-list">`+
    info.lessons.map((l,i)=>{
      const key=subj+':'+l.name;
      const v=s.lessonMastery[key]||0;
      return `<div class="progress-item" style="cursor:pointer" onclick="openLesson('${subj}',${i})">
        <div class="progress-item__head">
          <span class="progress-item__name">${i+1}. ${esc(l.name)}</span>
          <span class="progress-item__score">${v}%</span>
        </div>
        <div class="progress-item__bar"><div class="progress-item__fill" style="width:${v}%"></div></div>
      </div>`;
    }).join('')+'</div>';
  sNav('lesson');
};

window.openLesson=(subj,idx)=>{
  quiz={subject:subj,lesson:CURRICULUM[subj].lessons[idx],index:0,selected:null,answered:false,correct:0};
  renderQuiz();
};

function renderQuiz(){
  const q=quiz.lesson.questions;
  if(quiz.index>=q.length){renderResult();return;}
  const cur=q[quiz.index];
  $('s-lesson').innerHTML=`
    <button class="btn btn--ghost btn--sm" onclick="openSubject('${quiz.subject}')" style="margin-bottom:16px">← رجوع</button>
    <div class="lesson-header"><span class="lesson-badge">${esc(quiz.subject)}</span><h1 class="lesson-title">${esc(quiz.lesson.name)}</h1></div>
    <div class="lesson-content">📖 ${esc(quiz.lesson.content)}</div>
    <div class="quiz-card">
      <div class="quiz-progress-text">السؤال ${quiz.index+1} من ${q.length}</div>
      <div class="quiz-progress-bar"><div class="quiz-progress-fill" style="width:${(quiz.index/q.length)*100}%"></div></div>
      <div class="quiz-question">${esc(cur.text)}</div>
      <div class="quiz-options" id="qopts">${cur.options.map((o,i)=>`<button class="quiz-option" onclick="pickAns(${i})">${esc(o)}</button>`).join('')}</div>
      <div id="qfb"></div>
      <button class="btn btn--primary btn--full" id="qsub" onclick="submitAns()" disabled>تحقق</button>
      <button class="btn btn--primary btn--full" id="qnext" onclick="nextQ()" hidden style="margin-top:8px">السؤال التالي</button>
    </div>`;
}

window.pickAns=i=>{
  if(quiz.answered)return;
  quiz.selected=i;
  document.querySelectorAll('#qopts .quiz-option').forEach((b,idx)=>b.classList.toggle('quiz-option--selected',idx===i));
  $('qsub').disabled=false;
};

window.submitAns=()=>{
  if(quiz.answered||quiz.selected===null)return;
  quiz.answered=true;
  const cur=quiz.lesson.questions[quiz.index];
  const ok=quiz.selected===cur.correct;
  if(ok)quiz.correct++;
  document.querySelectorAll('#qopts .quiz-option').forEach((b,idx)=>{
    b.disabled=true;b.classList.remove('quiz-option--selected');
    if(idx===cur.correct)b.classList.add('quiz-option--correct');
    else if(idx===quiz.selected)b.classList.add('quiz-option--wrong');
  });
  const fb=$('qfb');
  fb.className='quiz-feedback quiz-feedback--'+(ok?'success':'warning');
  fb.innerHTML=ok?'<strong>✅ إجابة صحيحة!</strong> أحسنت!':`<strong>🌱 محاولة جيدة</strong><br>الإجابة الصحيحة: <strong>${esc(cur.options[cur.correct])}</strong>`;
  $('qsub').hidden=true;$('qnext').hidden=false;
  updateMastery(ok);
};

function updateMastery(ok){
  const s=getStudent();
  const key=quiz.subject+':'+quiz.lesson.name;
  const cur=s.lessonMastery[key]||50;
  s.lessonMastery[key]=ok?Math.min(100,cur+10):Math.max(0,cur-5);
  const vals=CURRICULUM[quiz.subject].lessons.map(l=>s.lessonMastery[quiz.subject+':'+l.name]||0);
  s.mastery[quiz.subject]=Math.round(vals.reduce((a,b)=>a+b,0)/vals.length);
  s.activity.unshift({icon:ok?'✅':'📝',text:(ok?'أجاب صح':'أخطأ')+' في '+quiz.lesson.name,type:ok?'success':'warning',time:Date.now()});
  if(s.activity.length>30)s.activity=s.activity.slice(0,30);
  save(state);
}

window.nextQ=()=>{quiz.index++;quiz.selected=null;quiz.answered=false;renderQuiz();};

function renderResult(){
  const total=quiz.lesson.questions.length;
  const pct=Math.round((quiz.correct/total)*100);
  let icon,title,msg;
  if(pct>=80){icon='🏆';title='ممتاز!';msg=`أجبت ${quiz.correct} من ${total}`;}
  else if(pct>=50){icon='🎯';title='جيد!';msg=`أجبت ${quiz.correct} من ${total}`;}
  else{icon='🌱';title='بداية جيدة';msg=`أجبت ${quiz.correct} من ${total}`;}
  $('s-lesson').innerHTML=`<div class="detail-card" style="text-align:center;padding:48px">
    <div style="font-size:72px;margin-bottom:16px">${icon}</div>
    <h1 style="font-size:26px;margin-bottom:12px">${title}</h1>
    <p style="color:var(--text-muted);margin-bottom:28px;font-size:15px">${msg}</p>
    <div style="display:flex;gap:10px;justify-content:center;flex-wrap:wrap">
      <button class="btn btn--primary" onclick="openSubject('${quiz.subject}')">رجوع للدروس</button>
      <button class="btn btn--ghost" onclick="sNav('home')">الرئيسية</button>
    </div>
  </div>`;
}

function renderProgress(){
  const s=getStudent();
  $('s-progress').innerHTML=`<div class="page-head"><h1>📊 تقدمي</h1><p>مستواك في كل مادة</p></div>
    <div class="progress-list">`+
    Object.keys(CURRICULUM).map(subj=>{
      const v=s.mastery[subj]||0;
      return `<div class="progress-item">
        <div class="progress-item__head">
          <span class="progress-item__name">${CURRICULUM[subj].icon} ${esc(subj)}</span>
          <span class="progress-item__score">${v}%</span>
        </div>
        <div class="progress-item__bar"><div class="progress-item__fill" style="width:${v}%"></div></div>
      </div>`;
    }).join('')+'</div>';
}

function renderCert(){
  const s=getStudent();
  const avg=calcAvg(s);
  const d=new Date().toLocaleDateString('ar-EG',{year:'numeric',month:'long'});
  const serial='NAW-2026-'+String(Math.floor(Math.random()*900+100)).padStart(3,'0');
  
  $('s-cert').innerHTML=`
    <div class="page-head" style="text-align:center;margin-bottom:24px"><h1>🏆 شهادة التقدير</h1><p>استحققتها بجهدك</p></div>
    <div class="cert-wrap">
      <div class="cert">
        <div class="cert__frame">
          <div class="cert__inner">
            <div class="cert__watermark">Nawair</div>
            <div class="cert__orn cert__orn--tl"></div>
            <div class="cert__orn cert__orn--tr"></div>
            <div class="cert__orn cert__orn--bl"></div>
            <div class="cert__orn cert__orn--br"></div>
            <div class="cert__content">
              <div class="cert__medal">🏆</div>
              <div class="cert__ribbon">امتياز</div>
              <h2 class="cert__title">شهادة تقدير</h2>
              <p class="cert__presented">تُمنح هذه الشهادة بكل فخر واعتزاز إلى</p>
              <div class="cert__name-wrap"><span class="cert__name">${esc(s.name)}</span></div>
              <p class="cert__reason">تقديرًا لاجتهاده وتفوقه، وتحقيقه نسبة تقدم <strong>${avg}%</strong> في المواد الدراسية، واجتيازه التقييم الشامل بامتياز</p>
              <div class="cert__footer">
                <div class="cert__sig">
                  <div class="cert__sig-line"></div>
                  <div class="cert__sig-name">فريق المعلمين</div>
                  <div class="cert__sig-role">الإشراف العام</div>
                </div>
                <div class="cert__seal">
                  <svg width="86" height="86" viewBox="0 0 100 100">
                    <defs><radialGradient id="sg"><stop offset="0" stop-color="#fef3c7"/><stop offset="1" stop-color="#b45309"/></radialGradient></defs>
                    <circle cx="50" cy="50" r="46" fill="url(#sg)" stroke="#78350f" stroke-width="2.5"/>
                    <circle cx="50" cy="50" r="38" fill="none" stroke="#78350f" stroke-width="1.5" opacity=".5"/>
                    <polygon points="50,18 55,38 76,38 60,51 66,72 50,60 34,72 40,51 24,38 45,38" fill="#78350f" opacity=".7"/>
                    <text x="50" y="82" text-anchor="middle" fill="#78350f" font-size="9" font-weight="900">NAWAIR</text>
                  </svg>
                </div>
                <div class="cert__sig">
                  <div class="cert__sig-line"></div>
                  <div class="cert__sig-name">${d}</div>
                  <div class="cert__sig-role">التاريخ</div>
                </div>
              </div>
              <div class="cert__serial">رقم الشهادة: ${serial} • Nawair | حصص</div>
            </div>
          </div>
        </div>
      </div>
      <div style="text-align:center;margin-top:20px"><button class="btn btn--primary btn--lg" onclick="window.print()">🖨️ طباعة الشهادة</button></div>
    </div>`;
}

document.addEventListener('DOMContentLoaded',()=>{switchRole('student');});
})();