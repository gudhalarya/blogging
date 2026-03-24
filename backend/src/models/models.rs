use serde::{Deserialize,Serialize};

//this is the users struct that will take entry and also stores in the database

#[derive(Debug,Deserialize,Serialize)]
pub struct Post{
    pub title:String,
    pub summary:String,
    pub content:String,
    pub tags:Vec<String>,
}

#[derive(Debug,Deserialize,Serialize)]
pub struct User{
    pub name:String,
    pub email:String,
    pub password:String,
    pub confirm_password:String,
}

