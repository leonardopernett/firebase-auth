const email            = document.querySelector("#email");
const password         = document.querySelector("#password");
const form             = document.querySelector("#form");
const logout           = document.querySelector("#logout");

const loginEmail       = document.querySelector("#login-email");
const loginPassword    = document.querySelector("#login-password");
const loginForm        = document.querySelector("#form-login");

const posts            = document.querySelector(".posts");
const facebook         = document.getElementById('facebook');

const loggedOut        = document.querySelectorAll('.logged-out')
const loggedIn         = document.querySelectorAll('.logged-in');


loggedOut.forEach(link=>console.log(link))
//change login
const loginChange = (user)=>{
  if(user){
    loggedIn.forEach(link=>link.style.display='block')
    loggedOut.forEach(link=>link.style.display='none')

  }else{
    loggedIn.forEach(link=>link.style.display='none')
    loggedOut.forEach(link=>link.style.display='block')

  }
}
//signup
form.addEventListener("submit",async (e) => {
  e.preventDefault();
    try {
      await auth.createUserWithEmailAndPassword(email.value, password.value)
      console.log('signup')
      $('#signupModal').modal('hide')
      form.reset();
    } catch (error) {
      console.log(error)
    }
    form.reset();
});

//login basic
loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();
  try {
     await auth.signInWithEmailAndPassword(loginEmail.value, loginPassword.value)
     console.log('login')
     loginForm.reset();
     $('#signinModal').modal('hide')
  } catch (error) {
      console.log(error)
  }
  loginForm.reset();
});


// login google
google.addEventListener('click',(e)=>{
    e.preventDefault();
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider)
    .then((result)=>{
      console.log(result.user)
      $('#signinModal').modal('hide')
    })
    .catch((err)=>{
  
    })
  })

//login facebook
facebook.addEventListener('click', (e)=>{
   e.preventDefault();
   var provider = new firebase.auth.FacebookAuthProvider();
    auth.signInWithPopup(provider)
    .then(result=>{
        console.log(result.user)
        console.log('faceboon signin')
    })
    .catch(err=>{
        console.log(err)
    })
})

  //logout
logout.addEventListener('click', async (e)=>{
    e.preventDefault();
    try {
      await auth.signOut()
      console.log('signout')
    } catch (error) {
       console.log(error) 
    }
 })
 
 //render List
const setupPosts = (data)=>{
     if(data.length){
        let html= ''
        data.forEach(doc => {
          let li =`
          <li class="list-group-item">
             <h3 class="text-center">${doc.data().title}</h3>
             <p class="text-justify text-center">${doc.data().description}</p>
           </li>
           
          `
          html += li
      });
      posts.innerHTML = html
     }else{
        posts.innerHTML = /*html*/`
        <p class="text-center">you no logged</p>
        ` 
     }
}

 //observable
auth.onAuthStateChanged(user=>{
    if(user){
        db.collection('posts').get().then(snapshot=>{
           setupPosts(snapshot.docs)
        })
        loginChange(user);
        console.log('yes logged')
    }else{
        loginChange(user)
       setupPosts([])
    }
})




