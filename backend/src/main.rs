use actix_web::{App, HttpServer};

use crate::db::db;

mod db;
mod models;
mod routes;
mod helper;


#[actix_web::main]
async fn main ()->std::io::Result<()>{
    dotenv::dotenv().ok();
    let db = db().await;
    HttpServer::new(move||{
        App::new()
        .app_data(actix_web::web::Data::new(db.clone()))
    })
    .bind(("127.0.0.1",8080))?
    .run()
    .await
}