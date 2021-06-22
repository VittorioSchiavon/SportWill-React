

export const getData= () =>{
    fetch('https://jsonplaceholder.typicode.com/todos')
    .then(res=>{
        return res.json()
    })
    .then(data=> {
        console.log(data) ;
    });
        
}
