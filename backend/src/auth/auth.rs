use actix_web::{HttpResponse, Responder, web};
use sqlx::PgPool;

use crate::{helper::hash_password, models::models::User};

pub async fn sign_up(pool:web::Data<PgPool>,user:web::Json<User>)->impl Responder{
    let check = sqlx::query("SELECT 1 FROM users WHERE email = $1").bind(&user.email).fetch_optional(pool.get_ref()).await;
   if let Err(_)= check{
    return HttpResponse::InternalServerError().body("Db error ");
   }

   if check.unwrap().is_some(){
    return HttpResponse::BadRequest().body("User already exist with this email");
   }

   let password_hash = hash_password(&user.password);
   let result = sqlx::query("INSERT INTO users (name,email,password) VALUES ($1,$2,$3)").bind(&user.name).bind(&user.email).bind(&password_hash).execute(pool.get_ref()).await;
   match result{
    Ok(_)=>HttpResponse::Ok().body("User sign up succesfull"),
    Err(_)=>HttpResponse::InternalServerError().body("User registration unsuccesfull")
   }
}