use argon2::{Argon2, PasswordHasher, password_hash::{SaltString, rand_core::OsRng}};


//this is the fn to hass the password
pub fn hash_password(password:&str)->String{
    let salt = SaltString::generate(&mut OsRng);
    let argon2 = Argon2::default();
    let password_hash = argon2.hash_password(&password.as_bytes(), &salt).unwrap().to_string();
    return password_hash;
}



