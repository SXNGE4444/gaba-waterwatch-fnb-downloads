'use strict';
const identities={operator:'kidsonxanax@gmail.com',reviewer:'lsmptylastsaymatters@gmail.com'};
const endpoint='https://uskemdfbmuilvirqudml.supabase.co/auth/v1/signup';
const publicKey='sb_publishable_iZEnOA3f0yvz6M5hnTfOvA_sMYS38Oq'; // public client identifier; NOT a secret.
const $=s=>document.querySelector(s);
$('#identity').addEventListener('change',()=>{$('#email').value=identities[$('#identity').value];$('#feedback').textContent='';});
$('#show').addEventListener('click',()=>{const p=$('#password');p.type=p.type==='password'?'text':'password';$('#show').textContent=p.type==='text'?'Hide password':'Show password';});
$('#generate').addEventListener('click',()=>{
 const alphabet='ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz23456789!@#%*-_';
 const array=new Uint8Array(36);
 crypto.getRandomValues(array);
 const pass=Array.from(array,n=>alphabet[n%alphabet.length]).join('')+'9aQ!';
 $('#password').value=pass;$('#password').type='text';$('#show').textContent='Hide password';
 $('#feedback').className='message';
 $('#feedback').textContent='Password generated on your device. Save it somewhere private before creating the account.';
});
$('#staff-form').addEventListener('submit',async event=>{
 event.preventDefault();
 const email=identities[$('#identity').value],pass=$('#password').value,msg=$('#feedback'),send=$('#submit');
 if(!email||pass.length<12||!/[a-z]/.test(pass)||!/[A-Z]/.test(pass)||!/[0-9]/.test(pass)){
  msg.className='message error';msg.textContent='Use at least 12 characters with uppercase, lowercase and a number.';return;
 }
 send.disabled=true;send.textContent='Requesting verification email…';
 try {
  const response=await fetch(endpoint,{
   method:'POST',mode:'cors',headers:{'Content-Type':'application/json','apikey':publicKey},
   body:JSON.stringify({email,password:pass})
  });
  const info=await response.json().catch(()=>({}));
  if(!response.ok)throw Error(info.msg||info.message||info.error_description||'Signup did not complete.');
  msg.className='message';
  msg.textContent='If Supabase accepted the registration, check '+email+' for a verification link. After confirmation, this email receives its assigned GABA demo role. Keep your password private. If the account already exists, use Supabase password recovery instead.';
 }catch(error){msg.className='message error';msg.textContent='Account not ready: '+error.message+' Please check the Auth settings or try Supabase Dashboard → Authentication → Users.';}
 finally{send.disabled=false;send.textContent='Create account and send confirmation →';}
});