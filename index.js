const express = require('express');
const port = 8000;
const path = require('path');

const app = express();

app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));
app.use(express.urlencoded());
app.use(express.static('assets'));


//middleware called
// app.use(function(req,res,next){
    
//     console.log("Middleware 1 called",req.body.name);
//     next();
// });

//Middleware 2 called
// app.use(function(req,res,next){
//     console.log("Middleware 2 called",req.body.name);
//     next();
// });



const ContactList = [
    {
        name: "Dhaval Patel",
        phone : 8200004258,
    },
    {
        name : "Akash Patel",
        phone : 9974398232
    },
    {
        name : "Jigar Patel",
        phone  : 9714233673
    }
];


app.get('/',function(req,res){

    return res.render('home',{
        title: "Expresspage",
        contact_list : ContactList,
    });

});

app.post('/create-contact',function(req,res){

    ContactList.push({
        name: req.body.name,
        phone: req.body.phone,
    });

    //push(req.body)
    res.redirect('/');
    
});


app.get('/delete-contact/:phone',function(req,res){

    let phone =req.params.phone;
    
    let contactIndex = ContactList.findIndex(contact => contact.phone == phone);
    
    if(contactIndex != -1){
        ContactList.splice(contactIndex,1);
    }

    res.redirect('back');


});


app.listen(port,function(err){

    if(err){
        console.log("Server Error", err);
    }

    console.log("Server is running on port : ",port);
});