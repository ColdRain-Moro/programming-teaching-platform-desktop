import { invoke } from "@tauri-apps/api"
import { transformCallback } from "@tauri-apps/api/tauri"
import { COOKIE_PATH } from "../utils/const"

type LoginResult = {
    success: boolean,
    cookie: string | null,
    error: string | null
}

function setCurrentCookie(cookie: string) {
    return localStorage.setItem(COOKIE_PATH, cookie)
}

function getCurrentCookie(): string | null {
    return localStorage.getItem(COOKIE_PATH)
}

export function isLogin(): boolean {
    return getCurrentCookie() !== null
}

export async function login(userId: string, userPass: string, onSuccess: () => void, onError: (reason: any) => void) {
    const res = await invoke<LoginResult>("login", { userId, userPass, onSuccess: transformCallback(onSuccess), onError: transformCallback(onError) })
    if (res.success) {
        setCurrentCookie(res.cookie!)
        onSuccess()
    } else {
        onError(res.error!)
    }
}