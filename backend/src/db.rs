use std::env;

use sqlx::{PgPool, postgres::PgPoolOptions};

pub async fn db()->PgPool{
    let db_url = env::var("DATABASE_URL").expect("Could not find the db url in the env file ");
    let pool = PgPoolOptions::new()
    .max_connections(10)
    .connect(&db_url)
    .await.expect("Could not connect to the db");

    return pool;
}