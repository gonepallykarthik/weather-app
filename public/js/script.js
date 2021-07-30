


const userform=document.querySelector('form')
const usersearch=document.querySelector('input')
const usermsg1=document.querySelector('.message-1')
const usermsg2=document.querySelector('.message-2')



userform.addEventListener('submit',(e)=>{
      e.preventDefault();
   const userlocation=usersearch.value;

usermsg1.textContent='Loading ......'
usermsg2.textContent='';
      
  fetch('http://localhost:3000/weather?address='+ userlocation).then((response)=>{
    response.json().then((data)=>{
        if(data.error)
        {
        
        usermsg1.textContent=data.error;
        }
        else{
            usermsg1.textContent=data.Place;

            usermsg2.textContent = data.Forecast  + ' It is currently  '  +  data.Temperature  + ' degress ' + ' Time : ' +  data.Time  + ' Humidity : ' +  data.Humidity ;
            
        console.log(data.Forecast);
        console.log(data.Temperature);
        console.log(data.Time);
        console.log(userlocation);
        console.log(data.Humidity);
      
        }
    })
})
      
})