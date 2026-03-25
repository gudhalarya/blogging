use std::future::{Ready, ready};

use actix_web::{FromRequest, Error};

use crate::{helper::verify_jwt, models::models::Claims};

pub struct AuthUser{
   pub user_id:i32,
}


impl FromRequest for AuthUser{
    type Error = actix_web::Error;
    type Future = Ready<Result<Self,Error>>;

    fn from_request(req: &actix_web::HttpRequest, payload: &mut actix_web::dev::Payload) -> Self::Future {
        let auth_header = req.headers().get("Authorization");

        if auth_header.is_none(){
            return ready(Err(actix_web::error::ErrorUnauthorized("No token")));
        }

        let token = match auth_header.unwrap().to_str(){
            Ok(val)=>val.replace("Bearer", ""),
            Err(_)=>return ready(Err(actix_web::error::ErrorUnauthorized("Invalid header"))),
        };

        match verify_jwt(&token){
            Ok(Claims)=>ready(Ok(AuthUser { user_id: Claims.sub })),
            Err(_)=>ready(Err(actix_web::error::ErrorUnauthorized("Invalid token"))),
        }
    }

}