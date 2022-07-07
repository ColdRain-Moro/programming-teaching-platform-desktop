#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

use std::collections::HashMap;

use serde::{Deserialize, Serialize};

fn main() {
    let context = tauri::generate_context!();
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![login])
        .invoke_handler(tauri::generate_handler![get_chapters])
        .invoke_handler(tauri::generate_handler![get_subject])
        .invoke_handler(tauri::generate_handler![judge])
        .invoke_handler(tauri::generate_handler![write_log])
        .menu(if cfg!(target_os = "macos") {
            tauri::Menu::os_default(&context.package_info().name)
        } else {
            tauri::Menu::default()
        })
        .run(context)
        .expect("error while running tauri application");
}

#[derive(Deserialize, Serialize)]
struct LoginResult {
    success: bool,
    cookie: Option<String>,
    error: Option<String>,
}

#[tauri::command]
async fn login(user_id: String, user_pass: String) -> LoginResult {
    let client = reqwest::Client::new();
    let mut body = HashMap::new();
    body.insert("strUserId", user_id);
    body.insert("strPwd", user_pass);
    let res = client
        .post("http://10.16.14.2/ctas/ajaxpro/CExam.Login,App_Web_c318vtbf.ashx")
        .header("X-AjaxPro-Method", "UserLogin")
        .json(&body)
        .send()
        .await
        .unwrap();
    let cookie = (&res).headers().get("Set-Cookie");
    let cookie = match cookie {
        Some(c) => c.to_owned(),
        None => {
            return LoginResult {
                success: false,
                cookie: None,
                error: Some("Cookie not found".to_string()),
            }
        }
    };
    let cookie = cookie.to_str().unwrap();
    let res_text = res.text().await.unwrap();
    if res_text != "true;/*" {
        return LoginResult {
            success: false,
            cookie: None,
            error: Some(res_text),
        };
    }

    return LoginResult {
        success: true,
        cookie: Some(cookie.to_string()),
        error: None,
    };
}

#[tauri::command]
async fn get_chapters(cookie: String) -> String {
    let client = reqwest::Client::new();
    let res = client
        .post("http://10.16.14.2/ctas/ajaxpro/CExam.CPractice,App_Web_tzfdzrj8.ashx")
        .header("Cookie", cookie)
        .header("X-AjaxPro-Method", "GetJsonChapterList")
        .send()
        .await
        .unwrap();
    return res.text().await.unwrap();
}

#[tauri::command]
async fn get_subject(cookie: String, chapter: String, index: i32) -> String {
    let client = reqwest::Client::new();
    let mut body = HashMap::new();
    body.insert("strTestParam", format!("<cTest><cProgram>${chapter}</cProgram><cQuestionIndex>${index}</cQuestionIndex></cTest>"));
    let res = client
        .post("http://10.16.14.2/ctas/ajaxpro/CExam.CPractice,App_Web_tzfdzrj8.ashx")
        .header("Cookie", cookie)
        .header("X-AjaxPro-Method", "GetJSONTest")
        .json(&body)
        .send()
        .await
        .unwrap();
    return res.text().await.unwrap();
}

// 判断正误
#[tauri::command]
async fn judge(cookie: String, id: String, answer: String) -> bool {
    let client = reqwest::Client::new();
    let mut body = HashMap::new();
    body.insert("strTestParam", format!("<cTestParam><cQuestion>${id}</cQuestion><cUserAnswer>${answer}</cUserAnswer></cTestParam>`"));
    let res = client
        .post("http://10.16.14.2/ctas/ajaxpro/CExam.CPractice,App_Web_tzfdzrj8.ashx")
        .header("Cookie", cookie)
        .header("X-AjaxPro-Method", "IsOrNotTrue")
        .json(&body)
        .send()
        .await
        .unwrap();
    let res_text = res.text().await.unwrap();
    let (status, _) = res_text.split_at(1);
    return status == "1"
}

// 记录到后台
#[tauri::command]
async fn write_log() {
    
}