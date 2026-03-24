use actix_web::{Responder, web};
use sqlx::PgPool;

use crate::models::models::Post;

//this is where the fucking routes lies 
pub async fn add_post(pool:web::Data<PgPool>,post:web::Json<Post>){
}