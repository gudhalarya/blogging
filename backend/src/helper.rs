
use std::{env};

use argon2::{Argon2, PasswordHash, PasswordHasher, PasswordVerifier, password_hash::{SaltString, rand_core::OsRng}};
use chrono::{Duration, Utc};
use jsonwebtoken::{DecodingKey, EncodingKey,TokenData, Header, Validation, decode, encode};

use crate::models::models::Claims;



//this is the fn to hass the password
pub fn hash_password(password:&str)->String{
    let salt = SaltString::generate(&mut OsRng);
    let argon2 = Argon2::default();
    let password_hash = argon2.hash_password(&password.as_bytes(), &salt).unwrap().to_string();
    return password_hash;
}


//this is the fn to verify the password 
pub fn verify_password (password:&str,password_two :&str)->bool{
    let argon2 = Argon2::default();
    let parsed_hash = match PasswordHash::new(password_two){
        Ok(hash)=>hash,
        Err(_)=>return false,
    };
    argon2.verify_password(password.as_bytes(), &parsed_hash).is_ok()
}

//this is the fn to generate the jwt token for the user 
pub fn generate_jwt(user_id:i32)->String{
    let expiration = Utc::now().checked_add_signed(Duration::hours(5)).unwrap().timestamp() as usize;
    let claims = Claims{
        sub:user_id,
        exp:expiration,
    };
    let secret = env::var("JWT_SECRET").expect("Could not find teh jwt key");
    encode(&Header::default(), 
    &claims, &EncodingKey::from_secret(&secret.as_bytes()),).unwrap()

}

//this is to verify the jwt here 
pub fn verify_jwt(token: &str) -> Result<Claims, String> {

    let secret = env::var("JWT_SECRET")
        .map_err(|_| "JWT_SECRET not set".to_string())?;

    let decoded: TokenData<Claims> = decode::<Claims>(
        token,
        &DecodingKey::from_secret(secret.as_bytes()),
        &Validation::default(),
    )
    .map_err(|_| "Invalid or expired token".to_string())?;

    Ok(decoded.claims)
}