use serde::{Deserialize,Serialize};

#[derive(Debug,Deserialize,Serialize)]
pub struct Post{
    pub title:String,
    pub summary:String,
    pub content:String,
    pub tags:Vec<String>,
}

