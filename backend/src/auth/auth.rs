use actix_web::{HttpResponse, Responder, post, web};
use argon2::{Argon2, PasswordVerifier};
use sqlx::{PgPool, Row};

use crate::{helper::{generate_jwt, hash_password, verify_password}, models::models::{Sign_in, Sign_up}};

#[post("/sign_up")]
pub async fn sign_up(pool:web::Data<PgPool>,user:web::Json<Sign_up>)->impl Responder{
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

#[post("/sign_in")]
pub async fn sign_in(pool:web::Data<PgPool>,user:web::Json<Sign_in>)->impl Responder{
    let result = sqlx::query("SELECT id,password FROM users WHERE email = $1").bind(&user.email).fetch_optional(pool.get_ref()).await;
    let user_record = match result{
        Ok(Some(u))=>u,
        Ok(None)=>return HttpResponse::BadRequest().body("No user with this email is found"),
        Err(_)=>return HttpResponse::InternalServerError().body("Some db error ")
    };

    let user_id :i32 = user_record.get("id");
    let password:String = user_record.get("password");

    let is_valid = verify_password(&user.password, &password);

    if !is_valid{
        return HttpResponse::Unauthorized().body("Wrong email or password");
    }

    let token = generate_jwt(user_id);
    HttpResponse::Ok().json(serde_json::json!({
        "message":"User sign in successfull",
        "token":token
    }))
}


