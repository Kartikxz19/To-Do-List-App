const express=require('express');
const date=require(__dirname+'/date.js');
const app=express();
const items=["Buy food", "Eat food","Cook food"];
const workitems=[];
//Note: It is possible to push items in a const array but not possible to assign a completely different set of values to it.
app.set('view engine','ejs');

app.use(express.urlencoded({extended:true}));
app.use(express.static('public'));
app.get('/',(req,res)=>{
    const day=date.getDate();
    res.render("list",{
        listTitle:day,
        todoitem:items
    });
});
app.post('/',(req,res)=>{
    const item=req.body.todo;
    if(req.body.list==="Work") //check comment near buttton tag as to why we have checked for only 'Work' instead of 'Work list'
    {
        workitems.push(item);
    res.redirect('/work');
    }
    else{
        items.push(item);
    res.redirect('/');
    }
    
});
//For work to do list
app.get('/work',(req,res)=>{
    res.render('list',{
        listTitle:"Work List",
        todoitem: workitems
    })
});
app.get('/about',(req,res)=>{
    res.render('about');
});
app.listen(3000,()=>{
    console.log("Server Running at port 3000");
});
