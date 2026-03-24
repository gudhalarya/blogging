use argon2::{Argon2, PasswordHash, PasswordHasher, PasswordVerifier, password_hash::{SaltString, rand_core::OsRng}};


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