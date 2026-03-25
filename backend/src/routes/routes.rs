use std::sync::RwLock;

use actix_web::{HttpResponse, Responder, get, post, web};
use sqlx::{PgPool, Row};

use crate::{middleware::auth::AuthUser, models::models::Post};

#[post("/add_posts")]
//Fucking routes for the posts creation 
pub async fn add_post(pool:web::Data<PgPool>,post:web::Json<Post>,user:AuthUser)->impl Responder{
    let result = sqlx::query("INSERT INTO posts (title,summary,content,tags,user_id) VALUES ($1,$2,$3,$4,$5)").bind(&post.title).bind(&post.summary)
    .bind(&post.content)
    .bind(&post.tags)
    .bind(user.user_id)
    .execute(pool.get_ref())
    .await;

    match result {
        Ok(_)=>return HttpResponse::Ok().body("Post created successfully"),
        Err(_)=>return HttpResponse::InternalServerError().body("Internal error "),
    }

}

#[get("/get_posts")]
//this is the route to fetch all the posts
pub async fn get_posts(pool:web::Data<PgPool>,user:AuthUser)->impl Responder{

    let result = sqlx::query("SELECT * FROM posts WHERE user = $1")
    .bind(&user.user_id)
    .fetch_all(pool.get_ref())
    .await;

    match result {
        Ok(rows)=>{
            let posts :Vec<Post> = rows.into_iter().map(|row|{
                Post{
                    title:row.get("title"),
                    summary:row.get("summary"),
                    content:row.get("content"),
                    tags:row.get("tags"),
                }
            }).collect();
            return HttpResponse::Ok().json(posts);
        }
        Err(_)=>return HttpResponse::InternalServerError().body("Some error happened")
    }
}


//this is the route to get the specific post by id 
pub async fn get_post_id(pool:web::Data<PgPool>,user:AuthUser,path:web::Path<i32>){}